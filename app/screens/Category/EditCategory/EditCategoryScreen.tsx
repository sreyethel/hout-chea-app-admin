import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import ArrowBackHeader from '../../../components/ArrowBackHeader';
import modules from '../../../modules';
import _styles from '../../../_styles';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../components/Header';

export interface AppProps {
	navigation: any;
	image: string;
	name: string;
	description: string;
	onPresCamera: any;
	onPresImage: any;
	onSave: any;
	onChangeName: (val: any) => void;
	onChangeDescription: (val: any) => void;
	loading: boolean;
}

export default class EditCategoryScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			modal: false
		};
	}

	public render() {
		return (
			<View>
					<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
				<Header
					title="Edit Category"
					loading={this.props.loading}
					onBack={() => this.props.navigation.goBack()}
					onEdit={true}
					isEdit={true}
					onSave={this.props.onSave}
				/>
				<View style={styles.formGroups}>
					<OutlinedTextField
						tintColor={modules.COLOR_MAIN}
						style={{ marginTop: modules.BODY_HORIZONTAL }}
						value={this.props.name}
						onChangeText={(val) => this.props.onChangeName(val)}
						label="Category Name"
					/>

					<OutlinedTextField
						value={this.props.description}
						onChangeText={(val) => this.props.onChangeDescription(val)}
						tintColor={modules.COLOR_MAIN}
						containerStyle={{ minHeight: 150 }}
						style={{ minHeight: 150 }}
						inputContainerStyle={styles.textArea}
						underlineColorAndroid="transparent"
						label="Category Description"
						numberOfLines={10}
						multiline={true}
					/>
					<View style={_styles.centerMode}>
						<Text style={styles.selectImageText}>Select Image</Text>
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
				</View>

				<Modal
					onBackdropPress={() => this.setState({ modal: !this.state.modal })}
					style={styles.modal}
					isVisible={this.state.modal}
				>
					<View style={[ _styles.rows, styles.containerModal ]}>
						<TouchableOpacity
							onPress={async () => {
								this.setState({ modal: !this.state.modal });
								await setTimeout(() => {
									this.props.onPresCamera();
								}, 500);
							}}
							style={_styles.centerMode}
						>
							<Icon style={styles.icon} name="camera" />
							<Text>Camera</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={async () => {
								this.setState({ modal: !this.state.modal });
								await setTimeout(() => {
									this.props.onPresImage();
								}, 500);
							}}
							style={_styles.centerMode}
						>
							<Icon style={styles.icon} name="images" />
							<Text>Gallery</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formGroups: {
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		marginVertical: modules.BODY_HORIZONTAL,
		borderBottomColor: modules.BORDER,
		paddingBottom: modules.BODY_HORIZONTAL
	},
	textAreaContainer: {
		borderColor: modules.SUB_TEXT,
		borderWidth: 1,
		padding: 5,
		marginTop: modules.BODY_HORIZONTAL
	},
	textArea: {
		height: 150,
		justifyContent: 'flex-start',
		marginTop: modules.BODY_HORIZONTAL / 2
	},
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
