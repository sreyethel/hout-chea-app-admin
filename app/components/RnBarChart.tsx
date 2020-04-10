import React from 'react';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Text, View, StyleSheet } from 'react-native';
import * as scale from 'd3-scale';
import modules from './../modules';
import { FontGSansBold, FontGSansSemiBold, fontSemiBold, fontGSans } from '../../functions/customFont';
import _styles from '../_styles';
interface Props {
	height?: number;
	dataAny: any;
}
export default ({ dataAny }: Props) => {
	const mapData: Array<any> = dataAny.filter(() => dataAny.length > 0).map((item: any, index: any) => ({
		value: item.value,
		color: item.color,
		date: item.date,
		svg: {
			fill: `url(#gradient${index})`
		}
	}));

	const Gradient = ({  }: any) => {
		return dataAny.map((item: any, index: any) => (
			<Defs key={index}>
				<LinearGradient id={`gradient${index}`} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
					<Stop offset={'0%'} stopColor="gold" />

					<Stop offset={'100%'} stopColor={modules.COLOR_MAIN} />
				</LinearGradient>
			</Defs>
		));
	};

	return (
		<View style={styles.pieChart}>
			<Text style={styles.label}>Last 7 Days Orders</Text>
			<BarChart
				style={{ height: modules.VIEW_PORT_WIDTH / 2 - modules.BODY_HORIZONTAL * 2 }}
				data={mapData.slice()}
				spacingInner={0.3}
				contentInset={{ top: 0, bottom: 10 }}
				yAccessor={({ item }) => item.value}
				yMin={5}
				yMax={70}
			>
				<Gradient />
			</BarChart>
			<XAxis
				style={styles.axis}
				data={dataAny}
				scale={scale.scaleBand}
				formatLabel={(value: any, index: any) => dataAny[index].date}
				contentInset={{ left: -10, right: -10 }}
				svg={{ fontSize: 14, fill: '#555', ...fontGSans }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	pieChart: {
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,

		padding: modules.BODY_HORIZONTAL,
		marginHorizontal: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS / 2,
		marginBottom: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL,
		..._styles.shadowSmall,
		backgroundColor: modules.WHITE
	},
	axis: {
		marginTop: modules.BODY_HORIZONTAL / 2
	},
	label: {
		fontSize: modules.FONT,
		...fontGSans,
		color: modules.SUB_TEXT
	}
});
