export const InvoiceStatus = [
	{ key: 0, status: 'Pending' },
	{ key: 1, status: 'Completed' },
	{ key: 2, status: 'Return' }
];

export const RegisterStatus = [
	{ key: 0, status: 'created account' },
	{ key: 1, status: 'added user info' },
	{ key: 2, status: 'added shop info' }
];

export const TitleObject = [ { label: 'Mr', value: 'Mr' }, { label: 'Ms', value: 'Ms' } ];

export const StatusObj = {
	active: { key: 1, text: 'Active' }
};

export const currencyObj = {
	key: 'usd',
	symbol: '$',
	text: 'USD'
};

export const storeTypeList = [
	{
		key: 1,
		name: 'Physical',
		icon: 'store'
	},
	{
		key: 2,
		name: 'Online',
		icon: 'globe'
	}
];

export const orderStatus = [
	{
		key: 1,
		name: 'pending'
	},
	{
		key: 2,
		name: 'confirm'
	},
	{
		key: 3,
		name: 'complete'
	},
	{
		key: 4,
		name: 'return'
	},
	{
		key: 5,
		name: 'cancel'
	}
];
