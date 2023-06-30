import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  mainCategories: any = [];
  subCategories: any = [];
  selectedCategory : any ;
  constructor(private homeService : HomeService) { }

  ngOnInit() {
    this.getAllCategory();
  }
  showSubCategories(mainCategory:any){
    this.selectedCategory = mainCategory.categoryName;
    this.homeService.getSubCategoryByCategoryId(mainCategory.id).subscribe(data=>{
      this.subCategories = data;
    });
  }
  getAllCategory(){
    this.homeService.getAllCategory().subscribe(data=>{
      this.mainCategories = data;
    });
  }
}
