import AuthStore from '../app/store/auth.store';
import Store from '../app/store/store.store';
import Product from '../app/store/product.store';
import GeoData from '../app/store/geo.store';
import OrderStore from '../app/store/order.store';
import versionStore from '../app/store/version.store';
import CategoryStor from '../app/store/category.store';
import AdsStore from '../app/store/ads.store';
import LocationStore from '../app/store/location.store';
import FeedBackStore from '../app/store/feedback.store';

export default function() {
	return {
		auth: new AuthStore(),
		store: new Store(),
		product: new Product(),
		geo: new GeoData(),
		order: new OrderStore(),
		version: new versionStore(),
		category: new CategoryStor(),
		ads: new AdsStore(),
		location:new LocationStore(),
		feedback:new FeedBackStore()
	};
}
