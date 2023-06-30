import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private dataSubject = new Subject<any>();
  private postDetailsSubject = new BehaviorSubject<any>(null);
  
  constructor(private httpClient : HttpClient,) { }
  private BaseURL = environment.baseUrl;

  public getAllItems(){
    //return this.httpClient.get(`${this.BaseURL}Dashboard/GetAll?pageIndex=0&pageSize=20`);
    return this.httpClient.get(`${this.BaseURL}Dashboard/GetAll?pageIndex=1&pageSize=30`);
  }
  public uploadImages(formData : any){
    return this.httpClient.post(`${this.BaseURL}Gadget/UploadImages`,formData);
  }
  saveGadgetPost(payLoad){
    return this.httpClient.post(`${this.BaseURL}Gadget`,payLoad);
  }
  getAddress(pinCode){
    return this.httpClient.get('https://api.postalpincode.in/pincode/'+pinCode);
  }
  getPost(category: string, index: number, size: number) {
    return this.httpClient.get(`${this.BaseURL}${category}/GetAll`);
  }
  getCountry(){
    return this.httpClient.get(`${this.BaseURL}Common/GetCountry`);
  }
  getStatesByCountry(countryId:Number){
    return this.httpClient.get(`${this.BaseURL}Common/GetAllState?countryId=`+countryId);
  }
  getCitiesByState(stateId:Number){
    return this.httpClient.get(`${this.BaseURL}Common/GetAllCity?stateId=`+stateId);
  }
  getNearPlacesByCity(cityId:Number){
    return this.httpClient.get(`${this.BaseURL}Common/GetAllNearBy?cityId=`+cityId);
  }
  getAllCategory(){
    return this.httpClient.get(`${this.BaseURL}Common/GetAllCategory`);
  }
  getSubCategoryByCategoryId(categoryId:Number){
    return this.httpClient.get(`${this.BaseURL}Common/GetSubCategory?categoryId=`+categoryId);
  }
  getMobileBrands(){
    return this.httpClient.get(`${this.BaseURL}Gadget/GetAllMobileBrand`);
  }
  getCarBrands(){
    return this.httpClient.get(`${this.BaseURL}Vehicle/GetCarBrand`);
  }
  getBikeBrands(){
    return this.httpClient.get(`${this.BaseURL}Vehicle/GetBikeBrand`);
  }
  getTabletBrands(){
    return this.httpClient.get(`${this.BaseURL}Gadget/GetAllTabletBrand`);
  }
  getScootyBrands(){
    return this.httpClient.get(`${this.BaseURL}Vehicle/GetScootyBrand`);
  }
  getBicycleBrands(){
    return this.httpClient.get(`${this.BaseURL}Vehicle/GetBicycleBrand`);
  }
  saveVehiclePost(payLoad){
    return this.httpClient.post(`${this.BaseURL}Vehicle`,payLoad);
  }
  getGadgetPostByGuid(guid : any){
    return this.httpClient.get(`${this.BaseURL}Gadget/GetGadgetByGuid?tabRefGuid=`+guid)
  }
  getVehiclePostById(id : any){
    return this.httpClient.get(`${this.BaseURL}Vehicle/GetVehicleByTabRefGuid?tabRefGuid=`+id);
  }
  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
  setPostDetails(data : any){
    this.postDetailsSubject.next(data);
  }
  getPostDetails(){
    return this.postDetailsSubject.asObservable();
  }
}
