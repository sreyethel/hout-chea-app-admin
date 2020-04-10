import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import _styles from '../../_styles';
import Header from '../../components/Header';
import { FlatList } from 'react-native-gesture-handler';
import modules from '../../modules';
import moment from 'moment';

export interface AppProps {
	dataFeedBack: any;
	navigation: any;
}

export default class FeedBackScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	public render() {
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header goBack={() => this.props.navigation.goBack()} title="Feed Back" />

				<FlatList
					data={this.props.dataFeedBack.slice()}
					renderItem={({ item }: any) => {
						return (
							<View style={styles.container}>
								<View style={styles.textBox}>
									<Text style={styles.text}>{item.comment}</Text>
								</View>
								<View style={_styles.separate}>
									<Text>{moment.unix(item.created_date.seconds).format('DD MMMM YYYY')}</Text>
									<Text>{moment.unix(item.created_date.seconds).fromNow()}</Text>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_H6
	},
	textBox: {
		minHeight: modules.BODY_HORIZONTAL * 5,
		backgroundColor: `${modules.COLOR_MAIN}10`,
		marginBottom: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS / 2,
		padding: modules.BODY_HORIZONTAL
	},
	container: {
		margin: modules.BODY_HORIZONTAL,
		backgroundColor: modules.WHITE,
		padding: modules.BODY_HORIZONTAL,
		..._styles.shadow,
		borderRadius: modules.RADIUS / 2
	}
});
