import React from 'react';
import { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import IonIcons from 'react-native-vector-icons/Feather';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import CountryItem from './ListItem';
import { inject, observer } from 'mobx-react';
import _styles from '../../_styles';
import ArrowBackHeader from '../../components/ArrowBackHeader';
import modules from '../../modules';
import { fontBold, fontSemiBold } from './../../../functions/customFont';

interface Props extends NavigationStackScreenProps {
	auth: any;
	geo: any;
}

interface State {
	search: string;
	data: Array<any>;
	list: Array<any>;
	title: string;
	loading: boolean;
}

@inject('auth', 'geo')
@observer
export default class ListItemContainer extends Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			search: '',
			data: [],
			list: [],
			title: '',
			loading: true
		};
	}

	async componentDidMount() {
		const { params }: any = this.props.navigation.state;
		const { TITLE, TYPE } = params;
		const { selectedProvince, selectedDistrict, selectedCommune } = this.props.geo;

		let data: any = [];
		switch (TYPE) {
			case 'type':
				break;
			case 'province':
				data = await this.props.geo.fetchData();
				break;
			case 'district':
				if (selectedProvince) {
					data = await this.props.geo.fetchChangeProvince(selectedProvince, false);
				}
				break;
			case 'commune':
				if (selectedDistrict) {
					data = await this.props.geo.fetchChangeDistrict(selectedDistrict, false);
				}
				break;
			case 'village':
				if (selectedCommune) {
					data = await this.props.geo.fetchChangeCommune(selectedCommune, false);
				}
				break;
			default:
				break;
		}
		this.setState({
			title: TITLE,
			data: data,
			list: data,
			loading: false
		});
	}

	_goBack = () => {
		this.props.navigation.goBack(null);
	};

	flatSeparator = () => {
		return <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,.08)' }} />;
	};

	_selectedCountry = (item: any) => {
		const { params }: any = this.props.navigation.state;
		const { TYPE, ON_SELECTED_ITEM } = params;
		ON_SELECTED_ITEM(item, TYPE);
		this.props.navigation.goBack(null);
	};

	_search = (query: string) => {
		try {
			const { list } = this.state;
			if (query === '') this.setState({ data: list });
			this.setState({ search: query });
			const filter = list.filter(
				(country: any) =>
					country.name.toLowerCase().includes(query.toLowerCase()) ||
					(country.en_name && country.en_name.toLowerCase().includes(query.toLowerCase()))
			);
			this.setState({
				data: filter
			});
		} catch (e) {
			this.setState({
				data: this.state.list
			});
		}
	};

	render() {
		const { data, title, loading } = this.state;
		const { language } = this.props.auth;
		return (
			<View style={_styles.containerColorPrimary}>
				<ArrowBackHeader onGoBack={this._goBack} arrowIcon="x" title={`${'Select'} ${title}`} />
				<View style={styles.body}>
					<View style={styles.form}>
						<View style={styles.searchControl}>
							<IonIcons name="search" style={styles.searchIcon} size={24} color={modules.SUB_TEXT} />
							<TextInput
								placeholderTextColor={modules.SUB_TEXT}
								placeholder={'Search'}
								// clearButtonMode='always'
								autoCapitalize="none"
								value={this.state.search}
								onChangeText={this._search}
								style={styles.searchInput}
							/>
						</View>
					</View>
					{loading ? (
						<View style={[ _styles.flx1, _styles.centerMode ]}>
							<ActivityIndicator size="large" />
						</View>
					) : (
						<FlatList
							data={data}
							style={styles.countries}
							keyExtractor={(item) => item.name}
							ItemSeparatorComponent={this.flatSeparator}
							keyboardShouldPersistTaps="always"
							ListFooterComponent={() => <View style={_styles.fake} />}
							renderItem={({ item }) => (
								<CountryItem
									item={item}
									id={item.key}
									name={language === 'kh' ? item.name : item.en_name}
									onSelected={this._selectedCountry}
								/>
							)}
						/>
					)}
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
		backgroundColor: modules.WHITE
	},
	form: {
		paddingHorizontal: modules.BODY_HORIZONTAL,
		backgroundColor: modules.BACKGROUND,
		borderTopColor: 'rgba(255,255,255,.28)',
		borderTopWidth: 1
	},
	title: {
		color: modules.TEXT,
		fontSize: 22,
		...fontBold
	},
	subtitle: {
		color: modules.SUB_TITLE,
		fontSize: 12,
		marginTop: 5
	},
	searchControl: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: modules.BACKGROUND,
		paddingVertical: modules.BODY_HORIZONTAL - 2,
		paddingLeft: 10,
		paddingRight: 10
	},
	searchIcon: {
		marginRight: modules.BODY_HORIZONTAL,
		marginTop: 2
	},
	searchInput: {
		flex: 1,
		fontSize: modules.FONT_H4 - 2,
		...fontSemiBold,
		color: modules.TEXT,
		padding: 0,
		margin: 0
	}
});
