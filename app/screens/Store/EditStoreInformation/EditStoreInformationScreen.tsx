import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, TextInput, Image,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MODULE from '../../../modules';
import Modal from 'react-native-modal';

import FastImage from 'react-native-fast-image';
import _styles from '../../../_styles';

export interface AppProps {
	navigation: any;
	onUpdateStore: any;
	store: any;
	loading: boolean;
	onSelectCamera: () => void;
	onSelectImage: () => void;
	image: string;
}

export interface AppState {
	name: string;
	email: string;
	modal: boolean;
	avatar: string;
}

export default class EditStoreInformationScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: this.props.store.name,
			email: this.props.store.email,
			modal: false,
			avatar: this.props.store.avatar
		};
	}

	onPresImage = async () => {
		this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			this.props.onSelectImage();
		}, 500);
	};

	onPresCamera = async () => {
		this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			this.props.onSelectCamera();
		}, 500);
	};

	onUpdateStore = () => {
		const item = {
			key: this.props.store.key,
			name: this.state.name,
			// email: this.state.email,
			avatar: this.state.avatar
		};
		this.props.onUpdateStore(item, this.props.image, this.props.store);
	};

	_renderEditProfile = () => {
		return (
			<View style={styles.HeaderContainer}>
				<TouchableOpacity
					disabled={this.props.loading}
					style={styles.backButton}
					onPress={() => this.props.navigation.goBack()}
				>
					<Icon style={styles.iconBack} name="left" />
				</TouchableOpacity>
				<Text style={styles.editProfileText}>Edit Profile</Text>
				<TouchableOpacity style={[ styles.backButton, { opacity: 0 } ]}>
					<Icon style={styles.iconBack} name="left" />
				</TouchableOpacity>
			</View>
		);
	};

	_renderBody = () => {
		return (
			<View>
				<View style={styles.interpretationContainer}>
					<Text style={styles.textInterpret}>Update Profile</Text>
					<Text style={styles.subTextInterpret}>Make changes to your personal information</Text>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					{/* <Text style={styles.selectImageText}>Select Image</Text> */}

					{this.props.image ? (
						<TouchableOpacity
							style={styles.imageContainer}
							onPress={() => this.setState({ modal: !this.state.modal })}
						>
							<FastImage
								resizeMode={FastImage.resizeMode.cover}
								style={styles.image}
								source={{ uri: this.props.image }}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.imageContainer}
							onPress={() => this.setState({ modal: !this.state.modal })}
						>
							<Image style={styles.image} source={require('./../../../../assets/download.png')} />
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.textFieldContainer}>
					<View style={styles.nameContainer}>
						<View style={styles.textFieldWrapper}>
							<Text style={styles.textLabel}>Store Name</Text>
							<TextInput
								onChangeText={(text) => this.setState({ name: text })}
								value={this.state.name}
								style={styles.input}
								placeholder="First name"
							/>
						</View>
					</View>
					{/* 
					<View style={styles.nameContainer}>
						<View style={styles.textFieldWrapper}>
							<Text style={styles.textLabel}>Email</Text>
							<TextInput
								onChangeText={(text) => this.setState({ email: text })}
								value={this.state.email}
								style={styles.input}
								placeholder="Email"
							/>
						</View>
					</View> */}
				</View>

				<TouchableOpacity
					disabled={this.props.loading}
					onPress={() => this.onUpdateStore()}
					style={styles.buttonSubmit}
				>
					{this.props.loading ? (
						<Text style={styles.textSubmitButton}>Updating......</Text>
					) : (
						<Text style={styles.textSubmitButton}>Update</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	public render() {
		return (
			<View style={_styles.flx1}>
				<SafeAreaView />
				{this._renderEditProfile()}
				{this._renderBody()}
				<Modal
					onBackdropPress={() => this.setState({ modal: !this.state.modal })}
					style={styles.modal}
					isVisible={this.state.modal}
				>
					<View style={[ _styles.row, styles.containerModal ]}>
						<TouchableOpacity onPress={() => this.onPresCamera()} style={styles.actionSheetButton}>
							<Icon style={styles.icon} name="camera" />
							<Text>Camera</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onPresImage()} style={styles.actionSheetButton}>
							<Icon style={styles.icon} name="picture" />
							<Text>Gallery</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	HeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: MODULE.BODY_HORIZONTAL / 2
	},
	backButton: {},
	iconBack: {
		fontSize: MODULE.FONT_H4,
		color: MODULE.TEXT,
		paddingLeft: MODULE.BODY_HORIZONTAL
	},
	editProfileText: {
		fontSize: MODULE.FONT_H5,
		color: MODULE.WHITE,
		fontWeight: '600'
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: MODULE.BODY_HORIZONTAL * 1.5,
		marginHorizontal: MODULE.BODY_HORIZONTAL
	},
	textLabel: {
		fontSize: MODULE.FONT,
		color: MODULE.TEXT,
		marginRight: MODULE.BODY_HORIZONTAL
	},
	input: {
		fontSize: MODULE.FONT,
		flex: 1
	},
	textFieldWrapper: {
		backgroundColor: '#F1F2F4',
		flex: 1,
		padding:Platform.OS=="ios"? MODULE.BODY_HORIZONTAL:0,
		paddingHorizontal:MODULE.BODY_HORIZONTAL,
		flexDirection: 'row',
		borderRadius: MODULE.RADIUS,
		alignItems:'center'
	},
	interpretationContainer: {
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL * 2
	},
	textInterpret: {
		fontSize: MODULE.FONT_H4 + 8,
		color: '#333'
	},
	textFieldContainer: {
		marginTop: MODULE.BODY_HORIZONTAL * 2
	},
	subTextInterpret: {
		color: MODULE.COLOR_MAIN,
		marginTop: MODULE.BODY_HORIZONTAL / 2
	},
	buttonSubmit: {
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		backgroundColor: MODULE.COLOR_MAIN,
		padding: MODULE.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: MODULE.BODY_HORIZONTAL * 1.5,
		borderRadius: MODULE.RADIUS
	},
	textSubmitButton: {
		color: MODULE.WHITE,
		fontWeight: '700'
	},
	actionSheetButton: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		fontSize: MODULE.FONT_H1,
		marginHorizontal: MODULE.BODY_HORIZONTAL * 4,
		color: MODULE.COLOR_MAIN,
		marginBottom: MODULE.BODY_HORIZONTAL / 2
	},
	modal: {
		backgroundColor: 'transparent',
		justifyContent: 'flex-end'
	},
	containerModal: {
		backgroundColor: MODULE.WHITE,
		height: MODULE.VIEW_PORT_HEIGHT / 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	imageContainer: {
		width: MODULE.VIEW_PORT_WIDTH / 2,
		height: MODULE.VIEW_PORT_WIDTH / 2,
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.VIEW_PORT_HEIGHT,
		overflow: 'hidden',
		marginTop: MODULE.BODY_HORIZONTAL,
		borderWidth: 5,
		borderColor: MODULE.BORDER_COLOR
	},
	selectImageText: {
		fontSize: MODULE.FONT,
		fontWeight: '500',
		color: '#555',
		marginBottom: MODULE.BODY_HORIZONTAL
	}
});
