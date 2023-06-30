import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterModel } from 'src/app/model/filterModel';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-gadget-filters',
  templateUrl: './gadget-filters.component.html',
  styleUrls: ['./gadget-filters.component.css']
})
export class GadgetFiltersComponent implements OnInit {

  priceRange: number = 0;
  selectedDistrict: any = null;
  selectedCity: string = null;
  selectedNearBy: string = null;
  country: any;
  districts: any = [];
  cities: any = [];
  nearByPlaces: any = [];
  selectedBrand: string = '';
  price = 0;
  kms = 0;
  brands: any = [];
  subCategory :any ;
  mainCategory :string;
  filterObj  = new FilterModel();
  fuelTypes = [{ label :"Petrol",id :0},{ label: "Diesel",id:1}, {label : "LPG",id : 2},{label:"Electric",id : 3}];
  transmissionTypes = [{ label: 'Manual', id: 1 }, { label: 'Automatic', id: 2 }];
  numberOfOwners = [1, 2, 3, 4];
  fromYear : any;
  toYear : any;
  constructor(private homeService: HomeService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.homeService.getCountry().subscribe(data => {
      this.country = data[0];
      this.getAllStates();
    });
    this.route.queryParams.subscribe(params => {
      this.subCategory = params.sub;
      this.mainCategory = params.type;
      this.filterObj.subCategoryId = Number(params.sub);
      switch (this.subCategory) {
        case "1": {
          this.getMobileBrands();
          break;
        }
        case "4": {
          this.getCarBrands();
          break;
        }
        case "5": {
          this.getBikeBrands();
          break;
        }
        case "2": {
          this.getTabletBrands();
          break;
        }
      }
    });
  }
  getAllStates() {
    this.homeService.getStatesByCountry(this.country.id).subscribe(data => {
      console.log(data);
      this.districts = data;
    });
  }
  onDistrictChange(event) {
    this.filterObj.state = event.value.name;
    this.homeService.setData(this.filterObj);
    this.getCities(event.value.id);
  }
  getCities(stateId: Number) {
    this.homeService.getCitiesByState(stateId).subscribe(data => {
      this.cities = data;
    });
  }
  onCityChange(event) {
    this.filterObj.city = (event.value == null) ? null : event.value.name;
    this.homeService.setData(this.filterObj);
    this.homeService.getNearPlacesByCity(event.value.id).subscribe(data => {
      this.nearByPlaces = data;
    })
  }
  onNearByChange(event){
    this.filterObj.nearBy = (event.value == null) ? null : event.value.name;
    this.homeService.setData(this.filterObj);
  }
  priceChange() {
    this.filterObj.price =  this.price;
    this.homeService.setData(this.filterObj);
  }
  getMobileBrands() {
    this.homeService.getMobileBrands().subscribe(data => {
      this.brands = data;
    });
  }
  getCarBrands() {
    this.homeService.getCarBrands().subscribe(data => {
      this.brands = data;
    });
  }
  getBikeBrands() {
    this.homeService.getBikeBrands().subscribe(data => {
      this.brands = data;
    });
  }
  onBrandSelect(event){
    let brandIds = [];
    for(let value of event.value){
      brandIds.push(value.id);
    }
    if(this.mainCategory == 'Gadget')
      this.filterObj.mobileBrandId = brandIds;
    else
      this.filterObj.vehicelBrandId = brandIds;
    this.homeService.setData(this.filterObj);
  }
  getTabletBrands(){
    this.homeService.getTabletBrands().subscribe(data => {
      this.brands = data;
    });
  }
  kmsChange(event) {
    this.filterObj.kmDriven =  this.kms;
    this.homeService.setData(this.filterObj);
  }
  onFuelSelect(event){
    let fuelIds = [];
    for(let value of event.value){
      fuelIds.push(value);
    }
    this.filterObj.fuelType = fuelIds;
    this.homeService.setData(this.filterObj);
  }
  onTransmissionSelect(event){
    let transmissionIds = [];
    for(let value of event.value){
      transmissionIds.push(value);
    }
    this.filterObj.transmissionType = transmissionIds;
    this.homeService.setData(this.filterObj);
  }
  yearChange(event){
    var year = [];
    year.push(Number(this.fromYear));
    year.push(Number(this.toYear));
    this.filterObj.year = year;
    this.homeService.setData(this.filterObj);
  }
}
