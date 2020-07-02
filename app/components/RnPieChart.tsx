import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import MODULE from './../modules';
import modules from './../modules';
import { FontGSansSemiBold, fontGSans } from '../../functions/customFont';
const dataSample = [
	{ key: 1, value: 13222406, color: MODULE.PROGRESS_COLOR[0] },
	{ key: 2, value: 6432833, color: MODULE.PROGRESS_COLOR[1] },
	{ key: 2, value: 6432833, color: MODULE.PROGRESS_COLOR[3] }
];

interface Props {
	dataStatistic: Array<any>;
	allOrder: number;
}

export default ({ dataStatistic, allOrder }: Props) => {
	const result = dataStatistic.reduce((sum, { value }) => sum + value, 0);
	const data = dataStatistic.map((item, index) => {
		const per = item.value * 10 / result;
		return {
			key: index,
			value: item.value,
			svg: { fill: item.color },
			arc: { outerRadius: 100 + per + '%', padAngle: 0.03, cornerRadius: 6 }
		};
	});

	return (
		<View style={{ flex: 1 }}>
			<PieChart style={{ height: '100%' }} outerRadius={'90%'} innerRadius={'75%'} data={data} />
			<View style={styles.order}>
				<Text style={styles.label}>{allOrder}</Text>
				<Text style={styles.text}>Orders</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: modules.FONT_P,
		...fontGSans,
		color: modules.SUB_TEXT
	},
	label: {
		fontSize: modules.FONT_H4,
		...FontGSansSemiBold,
		color: modules.SUB_TEXT
	},
	order: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
