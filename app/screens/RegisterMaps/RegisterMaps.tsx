import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import modules from '../../modules';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
}

export interface AppState {}
export default class RegisterMaps extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	_renderHeader = () => {
		const { onMoving } = this.props;
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity style={{ opacity: 0 }}>
					<Text style={styles.textContinue}>Continue</Text>
				</TouchableOpacity>
				<Text style={styles.labelTitle}>Location on Map</Text>
				<TouchableOpacity onPress={this.props.onContinue} disabled={onMoving}>
					{this.props.loading ? (
						<ActivityIndicator />
					) : (
						<Text style={onMoving ? { color: modules.TEXT } : styles.textContinue}>Continue</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<View style={_styles.flx1}>
				<SafeAreaView />
				{this._renderHeader()}
				<MapView
					provider={PROVIDER_GOOGLE}
					// onRegionChange={this.props.onMoveMap}
					onRegionChangeComplete={(position) => this.props.onMoveComplete(position)}
					region={this.props.coordinate}
					style={styles.MapStyle}
					initialRegion={this.props.coordinate}
				>
					{/* <Marker draggable coordinate={this.props.coordinate} /> */}
				</MapView>
				<TouchableOpacity onPress={this.props.getCurrentLocation} activeOpacity={0} style={styles.iconLocation}>
					<Icon color={modules.COLOR_MAIN} size={modules.FONT_H5 - 2} name="location-arrow" />
				</TouchableOpacity>
				<Image style={styles.pin} source={require('./../../../assets/placeholder.png')} />
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
