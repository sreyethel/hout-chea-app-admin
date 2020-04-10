import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import _styles from '../_styles';
import modules from '../modules';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

interface Props {}

export default ({  }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>
			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>

			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>

			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>
			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>
			<View style={styles.card}>
				<Placeholder Animation={Fade} Left={PlaceholderMedia}>
					<PlaceholderLine width={80} />
					<PlaceholderLine />
					<PlaceholderLine width={30} />
				</Placeholder>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: modules.WHITE_SUB,
		padding: modules.BODY_HORIZONTAL
	},
	card: {
		backgroundColor: modules.WHITE,
		padding: modules.BODY_HORIZONTAL_18,
		borderRadius: modules.RADIUS,
		marginBottom: modules.BODY_HORIZONTAL
	}
});
