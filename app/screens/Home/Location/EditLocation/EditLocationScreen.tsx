import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image,SafeAreaView } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import ArrowBackHeader from '../../../../components/ArrowBackHeader';
import modules from '../../../../modules';
import _styles from '../../../../_styles';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FontGSansSemiBold } from '../../../../../functions/customFont';
import Header from '../../../../components/Header';

export interface AppProps {
	navigation: any;
	name: string;
	address: string;
	onPresCamera: any;

	onPresImage: any;
	onSave: any;
	onChangeName: (val: any) => void;
	onChangeAddress: (val: any) => void;
	changeLatitute: (val: any) => void;
	changeLongitute: (val: any) => void;
	loading: boolean;
	latitude: any;
	longitude: any;
	coords: any;
}

export default class EditLocationScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			modal: false
		};
	}
	mapRef: any;

	compontDidMount() {
		this.mapRef.animateToRegion(this.props.coords);
	}

	public render() {
		return (
			<View style={_styles.flx1}>
				<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
				<Header
					title="Add Location"
					loading={this.props.loading}
					onBack={() => this.props.navigation.goBack()}
					onEdit={true}
					isEdit={true}
					onSave={this.props.onSave}
				/>
				<View style={styles.formGroups}>
					<OutlinedTextField
						tintColor={modules.COLOR_MAIN}
						value={this.props.name}
						onChangeText={(val) => this.props.onChangeName(val)}
						label="Location Name"
					/>
					<View style={{ marginBottom: modules.BODY_HORIZONTAL }}>
						<OutlinedTextField
							value={this.props.address}
							onChangeText={(val) => this.props.onChangeAddress(val)}
							underlineColorAndroid="transparent"
							inputContainerStyle={styles.textfield}
							containerStyle={{ minHeight: 150 }}
							style={{ minHeight: 150 }}
							label="Address"
							tintColor={modules.COLOR_MAIN}
							numberOfLines={10}
							multiline={true}
						/>
					</View>

					<TouchableOpacity
						style={styles.mapContainer}
						onPress={() => this.props.navigation.navigate('SelectMap')}
					>
						<MapView
							pointerEvents="none"
							ref={(ref) => (this.mapRef = ref)}
							provider={PROVIDER_GOOGLE}
							// onRegionChange={this.props.onMoveMap}
							style={styles.MapStyle}
							region={this.props.coords}
							initialRegion={this.props.coords}
						>
							<Marker coordinate={this.props.coords} />
						</MapView>
					</TouchableOpacity>

					<View style={styles.leftBox}>
						<Text>Latitude</Text>
						<Text style={styles.position}>{this.props.latitude}</Text>
					</View>

					<View style={styles.leftBox}>
						<Text>Longitude</Text>
						<Text style={styles.position}>{this.props.longitude}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	position: {
		marginTop: modules.BODY_HORIZONTAL / 2,
		...FontGSansSemiBold
	},
	MapStyle: {
		height: modules.VIEW_PORT_WIDTH / 2
	},
	mapContainer: {
		marginVertical: modules.BODY_HORIZONTAL * 2,
		borderWidth: 1
	},
	textfield: {
		marginTop: modules.BODY_HORIZONTAL,
		minHeight: 150
	},
	leftBox: {
		borderWidth: 1,
		padding: modules.BODY_HORIZONTAL,
		marginBottom: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS / 2,
		borderColor: '#999'
	},

	formGroups: {
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		marginVertical: modules.BODY_HORIZONTAL,
		borderBottomColor: modules.BORDER,
		paddingBottom: modules.BODY_HORIZONTAL,
		flex: 1
	},

	textArea: {},
	image: {
		width: '100%',
		height: '100%'
	},
	imageContainer: {
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		height: modules.VIEW_PORT_WIDTH / 2,
		marginHorizontal: modules.BODY_HORIZONTAL,

		borderRadius: modules.RADIUS,
		overflow: 'hidden'
	},
	selectImageText: {
		fontSize: modules.FONT,
		fontWeight: '500',
		color: '#555',
		marginBottom: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL
	},
	icon: {
		fontSize: modules.FONT_H1,
		marginHorizontal: modules.BODY_HORIZONTAL * 4,
		color: modules.COLOR_MAIN,
		marginBottom: modules.BODY_HORIZONTAL / 2
	},
	modal: {
		backgroundColor: 'transparent',
		justifyContent: 'flex-end'
	},
	containerModal: {
		backgroundColor: modules.WHITE,
		height: modules.VIEW_PORT_HEIGHT / 4,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
