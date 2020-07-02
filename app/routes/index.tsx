import React from 'react';
import MODULE from '../modules'
import { TouchableOpacity, StyleSheet } from 'react-native';
import _styles from '../_styles';
import modules from '../modules';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeContainer from '../screens/Home/HomeContainer';
import LoginContainer from '../screens/Login/LoginContainer';
import LoginPhoneContainer from '../screens/Login/LoginPhone/LoginPhoneContainer';
import ConfirmCodeContainer from '../screens/Login/ConfirmCode/ConfirmCodeContainer';
import WelcomeContainer from '../container/WelcomeContainer';
import SignUpContainer from '../screens/SignUp/SignUpContainer';
import RegisterStoreContainer from '../screens/RegisterStore/RegisterStoreContainer';
import CountryContainer from '../container/CountryContainer';
import RegisterAddressContainer from '../screens/RegisterAddress/RegisterAddressContainer';
import ListItemContainer from '../screens/ListItem/inde';
import RegisterConfirmContainer from '../screens/Login/ConfirmCode/RegisterConfirmContainer';
import SelectDepartmentContainer from '../screens/SelectDepartment/SelectDepartmentContainer';
import RegisterMapContainer from '../screens/RegisterMaps/RegisterMapsContainer';
import OrderContainer from '../screens/Orders/OrderContainer';
import ProfileContainer from '../screens/Profile/ProfileContainer';

import EditUserInformationContainer from '../screens/Profile/EditUserInformation/EditUserInformationContainer';
import EditStoreInformationContainer from '../screens/Store/EditStoreInformation/EditStoreInformationContainer';
import OrderDetailContainer from '../screens/Orders/orderDetail/OrderDetailContainer';
import OrderByStatusContainer from '../screens/Orders/orderByStatus/OrderByStatusContainer';
import { createStackNavigator, NavigationStackScreenProps } from 'react-navigation-stack';
import ProductContainer from '../screens/Products/ProductContainer';
import AddProductContainer from '../screens/Products/AddProduct/AddProductContainer';
import AddProductColorDetailContainer from '../screens/Products/ProductDetail/AddProductColorDetail/AddProductColorDetailContainer';
import AddProductDetailContainer from '../screens/Products/ProductDetail/AddProductDetail/AddProductDetailContainer';
import SelectProductDetailContainer from '../screens/Products/ProductDetail/SelectProductDetail/SelectProductDetailContainer';
import AddGalleryContainer from '../screens/Products/AddGallery/AddGalleryContainer';
import EditProductContainer from '../screens/Products/EditProduct/EditProductContainer';
import CategoryContainer from '../screens/Category/CategoryContainer';
import AddCategoryContainer from '../screens/Category/AddCategory/AddCategoryContainer';
import AddBannerContainer from '../screens/Home/Banner/AddBanner/AddBannerContainer';
import BannerContainer from '../screens/Home/Banner/BannerContainer';
import PromotionContainer from '../screens/Home/Promotion/PromotionContainer';
import AddPromotionContainer from '../screens/Home/Promotion/AddPromotion/AddPromotionContainer';
import PosterContainer from '../screens/Home/Poster/PosterContainer';
import AddPosterContainer from '../screens/Home/Poster/AddPoster/AddPosterContainer';
import LocationContainer from '../screens/Home/Location/LocationContainer';
import AddLocationContainer from '../screens/Home/Location/AddLocation/AddLocationContainer';
import SubCategoryContainer from '../screens/SubCategory/SubCategoryContainer';
import AddSubCategoryContainer from '../screens/SubCategory/AddSubCategory/AddSubCategoryContainer';
import EditCategoryContainer from '../screens/Category/EditCategory/EditCategoryContainer';
import EditSubCategoryContainer from '../screens/SubCategory/EditSubCategory/EditSubCategoryContainer';
import EditBannerContainer from '../screens/Home/Banner/EditBanner/EditBannerContainer';
import EditPromotionContainer from '../screens/Home/Promotion/EditPromotion/EditPromotionContainer';
import EditPosterContainer from '../screens/Home/Poster/EditPoster/EditPosterContainer';
import EditLocationContainer from '../screens/Home/Location/EditLocation/EditLocationContainer';
import SelectMapScreen from '../screens/Home/Location/SelectMap/SelectMapScreen';
import FeedBackContainer from '../screens/Feedback/FeedBackContainer';
import RegisterUserContainer from '../screens/Profile/ResgisterUser/RegisterUserContainer';
import StockContainer from '../screens/Products/Stock/StockContainer';
import SelectUnitMeasurementContainer from '../screens/Products/SelectUnitMeasurement/SelectUnitMeasurementContainer';
import NotiContainer from '../screens/Noti/NotiContainer';
import SelectProductContainer from '../screens/Products/SelectProduct/SelectProductContainer';

const AUTH_STACK = createStackNavigator(
	{
		LOGIN: LoginContainer,
		LOGIN_PHONE: LoginPhoneContainer,
		CREATE_STORE: SignUpContainer,
		COUNTRIES: CountryContainer,
		PhoneCode: ConfirmCodeContainer,
		REGISTER_CONFIRM_CODE: RegisterConfirmContainer,
		REGISTER_STORE: RegisterStoreContainer,
		SELECT_DEPARTMENT: SelectDepartmentContainer,
		REGISTER_MAP: RegisterMapContainer
	},
	{
		mode: 'modal',
		headerMode:'none'
	}
);

const STORE_STACK = createStackNavigator(
	{
		STORE: RegisterAddressContainer,
		LIST_ITEM: ListItemContainer,
		SELECT_DEPARTMENT: SelectDepartmentContainer
	},
	{
		mode: 'modal'
	}
);



const APP_STACK = createStackNavigator(
	{
		Home: {
			screen: HomeContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps) => ({
				headerTitle: '',
				headerShown: false,
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
			})
		},
		Product: {
			screen: ProductContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Product`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("ADD_PRODUCT")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}
			})

		},
		Order: {
			screen: OrderContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Order`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},

			})
		},
		Profile: {
			screen: ProfileContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Account`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},

			})
		},

		Category: {
			screen: CategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddCategory")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}


			})

		},
		AddCategory: {
			screen: AddCategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		SubCategory: {
			screen: SubCategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `${navigation.state.params ? navigation.state.params.title : ''}`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddSubCategory")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}


			})

		},
		AddSubCategory: {
			screen: AddSubCategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add SubCategory`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		EditCategory: {
			screen: EditCategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EditSubCategory:
		{
			screen: EditSubCategoryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		Banner: {
			screen: BannerContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Banner`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddBanner")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}


			})
		},
		AddBanner: {
			screen: AddBannerContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EditBanner: {
			screen: EditBannerContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Banner`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		//Promotion
		Promotion: {
			screen: PromotionContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Promotion`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddPromotion")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}


			})
		},
		AddPromotion: {
			screen: AddPromotionContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add Promotion`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EditPromotion: {
			screen: EditPromotionContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Promotion`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		//Poster
		Poster: {
			screen: PosterContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Poster`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddPoster")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}

			})
		},
		AddPoster: {
			screen: AddPosterContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EditPoster: {
			screen: EditPosterContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		//Location
		Location: {
			screen: LocationContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Branch Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate("AddLocation")} style={styles.chip}>
							<Icon name="add-box" size={28} color="#fff" />
						</TouchableOpacity>
					)
				}

			})
		},
		AddLocation: {
			screen: AddLocationContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Add Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EditLocation: {
			screen: EditLocationContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		SelectMap: {
			screen: SelectMapScreen,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Location`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		Noti: {
			screen: NotiContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Notification`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		/////product
		PRODUCT: ProductContainer,
		ADD_PRODUCT: {
			screen: AddProductContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Category`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})

		},
		AddProductColorDetail: AddProductColorDetailContainer,
		AddProductDetail: AddProductDetailContainer,
		Stock: {
			screen: StockContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Stock`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		SelectProduct:{
			screen:SelectProductContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Select Product`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		SelectProductDetail: {
			screen: SelectProductDetailContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Choose SubCategory`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		SelectUnitMeasurement: {
			screen: SelectUnitMeasurementContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Select UnitMeasurement`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		AddProductGallery: {
			screen:AddGalleryContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Add Gallery`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EDIT_PRODUCT: {
			screen: EditProductContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: false,
				headerTitle: `Edit Product`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		///FeedBack
		FeedBack: {
			screen: FeedBackContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `Feed Back`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},

		///RegisterUser
		RegisterUser: RegisterUserContainer,
		EDIT_USER: {
			screen: EditUserInformationContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: ``,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		EDIT_STORE: {
			screen: EditStoreInformationContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: ``,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		ORDER_DETAIL: {
			screen:OrderDetailContainer,
			navigationOptions: ({ navigation }: NavigationStackScreenProps, ) => ({
				headerTintColor: MODULE.WHITE,
				headerShown: true,
				headerTitle: `ORDER DETAIL`,
				headerBackTitle: 'Back',
				headerBackTitleStyle: {
					color: MODULE.WHITE
				},
				headerStyle: {
					backgroundColor: MODULE.PRIMARY,
				},


			})
		},
		ORDER_BY_STATUS: OrderByStatusContainer
	},
	{
		// headerMode: 'none'
	}
);

const MainApp = createSwitchNavigator({
	WELCOME: WelcomeContainer,
	AUTH: AUTH_STACK,
	STORE_STACK: STORE_STACK,
	HOME: APP_STACK
});

export default createAppContainer(MainApp);
const styles = StyleSheet.create({

	chip: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 25,
		alignItems: 'center',
		marginLeft: 12,
		..._styles.rows,
		borderWidth: 1,
		borderColor: modules.COLOR_MAIN
	},
	header: {
		justifyContent: 'space-between',
		backgroundColor: modules.WHITE,
		paddingBottom: 8
	},
	search: {
		flex: 1,
		padding: 8,
		backgroundColor: '#f7f9fa',
		borderRadius: 10
	},
});