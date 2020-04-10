import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import _styles from '../../../_styles';
import Icon from 'react-native-vector-icons/Feather';
import modules from '../../../modules';
import Header from '../../../components/Header';
import BannerCard from '../../../components/BannerCard';
import Modal from 'react-native-modal';
import { fontGSans } from '../../../../functions/customFont';

export interface AppProps {
	navigation: any;
	data: any;
	onEdit: (item: any) => void;
	onDelete: (item: any) => void;
}

export default class PosterScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = { modal: false };
	}

	_onShowModal = (item?: any) => {
		this.setState({ modal: !this.state.modal });
		item ? this.setState({ item: item }) : null;
	};

	public render() {
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header goBack={() => this.props.navigation.goBack()} title="Poster" />
				<FlatList
					ListFooterComponent={() => {
						return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }} />;
					}}
					data={this.props.data}
					renderItem={({ item }: any) => {
						return (
							<BannerCard
								clickMore={() => this._onShowModal(item)}
								image={item.fileUrl}
								name={item.name}
								index={item.index}
							/>
						);
					}}
				/>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('AddPoster')} style={styles.chip}>
					<Icon name="plus" size={modules.FONT_H3} color="#fff" />
				</TouchableOpacity>
				<Modal
					backdropTransitionOutTiming={0}
					onBackdropPress={() => this._onShowModal()}
					useNativeDriver={true}
					style={styles.modal}
					isVisible={this.state.modal}
				>
					<View style={styles.modalBox}>
						<View style={_styles.row}>
							<TouchableOpacity
								onPress={() => {
									this._onShowModal();
									setTimeout(() => {
										this.props.onEdit(this.state.item);
									}, 500);
								}}
								style={styles.buttonEdit}
							>
								<Icon style={styles.icon} color={modules.SECONDARY} name="edit" />
								<Text style={styles.label}>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this._onShowModal();
									setTimeout(() => {
										this.props.onDelete(this.state.item);
									}, 500);
								}}
								style={styles.buttonEdit}
							>
								<Icon style={styles.icon} color={modules.COLOR_MAIN} name="trash" />
								<Text style={styles.label}>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		fontSize: modules.FONT_H1
	},
	buttonEdit: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: modules.BODY_HORIZONTAL * 2
	},
	label: {
		fontSize: modules.FONT_P,
		...fontGSans,
		marginTop: modules.BODY_HORIZONTAL / 4
	},
	modalBox: {
		height: modules.VIEW_PORT_HEIGHT / 6,
		width: modules.VIEW_PORT_WIDTH,
		backgroundColor: modules.WHITE,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		flex: 1,
		margin: 0,
		justifyContent: 'flex-end'
	},

	chip: {
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.BODY_HORIZONTAL * 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 12,
		..._styles.rows,
		borderWidth: 1,
		borderColor: modules.COLOR_MAIN,
		width: modules.BODY_HORIZONTAL * 5,
		height: modules.BODY_HORIZONTAL * 5,
		position: 'absolute',
		right: modules.BODY_HORIZONTAL * 2,
		bottom: modules.BODY_HORIZONTAL * 2,
		shadowColor: modules.COLOR_MAIN,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6
	}
});
