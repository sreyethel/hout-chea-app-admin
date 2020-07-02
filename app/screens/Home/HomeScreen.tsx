import React from 'react';
import { View, SafeAreaView, ActivityIndicator, StatusBar, StyleSheet, Text, ScrollView } from 'react-native';
import _styles from '../../_styles';
import HomeHeader from '../../components/HomeComponent/HomeHeader';
import modules from '../../modules';
import RnPieChart from '../../components/RnPieChart';
import RnBarChart from '../../components/RnBarChart';
import { FontGSansBold, fontGSans } from '../../../functions/customFont';
import MenuButton from '../../components/MenuButton';
import LinearGradient from 'react-native-linear-gradient';
import MainHeader from '../../components/MainHeader';

interface Props {
	onProduct: () => void;
	loading: boolean;
	account: any;
	order: any;
	dataStatistic: any;
	dataLastSevenDays: Array<any>;
	loadingBarChart: boolean;
	goTo: (item: any) => void;
	openMessenger: () => void;
	badge: number
}

const height = modules.VIEW_PORT_WIDTH / 4;

const pad = (d: any) => {
	return d < 10 ? '' + d.toString() : d.toString();
};

export default ({ badge, openMessenger, goTo, order, dataStatistic, dataLastSevenDays, loadingBarChart }: Props) => {
	return (
		<View style={[_styles.flx1, _styles.background]}>
			<SafeAreaView style={{ backgroundColor: modules.COLOR_MAIN }} />
			<StatusBar barStyle="light-content" backgroundColor={modules.COLOR_MAIN} />
			<MainHeader
				badge={badge}
				onNoti={() => goTo('Noti')}
			/>
			<ScrollView showsVerticalScrollIndicator={false} style={_styles.flx1}>
				<View style={styles.menuContainer}>
					<View style={_styles.row}>
						<MenuButton click={() => goTo('Product')} title="Product" image={modules.PRODUCT} />
						<LinearGradient
							style={{ width: 0.7, height: height }}
							colors={modules.GRADIENT_LINE_2}
							start={{ x: 0, y: 1 }}
							end={{ x: 0, y: 0 }}
						/>
						<MenuButton click={() => goTo('Order')} title="Order" image={modules.ORDER} />
						<LinearGradient
							style={{ width: 0.7, height: height }}
							colors={modules.GRADIENT_LINE_2}
							start={{ x: 0, y: 1 }}
							end={{ x: 0, y: 0 }}
						/>
						<MenuButton click={() => goTo('Category')} title="Category" image={modules.CATEGORY} />
					</View>
					<LinearGradient
						style={{ width: '100%', height: 0.7 }}
						colors={modules.GRADIENT_LINE}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
					/>
					<View style={_styles.row}>
						<MenuButton click={() => goTo('Banner')} title="Banner" image={modules.BANNER} />
						<View style={styles.centerVerticalLine} />
						<MenuButton click={() => goTo('Promotion')} title="Promotion" image={modules.PROMOTION} />
						<View style={styles.centerVerticalLine} />
						<MenuButton click={() => goTo('Poster')} title="Poster" image={modules.POSTER} />
					</View>
					<LinearGradient
						style={{ width: '100%', height: 1 }}
						colors={modules.GRADIENT_LINE}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
					/>
					<View style={_styles.row}>
						<MenuButton click={() => goTo('FeedBack')} title="Feedback" image={modules.COMMENT} />
						<LinearGradient
							style={{ width: 0.7, height: height }}
							colors={modules.GRADIENT_LINE_2}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
						/>
						<MenuButton click={() => goTo('Location')} title="Location" image={modules.LOCATION} />
						<LinearGradient
							style={{ width: 0.7, height: height }}
							colors={modules.GRADIENT_LINE_2}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
						/>
						<MenuButton click={() => goTo('Profile')} title="Profile" image={modules.USER} />
					</View>
				</View>
				<View style={styles.orderRow}>
					<View style={styles.halfPieChart}>
						<RnPieChart allOrder={order.length} dataStatistic={dataStatistic} />
					</View>
					<View style={[styles.halfPieChart, { paddingLeft: 12 }]}>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[0] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[0].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Pending</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[1] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[1].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Confirm</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[2] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[2].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Delivery</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[3] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[3].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Reject</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[4] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[4].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Complete</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={_styles.rows}>
								<View style={[styles.orderColor, { backgroundColor: modules.PROGRESS_COLOR[5] }]} />
								<Text style={styles.countSubOrder}>{pad(dataStatistic[5].value)}</Text>
							</View>
							<View style={styles.center}>
								<Text style={styles.sublabel}>Return</Text>
							</View>
						</View>
					</View>
				</View>
				{!loadingBarChart ? <RnBarChart dataAny={dataLastSevenDays} /> : <ActivityIndicator size="large" />}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	centerVerticalLine: {
		width: 0.7,
		height: height,
		backgroundColor: modules.COLOR_MAIN
	},
	chartContainer: {
		backgroundColor: modules.WHITE,
		..._styles.centerMode,
		padding: modules.BODY_HORIZONTAL,
		marginHorizontal: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS / 2
	},
	fullChart: {
		height: modules.VIEW_PORT_WIDTH / 3,
		width: modules.VIEW_PORT_WIDTH / 2,
		backgroundColor: modules.WHITE,
		justifyContent: 'center'
	},
	menuContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: modules.VIEW_PORT_WIDTH,
		backgroundColor: modules.WHITE,
		borderRadius: modules.RADIUS / 2,
		..._styles.shadowSmall,
		marginBottom: modules.BODY_HORIZONTAL
	},
	headerColor: {
		backgroundColor: modules.COLOR_MAIN
	},
	halfPieChart: {
		width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 4) / 2,
		borderRadius: modules.RADIUS / 2
	},
	orderRow: {
		borderRadius: modules.RADIUS / 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		marginHorizontal: modules.BODY_HORIZONTAL,
		// borderWidth: 1,
		// borderColor: '#f8a0a3',
		padding: modules.BODY_HORIZONTAL,
		backgroundColor: modules.WHITE,

		..._styles.shadowSmall
	},
	label: {
		fontWeight: '500',
		...FontGSansBold
	},
	countOrder: {
		fontSize: modules.FONT + 5,
		fontWeight: '500',
		textAlign: 'center'
	},
	countSubOrder: {
		fontSize: modules.FONT_H6,
		textAlign: 'center',
		...fontGSans,
		color: modules.SUB_TEXT,
		minWidth: 15
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingRight: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL
	},
	sublabel: {
		fontSize: modules.FONT - 2,
		...fontGSans,
		color: modules.SUB_TEXT
	},
	orderColor: {
		width: modules.BODY_HORIZONTAL * 1.2,
		height: modules.BODY_HORIZONTAL * 1.2,
		borderRadius: modules.BODY_HORIZONTAL,
		marginRight: modules.BODY_HORIZONTAL / 2
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: modules.BODY_HORIZONTAL / 3.5
	}
});
