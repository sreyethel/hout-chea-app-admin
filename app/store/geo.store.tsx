import { observable, action } from 'mobx';
import {  provinceRef, districtRef, communeRef, villageRef } from '../services/data.service';
import { pushToObject, pushToArray } from '../services/mapping.service';

export default class GeoData {
	
	@observable loading: boolean = false;
	@observable provinces: any = [];
	@observable district: any = [];
	@observable commune: any = [];
	@observable village: any = [];
	
	@observable selectedProvince:any=null;
	@observable selectedDistrict:any=null;
	@observable selectedCommune:any=null;
	@observable selectedVillage:any=null;
	@observable process:boolean=false;
	
	@action
	async fetchData() {
		this.loading = true;
		const docs=await provinceRef().orderBy("id").get();
		this.provinces=pushToArray(docs);
		this.loading=false;
		return this.provinces;
	}

	@action
	async fetchChangeProvince(province:any,clear:boolean) {
		this.process = true;
		this.selectedProvince=province;
		if(clear){
			this.selectedDistrict=null;
			this.selectedCommune=null;
			this.selectedVillage=null;
		}
		const districtDocs=await districtRef().where("province.key","==",this.selectedProvince.key).get();
		this.district=pushToArray(districtDocs);
		this.process=false;
		return this.district;
	}
	
	@action
	async fetchChangeDistrict(district:any,clear:boolean) {
		this.process = true;
		this.selectedDistrict=district;
		if(clear){
			this.selectedCommune=null;
			this.selectedVillage=null;
		}
		const communeDocs=await communeRef().where("district.key","==",this.selectedDistrict.key).get();
		this.commune=pushToArray(communeDocs);
		this.process=false;
		return this.commune
	}
	
	@action
	async fetchChangeCommune(commune:any,clear:boolean) {
		this.process = true;
		this.selectedCommune=commune;
		if(clear){
			this.selectedVillage=null;
		}
		const villageDocs=await villageRef().where("commune.key","==",this.selectedCommune.key).get();
		this.village=pushToArray(villageDocs);
		this.process=false;
		return this.village;
	}
	

	@action
	clearGeo(){
		this.selectedProvince=null;
		this.selectedDistrict=null;
		this.selectedCommune=null;
		this.selectedVillage=null;
	}
	
}
