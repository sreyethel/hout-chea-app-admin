export interface ICategory {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	created_date_key: number;
	updated_by?: any;
	updated_date?: Date;
	deleted_by?: any;
	deleted_date?: Date;

	name: string;
	status: any;
	description: any;
	fileUrl: any;
}

export interface ISubCategory {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	created_date_key: number;
	updated_by?: any;
	updated_date?: Date;
	deleted_by?: any;
	deleted_date?: Date;

	name: string;
	status: any;
	description: any;
	fileUrl: any;
	category: any;
	categoryKey: string;
}
