import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator,TouchableOpacity, ScrollView } from 'react-native';
import modules from '../../modules';
import Icon from 'react-native-vector-icons/Feather';
import _styles from '../../_styles';
import CheckBox from 'react-native-check-box';
import FastImage from 'react-native-fast-image';
export interface AppProps {
	navigation: any;
	dataDepartment: Array<any>;
	onSelect: any;
	selected: Array<any>;
	isCheck: boolean;
	isContinue: boolean;
	loading: boolean;
	onSaveDepartment: any;
}

export interface AppState {}

export default class SelectDepartmentScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	_renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity style={{ opacity: 0 }} disabled={!this.props.isContinue}>
					<Text style={styles.textContinue}>Continue</Text>
				</TouchableOpacity>
				<Text style={styles.labelTitle}>Department</Text>
				<TouchableOpacity onPress={this.props.onSaveDepartment} disabled={!this.props.isContinue}>
					{this.props.loading ? <ActivityIndicator /> : <Text style={styles.textContinue}>Continue</Text>}
				</TouchableOpacity>
			</View>
		);
	};

	_renderBody = () => {
		const { dataDepartment, selected } = this.props;
		
		return (
			<View style={styles.bodyContainer}>
				<Text style={styles.labelDesc}>Please Select the departments related to your store's preferences.</Text>
				{dataDepartment.map((i: any, index: any) => {
					return (
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.props.onSelect(i)}
							style={[
								styles.checkBoxWrapper,
								selected.filter((m: any) => m.key === i.key).length > 0 ? styles.checked : null
							]}
						>
							<View style={styles.checkBoxContainer}>
								<FastImage style={styles.img} source={{ uri: i.fileUrl }} />
								<Text
									style={
										selected.filter((m: any) => m.key === i.key).length > 0 ? (
											styles.textCheck
										) : null
									}
								>
									{i.name}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	public render() {
		return (
			<SafeAreaView style={_styles.flx1}>
				{this._renderHeader()}
				<ScrollView>{this._renderBody()}</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	textCheck: {
		color: modules.WHITE
	},
	checked: {
		backgroundColor: modules.ACTIVE,

		borderColor: modules.ACTIVE
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: modules.BODY_HORIZONTAL_12,
		borderBottomColor: modules.BORDER_COLOR,
		paddingBottom: modules.BODY_HORIZONTAL_12,
		borderBottomWidth: 1
	},
	iconBack: {
		fontSize: modules.FONT_H2,
		color: modules.COLOR_MAIN
	},
	labelTitle: {
		fontSize: modules.FONT,
		fontWeight: '500',
		color: modules.TEXT
	},
	textContinue: {
		fontSize: modules.FONT_P
	},
	labelDesc: {
		fontSize: modules.FONT_S
	},
	bodyContainer: {
		marginHorizontal: modules.BODY_HORIZONTAL_12
	},
	checkBox: {
		width: modules.BODY_HORIZONTAL
	},
	checkBoxContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	checkBoxWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: modules.BODY_HORIZONTAL,
		borderWidth: 1,
		marginTop: modules.BODY_HORIZONTAL,
		borderRadius: modules.CARD_RADIUS,
		borderColor: '#e0e0e0'
	},
	img: {
		width: modules.BODY_HORIZONTAL * 2,
		height: modules.BODY_HORIZONTAL * 2,
		marginRight: modules.BODY_HORIZONTAL
	}
});
