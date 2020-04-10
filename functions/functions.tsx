import DeviceInfo from 'react-native-device-info';
import vCard from 'react-native-vcards';
import { Alert } from 'react-native';

export function isTypeX() {
	const model = DeviceInfo.getModel().includes('x') ? true : false;
	return model;
}

export function qrVcard(name: string, store: string, phone: string, email: any, Address: any) {
	const contact = vCard();
	//set properties
	contact.firstName = store;
	contact.organization = 'HoutChea';
	contact.workPhone = phone;
	contact.homeAddress = Address;
	contact.email = email;
	//get as formatted string
	return contact.getFormattedString();
}

// export function resizeImage(image:any){
//   console.log('OLD:',image)
//   ImageResizer.createResizedImage(image.uri, 100, 100, 'JPEG', 20)
//   .then((response) => {
//     var newImage = {
//       ...image,
//       response
//     }
//   console.log('NEWIMAGE:',newImage)
//     return(newImage)
//   })
//   .catch(err => {
//     console.log(err);
//     return Alert.alert('Unable to change the photo', 'Please choose another photo.');
//   });
// }
