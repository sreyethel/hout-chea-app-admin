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
import { createStackNavigator } from 'react-navigation-stack';
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
		headerMode: 'none',
		mode: 'modal'
	}
);

const STORE_STACK = createStackNavigator(
	{
		STORE: RegisterAddressContainer,
		LIST_ITEM: ListItemContainer,
		SELECT_DEPARTMENT: SelectDepartmentContainer
	},
	{
		headerMode: 'none',
		mode: 'modal'
	}
);

// const APP = createBottomTabNavigator(
// 	{
// 		Home: HomeContainer,
// 		Product: ProductContainer,
// 		Order: OrderContainer,
// 		Profile: ProfileContainer
// 	},
// 	{
// 		lazy: true,
// 		defaultNavigationOptions: ({ navigation }) => ({
// 			tabBarIcon: ({ focused, horizontal, tintColor }) => {
// 				const { routeName } = navigation.state;
// 				let iconName;
// 				if (routeName === 'Home') {
// 					iconName = `store-alt`;
// 				} else if (routeName === 'Product') {
// 					iconName = `boxes`;
// 				} else if (routeName === 'Order') {
// 					iconName = `cart-plus`;
// 				} else if (routeName === 'Delivery') {
// 					iconName = `truck`;
// 				} else if (routeName === 'Profile') {
// 					iconName = `user-alt`;
// 				}
// 				return <Icon name={`${iconName}`} size={21} color={`${tintColor}`} />;
// 			}
// 		}),
// 		tabBarOptions: {
// 			showLabel: true,
// 			activeTintColor: MODULE.COLOR_MAIN,
// 			inactiveTintColor: '#a1a1a1',
// 			style: {
// 				paddingTop: 8,
// 				borderTopWidth: 1,
// 				borderTopColor: MODULE.BORDER_COLOR
// 			},
// 			labelStyle: {
// 				fontSize: 10
// 			}
// 		}
// 	}
// );

const APP_STACK = createStackNavigator(
	{
		// APP_HOME: APP,
		Home: HomeContainer,
		Product: ProductContainer,
		Order: OrderContainer,
		Profile: ProfileContainer,

		////Category
		Category: CategoryContainer,
		AddCategory: AddCategoryContainer,
		SubCategory: SubCategoryContainer,
		AddSubCategory: AddSubCategoryContainer,
		EditCategory: EditCategoryContainer,
		EditSubCategory: EditSubCategoryContainer,

		//Banner
		Banner: BannerContainer,
		AddBanner: AddBannerContainer,
		EditBanner: EditBannerContainer,

		//Promotion
		Promotion: PromotionContainer,
		AddPromotion: AddPromotionContainer,
		EditPromotion: EditPromotionContainer,

		//Poster
		Poster: PosterContainer,
		AddPoster: AddPosterContainer,
		EditPoster: EditPosterContainer,

		//Location
		Location: LocationContainer,
		AddLocation: AddLocationContainer,
		EditLocation: EditLocationContainer,
		SelectMap: SelectMapScreen,

		/////product
		PRODUCT: ProductContainer,
		ADD_PRODUCT: AddProductContainer,
		AddProductColorDetail: AddProductColorDetailContainer,
		AddProductDetail: AddProductDetailContainer,
		SelectProductDetail: SelectProductDetailContainer,
		AddProductGallery: AddGalleryContainer,
		EDIT_PRODUCT: EditProductContainer,

		///FeedBack
		FeedBack: FeedBackContainer,

		///RegisterUser
		RegisterUser: RegisterUserContainer,

		//////
		EDIT_USER: EditUserInformationContainer,
		EDIT_STORE: EditStoreInformationContainer,
		ORDER_DETAIL: OrderDetailContainer,
		ORDER_BY_STATUS: OrderByStatusContainer
	},
	{
		headerMode: 'none'
	}
);

const MainApp = createSwitchNavigator({
	WELCOME: WelcomeContainer,
	AUTH: AUTH_STACK,
	STORE_STACK: STORE_STACK,
	HOME: APP_STACK
});

export default createAppContainer(MainApp);
