import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import RegisterAddressScreen from './RegisterAddressScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';

interface Props extends NavigationStackScreenProps {
	auth: any;
	geo: any;
	store: any;
}

interface State {
	name: string;
	last_name: string;
	contact_number: string;
	province: any;
	district: any;
	commune: any;
	village: any;
	street: any;
	homeNo: any;
	email: any;
	website: any;
}

@inject('auth', 'geo', 'store')
@observer
export default class RegisterAddressContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: '',
			last_name: '',
			contact_number: '',
			province: '',
			district: '',
			commune: '',
			village: '',
			street: '',
			homeNo: '',
			email: '',
			website: ''
		};
	}

	componentDidMount() {
		const { selectedStoreKey } = this.props.store;

		this.props.store.fetchData(selectedStoreKey);
		this.props.geo.clearGeo();
	}

	// onGoBack = () => {
	// 	this.props.geo.clearGeo();
	// 	this.props.navigation.goBack();
	// };

	onSaveStoreInfo = () => {
		const { selectedStore } = this.props.auth;
		const { profile } = this.props.auth;
		const { province, district, commune, village, homeNo, street, contact_number, email, website } = this.state;
		if (!contact_number || !province || !district || !commune || !village) {
			Alert.alert('Invalid ', 'please fill required Informations.');
			return;
		}
		const { key } = selectedStore;
		const form: any = {
			key,
			province,
			district,
			commune,
			village,
			homeNo,
			street,
			contact_number,
			email,
			website
		};

		//NOTE: form

		this.props.store.addStoreInfo(profile, form, (success: any) => {
			if (success) {
				this.props.navigation.navigate('SELECTE_DEPARTMENT');
			}
		});
	};

	// onSaveNewStore = () => {

	// };

	_onGoBack = () => {
		Alert.alert(
			'',
			'Are you sure you want to stop this process?',
			[
				{ text: 'Yes', onPress: () => this.props.auth.logOut() },
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	_onSelectedItem = async (item: any, state: any) => {
		const data: any = { [state]: item };
		this.setState(data);
		switch (state) {
			case 'province':
				this.setState({
					district: '',
					commune: '',
					village: ''
				});
				await this.props.geo.fetchChangeProvince(item, true);
				break;
			case 'district':
				this.setState({
					commune: '',
					village: ''
				});
				await this.props.geo.fetchChangeDistrict(item, true);
				break;
			case 'commune':
				this.setState({
					village: ''
				});
				await this.props.geo.fetchChangeCommune(item, true);
				break;
			default:
				break;
		}
	};

	render() {
		const {
			provinces,
			district,
			commune,
			village,
			selectedVillage,
			selectedProvince,
			selectedDistrict,
			selectedCommune
		} = this.props.geo;
		const { language } = this.props.auth;
		const { process, loading } = this.props.store;
		return (
			<RegisterAddressScreen
				goBack={() => this._onGoBack()}
				process={false}
				loading={loading}
				onProvince={() =>
					this.props.navigation.navigate('LIST_ITEM', {
						ON_SELECTED_ITEM: this._onSelectedItem,
						TYPE: 'province',
						TITLE: 'Province',
						DATA: provinces
					})}
				onDistrict={() =>
					this.props.navigation.navigate('LIST_ITEM', {
						ON_SELECTED_ITEM: this._onSelectedItem,
						TYPE: 'district',
						TITLE: 'District',
						DATA: district
					})}
				onCommune={() =>
					this.props.navigation.navigate('LIST_ITEM', {
						ON_SELECTED_ITEM: this._onSelectedItem,
						TYPE: 'commune',
						TITLE: 'Commune',
						DATA: commune
					})}
				onVillage={() =>
					this.props.navigation.navigate('LIST_ITEM', {
						ON_SELECTED_ITEM: this._onSelectedItem,
						TYPE: 'village',
						TITLE: 'Village',
						DATA: village
					})}
				onEmail={(text: any) => this.setState({ email: text })}
				onWebsite={(text: any) => this.setState({ website: text })}
				onContactNumberChange={(text: any) => this.setState({ contact_number: text })}
				onHomeNoChange={(text: any) => this.setState({ homeNo: text })}
				onStreetChange={(text: any) => this.setState({ street: text })}
				name={this.state.name}
				last_name={this.state.last_name}
				contact_number={this.state.contact_number}
				province={this.state.province || selectedProvince}
				district={this.state.district || selectedDistrict}
				commune={this.state.commune || selectedCommune}
				village={this.state.village || selectedVillage}
				street={this.state.street}
				homeNo={this.state.homeNo}
				// onGoBack={this.onGoBack}
				language={language}
				onContinue={() => this.onSaveStoreInfo()}
				email={this.state.email}
				website={this.state.website}
			/>
		);
	}
}
