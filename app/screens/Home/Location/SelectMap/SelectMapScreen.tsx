import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Icon from 'react-native-vector-icons/FontAwesome5';
import _styles from '../../../../_styles';
import modules from '../../../../modules';
import Geolocation from '@react-native-community/geolocation';
import { inject, observer } from 'mobx-react';
export interface AppProps {
	navigation: any;
	// isContinue: boolean;
	loading?: boolean;
	// onSaveLocation: any;
	coordinate: any;
	getCurrentLocation: any;
	onMoving: boolean;

	onMoveMap: any;
	onMoveComplete: any;

	onContinue: any;
	location: any;
}

export interface AppState {
	coordinate: any;
	oMoving: boolean;
}

@inject('location')
@observer
export default class SelectMapScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			coordinate: {
				latitude: 11.5564,
				longitude: 104.9282,
				latitudeDelta: 0.02,
				longitudeDelta: 0.02
			},
			oMoving: false
		};
	}

	_onCurrentLocation = async () => {
		await Geolocation.getCurrentPosition(async (info) => {
			await this.setState({
				coordinate: {
					latitude: info.coords.latitude,
					longitude: info.coords.longitude,
					latitudeDelta: 0.02,
					longitudeDelta: 0.02
				}
			});

			await this.mapRef.animateToRegion({
				latitude: info.coords.latitude,
				longitude: info.coords.longitude,
				latitudeDelta: 0.02,
				longitudeDelta: 0.02
			});

		});

		// await this.setState({
		// 	latitude: 11.566191,
		// 	longitude: 104.890592,
		// 	coordinate: {
		// 		latitude: 11.566191,
		// 		longitude: 104.890592
		// 	}
		// });
		// const { latitude, longitude } = this.state;
		// console.log('object', latitude);
		// console.log('object', longitude);
	};

	_onMoving = () => {
		this.setState({ oMoving: true });
	};

	_onMoveComplete = async (position: any) => {
		await this.setState({ coordinate: position });
		this.props.location.coords = position;

	};

	_onSaveMap = async () => {

		this.props.navigation.goBack();
	};

	_renderHeader = () => {
		const { onMoving } = this.props;
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Text style={styles.textContinue}>Back</Text>
				</TouchableOpacity>
				<Text style={styles.labelTitle}>Location on Map</Text>
				<TouchableOpacity onPress={() => this._onSaveMap()} disabled={onMoving}>
					{this.props.loading ? (
						<ActivityIndicator />
					) : (
						<Text style={onMoving ? { color: modules.TEXT } : styles.textContinue}>Continue</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	mapRef: any;

	render() {
		return (
			<View style={_styles.flx1}>
				<SafeAreaView />
				{this._renderHeader()}
				<MapView
					ref={(ref) => (this.mapRef = ref)}
					provider={PROVIDER_GOOGLE}
					showsUserLocation={true}
					// onRegionChange={this.props.onMoveMap}
					onRegionChangeComplete={(position) => this._onMoveComplete(position)}
					// region={this.state.coordinate}
					style={styles.MapStyle}
					initialRegion={this.state.coordinate}
				>
					{/* <Marker draggable coordinate={this.props.coordinate} /> */}
				</MapView>
				<TouchableOpacity
					onPress={() => this._onCurrentLocation()}
					activeOpacity={0}
					style={styles.iconLocation}
				>
					<Icon color={modules.COLOR_MAIN} size={modules.FONT_H5 - 2} name="location-arrow" />
				</TouchableOpacity>
				<Image style={styles.pin} source={require('./../../../../../assets/placeholder.png')} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: modules.BODY_HORIZONTAL_12,
		borderBottomColor: modules.BORDER_COLOR,
		paddingBottom: modules.BODY_HORIZONTAL_12,
		borderBottomWidth: 1
	},
	labelTitle: {
		fontSize: modules.FONT,
		fontWeight: '500',
		color: modules.TEXT
	},
	textContinue: {
		fontSize: modules.FONT_P,
		color: modules.COLOR_MAIN,
		fontWeight: '500'
	},
	MapStyle: {
		flex: 1
	},
	iconLocation: {
		backgroundColor: modules.WHITE,
		position: 'absolute',
		bottom: modules.BODY_HORIZONTAL * 4,
		right: modules.BODY_HORIZONTAL,
		width: modules.BODY_HORIZONTAL * 3,
		height: modules.BODY_HORIZONTAL * 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: modules.BODY_HORIZONTAL * 1.5
	},
	pin: {
		position: 'absolute',
		bottom: modules.VIEW_PORT_HEIGHT / 2 - 40,
		left: '50%',
		width: 40,
		height: 40,
		marginLeft: -20,
		marginBottom: 16,
		zIndex: 10
	}
});
