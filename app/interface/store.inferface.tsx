export interface IStore {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	updated_by: any;
	updated_date: Date;
	status: any;
	name: string;
	lookup: string;
	like: number;
	follow: any;
	map: any;
	description: any;
	keywordSearchTag: any;
	avatar: any;
	phone: any;
	phoneNumber: any;
	email: any;
	facebook: any;
	website: any;
	province: any;
	district: any;
	commune: any;
	village: any;
	street: any;
	homeNo: any;
	department: Array<any>;
	departmentTag: Array<any>;
	categories: Array<any>;
	categoryTag: Array<any>;
	shoppingCategory: Array<any>;
	shoppingCategoryTag: Array<any>;
	brand: Array<any>;
	brandTag: Array<any>;
	coverUrl: any;
	country: any;
	targetSale: number;
	currency: any;
	storeOwner: any;
	storeDepartmentTag: Array<any>;
	storeDepartment: Array<any>;
	storeType: any;
}
