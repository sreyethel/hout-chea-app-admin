import React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, SafeAreaView } from 'react-native';
import { inject, observer } from 'mobx-react';
import IonIcons from 'react-native-vector-icons/Feather';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import CountryItem from '../screens/Countries/CountryItem';

import COUNTRIES from '../dummy/countries';
import _styles from '../_styles';
import ArrowBackHeader from '../components/ArrowBackHeader';
import modules from '../modules';
import { fontBold } from './../../functions/customFont';


interface Props extends NavigationStackScreenProps {
	auth: any;
}

interface State {
	search: string;
	data: Array<any>;
}

@inject('auth')
@observer
export default class CountryContainer extends Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			search: '',
			data: COUNTRIES
		};
	}

	_goBack = () => {
		this.props.navigation.goBack(null);
	};

	flatSeparator = () => {
		return <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,.08)' }} />;
	};

	_selectedCountry = (item: any) => {
		const { code } = item;
		this.props.auth.country = code;
		this.props.navigation.goBack(null);
	};

	_search = (query: string) => {
		try {
			if (query === '') this.setState({ data: COUNTRIES });
			this.setState({ search: query });
			const filter = COUNTRIES.filter((country: any) => country.name.toLowerCase().includes(query.toLowerCase()));
			this.setState({
				data: filter
			});
		} catch (e) {
			this.setState({
				data: this.props.auth.countries
			});
		}
	};

	render() {
		const { data } = this.state;
		return (
			<View style={_styles.containerColorPrimary}>
				<ArrowBackHeader onGoBack={this._goBack} title={'Title'} />
				<View style={styles.body}>
					<View style={styles.form}>
						<Text style={styles.title}>{'Title'}</Text>
						<Text style={styles.subtitle}>{'Subtitle'}</Text>
						<View style={styles.searchControl}>
							<IonIcons name="search" style={styles.searchIcon} size={20} color={modules.PLACE_HOLDER} />
							<TextInput
								placeholderTextColor={modules.PLACE_HOLDER}
								placeholder={'Search'}
								autoFocus={true}
								clearButtonMode="always"
								autoCapitalize="none"
								value={this.state.search}
								onChangeText={this._search}
								style={styles.searchInput}
							/>
						</View>
					</View>
					<FlatList
						data={data}
						style={styles.countries}
						keyExtractor={(item) => item.name}
						ItemSeparatorComponent={this.flatSeparator}
						keyboardShouldPersistTaps="always"
						renderItem={({ item }) => (
							<CountryItem
								item={item}
								id={item.code}
								name={item.name}
								onSelected={this._selectedCountry}
							/>
						)}
					/>
				</View>
			</View>
		);
	}
}

const entryBorderRadius = 6;
const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: modules.WHITE
	},
	container: {
		flex: 1,
		backgroundColor: modules.WHITE,
		paddingBottom: 20
	},
	countries: {
		flex: 1,
		marginTop: 20,
		backgroundColor: modules.WHITE
	},
	form: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		backgroundColor: modules.WHITE
	},
	title: {
		color: modules.TEXT,
		fontSize: 22,
		...fontBold
	},
	subtitle: {
		color: modules.SUB_TITLE,
		fontSize: 12,
		marginTop: 5,
		marginBottom: modules.BODY_HORIZONTAL
	},
	searchControl: {
		flexDirection: 'row',
		backgroundColor: '#F4F6FB',
		borderRadius: entryBorderRadius,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 7,
		marginTop: 10
	},
	searchIcon: {
		marginRight: 5
	},
	searchInput: {
		flex: 1,
		fontSize: 18,
		...fontBold,
		padding: 0,
		margin: 0
	}
});
