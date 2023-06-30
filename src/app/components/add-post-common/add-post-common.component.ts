import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Common } from 'src/app/model/common';
import { HomeService } from 'src/app/services/home.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-post-common',
  templateUrl: './add-post-common.component.html',
  styleUrls: ['./add-post-common.component.css']
})
export class AddPostCommonComponent implements OnInit {
  myControl = new FormControl("");
  filteredBrands: Observable<{ id: number; brandName: string }[]>;
  cardsCount: any[] = new Array(12);
  currentImageIndex: any = 0;
  numericValue: number;
  brands: any = [];
  selectedImage: string;
  commonPayload: Common = new Common();
  subCategory: string = '';
  mainCategory: string = '';
  selectedFuelType: string;
  currentUploadImageIndex: number = 0;
  fuelTypes = [{ label :"Petrol",id :0},{ label: "Diesel",id:1}, {label : "LPG",id : 2},{label:"Electric",id : 3}];
  transmissionTypes = [{ label: 'Manual', id: 1 }, { label: 'Automatic', id: 2 }];
  numberOfOwners = [1, 2, 3, 4];
  selectedFuel: string;
  subCategoriesWithBrand = ['Cars', 'Bikes', 'Scooty','Bicycle', 'Mobiles','Tablets'];
  subCategoriesWithYear = ['Cars', 'Bikes', 'Scooty'];
  subCategoriesWithKms = ['Cars', 'Bikes', 'Scooty'];
  subCategoriesWithFuel = ['Cars', 'Bikes', 'Scooty'];
  subCategoriesWithTransmission = ['Cars'];
  subCategoriesWithOwners = ['Cars', 'Bikes', 'Scooty'];
  selectedTransmission: any;
  selectedOwnerNumber: Number;
  allUploadedFiles: any = [];
  brandId: any;
  progress : boolean = false;
  constructor(private homeService: HomeService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    for (var i = 0; i < this.cardsCount.length; i++) {
      this.cardsCount[i] = "";
    }
    this.route.queryParams.subscribe(params => {
      this.subCategory = params.sub;
      this.mainCategory = params.main;
      this.setCategoryId();
      switch (this.subCategory) {
        case "Mobiles": {
          this.getMobileBrands();
          break;
        }
        case "Cars": {
          this.getCarBrands();
          break;
        }
        case "Bikes": {
          this.getBikeBrands();
          break;
        }
        case "Tablets": {
          this.getTabletBrands();
          break;
        }
        case "Scooty": {
          this.getScootyBrands();
          break;
        }
        case "Bicycle": {
          this.getBicycleBrands();
          break;
        }
      }
    });
  }

  filterBrands(value: any): { id: number; brandName: string }[] {
    var filterValue;
    if (typeof value == 'object')
      filterValue = value.brandName.toLowerCase();
    else
      filterValue = value.toLowerCase();
    return this.brands.filter(
      (brand) => brand.brandName.toLowerCase().indexOf(filterValue) === 0
    );
  }
  allowOnlyNumbers(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const numericInput = inputValue.replace(/[^0-9.-]/g, '');
    inputElement.value = numericInput;
    this.numericValue = parseFloat(numericInput);
  }
  selectFile() {
    document.getElementById("fileUpload").click();
  }
  selectImage(event: any): void {
    var files = event.target.files;
    const formData = new FormData();
    this.progress = true;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    this.homeService.uploadImages(formData).subscribe((data: any) => {
      this.progress = false;
      let imagesLength = data.length;
      data.forEach(imageUrl => {
        this.cardsCount.some((image, index) => {
          if (image === "" && imagesLength !== 0) {
            this.cardsCount[index] = imageUrl;
            imagesLength = imagesLength - 1;
            return true;
          }
        });
      });

    })
  }
  deleteBackgroundImage(index: any): void {
    for (let i = index; i < this.cardsCount.length - 1; i++) {
      this.cardsCount[i] = this.cardsCount[i + 1];
    }
    this.cardsCount[this.cardsCount.length - 1] = '';
  }
  postAdd() {
    this.commonPayload.isPremium = true;
    this.commonPayload.isActive = true;
    this.commonPayload.createdBy = 1;
    this.commonPayload.createdOn = "2023-06-26T06:24:48.611";
    this.commonPayload.modifiedBy = 1;
    this.commonPayload.modifiedOn = "2023-06-26T06:24:48.611";
    this.commonPayload.price = Number(this.commonPayload.price);
    this.commonPayload.year = Number(this.commonPayload.year); 
    this.commonPayload.kmDriven = Number(this.commonPayload.kmDriven); 
    var payload = this.addSpecificPayload(this.commonPayload);
    console.log(payload);
    switch(this.mainCategory){
      case "Gadgets" : {
        this.saveGadgetPost(payload);
        break;
      }
      case "Vehicles" : {
        this.saveVehiclePost(payload);
        break;
      }
    }
  }
  getAddress(pincode: any) {
    if (pincode.length == 6) {
      this.homeService.getAddress(pincode).subscribe(data => {
        var address = data[0].PostOffice[1];
        this.commonPayload.state = address.State;
        this.commonPayload.city = address.District;
        this.commonPayload.nearBy = address.Name;
      })
    }
  }
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 100000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top' 
    });
  }
  selectButton(fuel: any) {
    this.selectedFuel = fuel.label;
    this.commonPayload.fuelType = fuel.id;
  }
  selectTransmission(transmission: any) {
    this.selectedTransmission = transmission.label;
    this.commonPayload.transmissionType = transmission.id;
  }
  selectOwnerNumber(ownerNumber: Number) {
    this.selectedOwnerNumber = ownerNumber;
    this.commonPayload.noOfOwner = ownerNumber;
  }
  getMobileBrands() {
    this.homeService.getMobileBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    });
  }
  getCarBrands() {
    this.homeService.getCarBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    });
  }
  getBikeBrands() {
    this.homeService.getBikeBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    });
  }
  getFilteredBrands() {
    this.filteredBrands = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterBrands(value || ""))
    );
  }
  setSubCategory() {
    this.homeService.getSubCategoryByCategoryId(this.commonPayload.categoryId).subscribe((data: any) => {
      for (let subCategory of data) {
        if (subCategory.subCategoryName == this.subCategory) {
          this.commonPayload.subCategoryId = subCategory.id;
          break;
        }
      }
    });
  }
  setCategoryId() {
    this.homeService.getAllCategory().subscribe((data: any) => {
      for (let mainCategory of data) {
        if (mainCategory.categoryName == this.mainCategory) {
          this.commonPayload.categoryId = mainCategory.id;
          this.setSubCategory()
          break;
        }
      }
    });
  }
  addSpecificPayload(commonPayload): any {
    var gadgetImageList = [];
    var imageList = '';
    var brandId = '';
    switch (this.mainCategory) {
      case "Vehicles": {
        imageList = 'vehicleImageList';
        brandId = 'vehicelBrandId';
        break;
      }
      case "Gadgets": {
        imageList = 'gadgetImageList';
        brandId = 'mobileBrandId';
        break;
      }
    }
    this.cardsCount.forEach(imageURL => {
      if (imageURL != "")
        gadgetImageList.push({ "gadgetsId": 0, "imageId": "100", "imageURL": imageURL });
    });
    var payload = Object.assign({}, commonPayload, {
      [imageList]: gadgetImageList,
      [brandId]: this.brandId
    });
    return payload;
  }
  handleBrand(data) {
    this.brandId = data.id;
  }
  displayBrand(brand: any): string {
    return brand.brandName || "";
  }
  getTabletBrands() {
    this.homeService.getTabletBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    })
  }
  getScootyBrands() {
    this.homeService.getScootyBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    })
  }
  getBicycleBrands() {
    this.homeService.getBicycleBrands().subscribe(data => {
      this.brands = data;
      this.getFilteredBrands();
    })
  }
  saveGadgetPost(payload){
    this.homeService.saveGadgetPost(payload).subscribe(data => {
      this.showNotification("Post added succesfully");
      console.log(data);
    });
  }
  saveVehiclePost(payload){
    this.homeService.saveVehiclePost(payload).subscribe(data => {
      this.showNotification("Post added succesfully");
      console.log(data);
    });
  }
}
