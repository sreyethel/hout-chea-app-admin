import { action, observable } from 'mobx';
import { feedBackRef } from '../services/data.service';
import { pushToArray } from '../services/mapping.service';

export default class FeedBackStore {
	@observable loading: boolean = false;

	@observable dataFeedBack: Array<any> = [];

	@action
	fetchFeedBack() {
		this.loading = true;
		feedBackRef().orderBy('page_key', 'desc').onSnapshot((item) => {
			this.dataFeedBack = pushToArray(item);
			this.loading = false;
		});
	}
}
