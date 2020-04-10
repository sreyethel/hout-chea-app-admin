export interface IBanner {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	created_date_key: number;
	updated_by?: any;
	updated_date?: Date;
	deleted_by?: any;
	deleted_date?: Date;

	name?: string;
	description?: string;
	fileUrl: string;
	index: number;
	status: any;
}

export interface IStoreLocation {
	key: string;
	page_key: number;
	created_by: any;
	created_date: Date;
	created_date_key: number;
	updated_by?: any;
	updated_date?: Date;
	deleted_by?: any;
	deleted_date?: Date;

	name?: string;
	address?: string;
	fileUrl?: string;
	index?: number;
	status: any;
	location: any;
}
