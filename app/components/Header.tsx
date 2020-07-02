import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import MODULE from '../modules';

import Icon from 'react-native-vector-icons/Feather';
export interface AppProps {
	title: string;
	onBack: any;
	onEdit?: any;
	onSave?: any;
	isEdit?: boolean;
	loading?: boolean;
	isMap?: boolean;
	noRight?: boolean;
}

export default ({ noRight, isMap, loading, title, onBack, onEdit, isEdit, onSave }: AppProps) => {
	if (Platform.OS == "ios") {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={onBack} style={styles.row}>
					<Icon name="chevron-left" style={styles.icon} />
					<Text style={styles.txtBack}>Back</Text>
				</TouchableOpacity>

				<Text style={styles.title}>{title}</Text>

				{noRight ? <TouchableOpacity onPress={onEdit} style={[styles.row, { justifyContent: 'flex-end' }]}>
					{/* <Icon name="edit" style={[styles.icon, { fontSize: 24, paddingHorizontal: 12 }, isMap ? { color: '#fff' } : null]} /> */}
				</TouchableOpacity> :
					!isEdit ?
						<TouchableOpacity onPress={onEdit} style={[styles.row, { justifyContent: 'flex-end' }]}>
							<Icon name="edit" style={[styles.icon, { fontSize: 24, paddingHorizontal: 12 }, isMap ? { color: '#fff' } : null]} />
						</TouchableOpacity>
						:
						loading ?
							<ActivityIndicator color='#fff' style={{ paddingHorizontal: 12 }} />
							:
							<TouchableOpacity onPress={onSave} style={[styles.row, { justifyContent: 'center' }]}>
								<Icon name="save" style={[styles.icon, { color: MODULE.WHITE, fontSize: 24, paddingHorizontal: 12 }]} />
							</TouchableOpacity>
				}
			</View>
		);
	} else {
		return (
			<View style={[styles.SHADOW, styles.container, { justifyContent: 'flex-start', paddingVertical: MODULE.BODY_HORIZONTAL }]}>
				<TouchableOpacity onPress={onBack} style={styles.row}>
					<Icon name="arrow-left" style={[styles.icon, { fontSize: 22, color: '#fff', paddingHorizontal: 12 }]} />
				</TouchableOpacity>

				<Text style={[styles.title, { paddingHorizontal: 20, fontSize: 20, fontWeight: '400' }]}>{title}</Text>
				<View style={{ flex: 1 }} />

				{
					noRight ? <TouchableOpacity onPress={onEdit} style={[styles.row, { justifyContent: 'flex-end' }]}>
						<Icon name="edit" style={[styles.icon, { fontSize: 24, paddingHorizontal: 12 }, isMap ? { color: '#fff' } : null]} />
					</TouchableOpacity> :
						!isEdit ?
							<TouchableOpacity onPress={onEdit} style={[styles.row, { justifyContent: 'flex-end' }]}>
								<Icon name="edit" style={[styles.icon, { fontSize: 24, paddingHorizontal: 12 }, isMap ? { color: '#fff' } : null]} />
							</TouchableOpacity>
							:
							loading ?
								<ActivityIndicator color='#fff' style={{ paddingHorizontal: 12 }} />
								:
								<TouchableOpacity onPress={onSave} style={[styles.row, { justifyContent: 'center' }]}>
									<Icon name="save" style={[styles.icon, { color: MODULE.WHITE, fontSize: 24, paddingHorizontal: 12 }]} />
								</TouchableOpacity>
				}
			</View>
		);

	}

};

const styles = StyleSheet.create({
	container: {
		// paddingHorizontal: MODULE.BODY_HORIZONTAL/3,
		paddingVertical: MODULE.BODY_HORIZONTAL / 3 - 1,
		flexDirection: 'row',
		backgroundColor: MODULE.PRIMARY,
		justifyContent: 'space-between',
		alignItems: 'center'

	},
	icon: {
		color: MODULE.WHITE,
		fontSize: 34,

	},
	title: {
		color: MODULE.WHITE,
		fontSize: 17,
		fontWeight: '600'
	},
	txtBack: {
		color: MODULE.WHITE,
		fontSize: 17,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		width: MODULE.VIEW_PORT_WIDTH / 8
	},
	SHADOW: {
		borderBottomWidth: 0.1,
		borderColor: '#dedede',

		shadowColor: "#CFCCDC",
		shadowOffset: {
			width: 0.1,
			height: 0.8
		},
		shadowRadius: 8,
		shadowOpacity: 0.65,
		elevation: 5,


	}

});
