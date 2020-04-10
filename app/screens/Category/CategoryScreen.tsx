import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import _styles from '../../_styles';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import modules from '../../modules';
import CategoryCard from '../../components/CategoryCard';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-navigation';
import { fontGSans } from '../../../functions/customFont';

export interface AppProps {
	navigation: any;
	dataCategory: any;
	onDelete: (item: any) => void;
	onEdit: (item: any) => void;
}

export interface AppState {
	modal: boolean;
	item: any;
}

export default class CategoryScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = { modal: false, item: null };
	}

	_onShowModal = (item?: string) => {
		this.setState({ modal: !this.state.modal, item: item ? item : '' });
	};

	public render() {
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header goBack={() => this.props.navigation.goBack()} title="Category" />
				<TouchableOpacity onPress={() => this.props.navigation.navigate('AddCategory')} style={styles.chip}>
					<Icon name="add" size={modules.FONT_H3} color="#fff" />
				</TouchableOpacity>

				<View style={styles.productContainer}>
					<FlatList
						ListFooterComponent={() => {
							return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }} />;
						}}
						data={this.props.dataCategory.slice()}
						renderItem={({ item }: any) => {
							return (
								<CategoryCard
									click={() => this.props.navigation.navigate('SubCategory', { item: item })}
									clickMore={() => this._onShowModal(item)}
									desc={item.description}
									bgColor={item.color}
									shipping={item.code}
									fileUrl={item.fileUrl}
									title={item.name}
									price={item.price}
								/>
							);
						}}
					/>
				</View>

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
								onPress={async () => {
									await this.setState({ modal: !this.state.modal });
									this.props.onEdit(this.state.item);
								}}
								style={styles.buttonEdit}
							>
								<Icon style={styles.icon} color={modules.SECONDARY} name="edit" />
								<Text style={styles.label}>Edit</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={async () => {
									await this.setState({ modal: !this.state.modal });
									setTimeout(() => {
										this.props.onDelete(this.state.item);
									}, 500);
								}}
								style={styles.buttonEdit}
							>
								<Icon style={styles.icon} color={modules.COLOR_MAIN} name="delete-forever" />
								<Text style={styles.label}>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<SafeAreaView />
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
	productContainer: {
		flex: 1
	},
	chip: {
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.BODY_HORIZONTAL * 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 12,
		zIndex: 2,
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
