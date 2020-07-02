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
	freeDelivery: boolean;
	deliveryNote: string;
	isDiscount: boolean;
	discount: number;
	isPromotion: boolean;
	promotion: number;
	promotion_expiry_date: Date;
	promotion_expiry_date_key: number;
	status: any;
	name: string;
	description: string;
	umPrice: any;
	unitMeasurement: any
	varaint: any;
	totalQty: number;
	basePrice: number;
	publicationDate?: Date;
	market: any
	categoryRef: any;
	category: any;
	subCategoryRef: any;
	subCategory: any;

	gallery: Array<any>;
	code: string;
	cover?: string;
	trending: any;


}
