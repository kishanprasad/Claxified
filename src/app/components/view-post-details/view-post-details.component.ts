import { Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.css']
})
export class ViewPostDetailsComponent implements OnInit {

  postDetails : any;
  post : any;
  imagesList : any = [];
  isLoading : boolean= true;
  currentDate: Date = new Date();
  imageIndex : number = 0;
  fuelTypes = [{ label :"Petrol",id :0},{ label: "Diesel",id:1}, {label : "LPG",id : 2},{label:"Electric",id : 3}];
  transmissionTypes = [{ label: 'Manual', id: 1 }, { label: 'Automatic', id: 2 }];
  fuelType : any;
  transmissionType : any;
  mainCategoryName : string;
  constructor(private homeService : HomeService) { }

  ngOnInit() {
    this.post = JSON.parse(sessionStorage.getItem("post-details"));
    this.getMainCategories(this.post);
  }
  getMainCategories(postData:any){
    this.homeService.getAllCategory().subscribe((data:any)=>{
      for(let category of data){
        if(category.id == postData.categoryId){
          switch(category.categoryName){
            case "Gadgets" : {
             this.getGadgetPost(this.post.tableRefGuid);
              break;
            }
            case "Vehicles" : {
              this.getVehiclePost(this.post.tableRefGuid);
              break;
            }
          }
          break;
        }
      }
    });
  }
  getGadgetPost(guid:any){
    this.homeService.getGadgetPostByGuid(guid).subscribe((data:any)=>{
      this.postDetails = data[0];
      this.mainCategoryName = 'Gadgets';
      console.log(data);
      this.isLoading = false;
      this.imagesList = this.postDetails.gadgetImageList;
      console.log(this.imagesList);
    });
  }
  getVehiclePost(guid:any){
    this.homeService.getVehiclePostById(guid).subscribe((data:any)=>{
      console.log(data);
      this.postDetails = data[0];
      this.mainCategoryName = 'Vehicles';
      this.imagesList = this.postDetails.vehicleImageList;
      this.fuelType = this.fuelTypes.filter(fuel=>fuel.id == this.postDetails.fuelType);
      this.transmissionType = this.transmissionTypes.filter(transmission=>transmission.id == this.postDetails.transmissionType);
      this.isLoading = false;
      console.log(this.imagesList);
    });
  }
  formatDate(date: any): any {
    const inputDate: Date = new Date(date); 
    const daysAgo = moment(this.currentDate).diff(inputDate, 'days');

    if (daysAgo >= 0 && daysAgo <= 7) {
        if (daysAgo === 0) {
            return 'Today';
        } else if (daysAgo === 1) {
            return 'Yesterday';
        } else {
            return daysAgo + ' days ago';
        }
    } else {
        return moment(inputDate).format('MMM DD');
    }
  }
  showPrevious(){
    this.imageIndex = this.imageIndex - 1;
  }
  showNext(){
    this.imageIndex = this.imageIndex + 1;
  }
}
