export interface IProduct {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	created_date_key: number;
	updated_by?: any;
	updated_date?: Date;
	deleted_by?: any;
	deleted_date?: Date;

	status: any;
	name: string;
	description: string;
	storeRef: any;
	price: number;
	compareToPrice?: number;
	cost: number;
	storeOwner: string;

	publicationDate?: Date;
	categoryRef: any;
	categoryKey: any;

	subCategoryRef: any;
	subCategoryKey: any;

	color?: Array<any>;
	finish?: Array<any>;
	material?: Array<any>;
	style?: Array<any>;
	size?: Array<any>;
	approvalBy?: any;
	approvalDate?: any;
	approvedDateKey?: number;
	isApproved: boolean;
	gallery: Array<any>;
	code: string;
	cover?: string;
	trending: any;
}
