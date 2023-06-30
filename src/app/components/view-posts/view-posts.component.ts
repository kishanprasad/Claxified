import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit,OnDestroy {

  category : string;
  subCategoryId : Number;
  isLoading : boolean = true;
  cards : any = [];
  subscription: any;
  actualCards: any;
  constructor(private route: ActivatedRoute,private homeService : HomeService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      this.category = params.type;
      this.subCategoryId = Number(params.sub);
      this.getPosts();
      });
    this.subscription = this.homeService.getData().subscribe(data => {
      this.isLoading = true;
      setTimeout(()=>this.filterPosts(data),500);
      });
  }
  getPosts(){
    this.cards = [];
    this.homeService.getPost(this.category,1,30).subscribe((data:any)=>{
     // this.cards = data;
      this.actualCards = data;
      this.cards = this.actualCards.filter(card=>card.subCategoryId == this.subCategoryId);
      this.isLoading = false;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  filterPosts(data :any){
    const filterObj: { [key: string]: { operator: string; value: any } } = {};
    Object.keys(data).forEach(key => {
      if (data[key] != null && data[key] != "") {
        if(key == 'price' || key =='kmDriven')
        filterObj[key]={operator : '<=',value : data[key]};
        else if(key == 'state' || key == 'subCategoryId' || key=='city' || key=='nearBy')
        filterObj[key]={operator : '==',value : data[key]};
        else if(key == 'year')
        filterObj[key]={operator : 'between',value : data[key]};
        else
        filterObj[key]={operator : 'includes',value : data[key]};
      }
    });
    const filteredData = this.actualCards.filter(item =>
      Object.entries(filterObj).every(([field, condition]) => {
        const { operator, value } = condition;
        const itemValue = item[field];
    
        if (Array.isArray(itemValue) && operator === 'includes') {
          return itemValue.some(v => value.includes(v));
        } else {
          switch (operator) {
            case '==':
              return item[field] === value;
            case '<=':
              return item[field] <= value;
            case 'includes':
              return value.includes(itemValue);
            case 'between' :
              return value[0]<=itemValue && value[1]>=itemValue;
            default:
              return true;
          }
        }
      })
    );
    this.cards = [];
    this.cards = filteredData;
    this.isLoading = false;
    this.cdr.detectChanges();
  }
}
