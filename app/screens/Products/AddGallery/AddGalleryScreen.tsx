import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ArrowBackHeader from '../../../components/ArrowBackHeader';
import modules from './../../../modules';
import _styles from '../../../_styles';
import { FontGSansSemiBold } from '../../../../functions/customFont';
import Icon from 'react-native-vector-icons/Feather';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);

export interface AppProps {
	selectImage: any;
	images: any;
	edit: boolean;
	onEdit: any;
	loading: boolean;
	removeImage: (i: any, index: any) => void;
	goBack: any;
	onSave: () => void;
}

export default class AddGalleryScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	_renderLoading = () => {
		const { loading } = this.props;

		if (loading)
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator color="#fff" size="large" />
				</View>
			);

		return;
	};

	public render() {
		return (
			<View style={_styles.flx1}>
				{this._renderLoading()}
				<ArrowBackHeader
					activeSave={false}
					onGoBack={this.props.goBack}
					title="Add New Product"
					color={modules.WHITE}
					// onRight={this.props.onSave}
					rightText={'Save'}
				/>

				<View style={styles.container}>
					<View style={[ _styles.rows, { padding: modules.BODY_HORIZONTAL } ]}>
						<TouchableOpacity onPress={this.props.selectImage} style={styles.button}>
							<Icon name="plus" />
							<Text style={styles.buttonLabel}>Select Image</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.props.onEdit} style={styles.button}>
							<Icon name="edit" />
							<Text style={styles.buttonLabel}>Edit</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.imageWrapper}>
						{this.props.images.map((i: any, index: any) => {
							return (
								<View style={styles.imageContainer}>
									{this.props.edit ? (
										<TouchableOpacity
											onPress={() => this.props.removeImage(i, index)}
											style={styles.iconContainer}
										>
											<Icon size={modules.FONT_H6} color="#fff" name="x" />
										</TouchableOpacity>
									) : null}
									<Image
										indicator={<ActivityIndicator />}
										style={styles.image}
										source={{ uri: i.img }}
									/>
								</View>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	iconContainer: {
		backgroundColor: modules.PROGRESS_COLOR_2[3],
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		position: 'absolute',
		top: -15,
		zIndex: 1,
		right: -10
	},
	imageWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	imageContainer: {
		marginLeft: modules.BODY_HORIZONTAL,
		marginBottom: modules.BODY_HORIZONTAL
	},
	image: {
		width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 4) / 3,
		height: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 4) / 3,
		borderRadius: modules.RADIUS,
		borderWidth: 1,
		borderColor: modules.BORDER_COLOR,
		overflow: 'hidden'
	},
	container: {},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: modules.CARD_RADIUS * 2,
		flexDirection: 'row',
		paddingVertical: modules.BODY_HORIZONTAL / 1.5,
		paddingHorizontal: modules.BODY_HORIZONTAL * 2,
		backgroundColor: modules.BORDER_COLOR,
		marginRight: modules.BODY_HORIZONTAL
	},
	buttonLabel: {
		fontSize: modules.FONT_S,
		...FontGSansSemiBold,
		marginLeft: modules.BODY_HORIZONTAL / 4
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: modules.VIEW_PORT_WIDTH,
		height: modules.VIEW_PORT_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)'
	}
});
