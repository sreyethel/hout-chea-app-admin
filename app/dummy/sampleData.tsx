
import modules from '../modules';

export interface SimpleAddProductProps {
	img: any;
	category: string;
	title: string;
	subTitle: string;
	price: string;
	status: string;
	discount: number;
}

export const SampleAddProduct: Array<SimpleAddProductProps> = [
	{
		img: modules.PSHOES,
		category: 'Shoes Women',
		title: 'Converse Skateboarding-Shoes Sneaksers Canvas Classic High-Top Outdoor Sports All-Star',
		subTitle:
			'Borrowing a little design inspiration from the etnies Fader, the kingpin is a classic puffy tongue skateboard shoe Rip it up like skater royalty in the Kingpin shoe from etnies. The sturdy upper is perforated for breathability and offers adjustable lacing, while heavy-duty padding on the collar and tongue adds the stability you need to land your most difficult tricks. The herringbone-treaded outsole offers superior grip, whether you need it for the ramps or the street.',
		price: '33.29',
		status: 'review',
		discount: 10
	},
	{
		img: modules.PWATCH,
		category: 'Watch Men',
		title:
			'VENCERO 2019 Fashion Quartz Watch Men Watches Top Brand Luxury Male Clock Business Mens Wrist Watch Hodinky Relogio Masculino',
		subTitle:
			'We craft luxury watches for the modern man, but we are so much more than watchmakers. At the core of Vincero is an innovative belief that you deserve the best so that you look and feel unstoppable. Because when you look good, you feel good, and when you feel good, you can do anything.',
		price: '523,59',
		status: 'review',
		discount: 5
	},
	{
		img: modules.PBAG,
		category: 'Backpack',
		title:
			'School Bags Backpack Kids Orthopedic Men Backpacks Children Schoolbags For Boys Girls School Backpack Mal',
		subTitle:
			'At Mancro, innovation and providing a great shopping experience is the main concept of us. We are committed to providing our consumers with high quality and cost-effective products, which aims to make the consumers really feel the charm of the product itself. Believe us! Choose Mancro product, you will not regret!',
		price: '10.89',
		status: 'reject',
		discount: 67
	},
	{
		img: modules.PLUGGAGE,
		category: 'Luggage',
		title: 'Luggage bag with handbag Rolling Suitcase set',
		subTitle: `The 20-inch and 24-inch spinner luggage both provide a durable zipper for reliable closure, and the expandable design creates up to 15% more packing space for extra room when you need it (and less when you don't)`,
		price: '127.49',
		status: 'reject',
		discount: 10
	},
	{
		img: modules.PRING,
		category: 'Jewelry & Accessories',
		title:
			'New Trendy Crystal Engagement Claws Design Hot Sale Rings For Women AAA White Zircon Cubic elegant rings Female Wedding jewerly',
		subTitle: '',
		price: '695.99',
		status: 'review',
		discount: 1
	},
	{
		img: modules.PCAMERA,
		category: 'DSLR Cameras',
		title: 'Canon EOS R Mirrorless Digital Camera',
		subTitle: `Meet Canon's new addition to the EOS System, the EOS R camera. The foundation of this system is an entirely new lens mount, designed for optical excellence today and incredible optical potential for the future. Get ready to capture a variety of subjects in many different environments. Versatility is key with the EOS R; a 30.3 Megapixel Full-frame CMOS sensor and the DIGIC 8 Image Processor deliver stellar low-light performance, even in dark situations. Focus can be attained with incredible speed and accuracy thanks to Canon's proprietary Dual Pixel CMOS AF system and a maximum of 5,655 manually selectable AF points**. This system also captures smooth 4K video that's easy to share and can be enhanced in post-production thanks to the included Canon Log. The built-in, high-precision EVF and a Vari-angle Touchscreen LCD make it easy to adapt to different shooting situations. `,
		price: '1,269.99',
		status: 'review',
		discount: 0
	},
	{
		img: modules.PTSHIRT,
		category: 'Men T-Shirt',
		title: 'T Shirt Men Solid Color T-shirt Simple style Male Casual Tshirt short sleeve O neck Plus size',
		subTitle: `Gildan crew t-shirts are the ultimate in comfort. Cool Spire moisture wicking keep you cool and dry while the soft touch yarn and tag-free neck feels great all day long. These tees are built to last with durable tubular collar design and covered shoulder seams. The Gildan t-shirt will soon be your favorite...if it isn't already.`,
		price: '4.49',
		status: 'reject',
		discount: 12
	}
];


export const dColor = [
	{ hax: '#FFABDC' },
	{ hax: '#FFbBDC' },
	{ hax: '#FFcBDC' },
	{ hax: '#FFAdDC' },
	{ hax: '#FFAfDC' },
	{ hax: '#FFABDC' },
	{ hax: '#FFbBDC' },
	{ hax: '#FFcBDC' },
	{ hax: '#FFAdDC' },
	{ hax: '#FFAfDC' },
	{ hax: '#FFABDC' },
	{ hax: '#FFbBDC' },
	{ hax: '#FFcBDC' },
	{ hax: '#FFAdDC' },
	{ hax: '#FFAfDC' },
]

export const dCategory = [
	{ price: '12.25', name: 'women shoes', note: null, fileUrl: 'https://ae01.alicdn.com/kf/HTB1JRsleRLN8KJjSZFpq6zZaVXao/Ladies-Comfortable-Fashion-Platform-Shoes-Casual-Women-Shoes-Solid-Short-Knight-Boots-Ladies-Wedges-Female-Flat.jpg' },
	{ price: '12.25', name: 'women shoes', note: null, fileUrl: 'https://ae01.alicdn.com/kf/HTB1JRsleRLN8KJjSZFpq6zZaVXao/Ladies-Comfortable-Fashion-Platform-Shoes-Casual-Women-Shoes-Solid-Short-Knight-Boots-Ladies-Wedges-Female-Flat.jpg' },
	{ price: '12.25', name: 'women shoes', note: null, fileUrl: 'https://ae01.alicdn.com/kf/HTB1JRsleRLN8KJjSZFpq6zZaVXao/Ladies-Comfortable-Fashion-Platform-Shoes-Casual-Women-Shoes-Solid-Short-Knight-Boots-Ladies-Wedges-Female-Flat.jpg' },
	{ price: '12.25', name: 'women shoes', note: null, fileUrl: 'https://ae01.alicdn.com/kf/HTB1JRsleRLN8KJjSZFpq6zZaVXao/Ladies-Comfortable-Fashion-Platform-Shoes-Casual-Women-Shoes-Solid-Short-Knight-Boots-Ladies-Wedges-Female-Flat.jpg' },
	{ price: '12.25', name: 'women shoes', note: null, fileUrl: 'https://ae01.alicdn.com/kf/HTB1JRsleRLN8KJjSZFpq6zZaVXao/Ladies-Comfortable-Fashion-Platform-Shoes-Casual-Women-Shoes-Solid-Short-Knight-Boots-Ladies-Wedges-Female-Flat.jpg' },
]