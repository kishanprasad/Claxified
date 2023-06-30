import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private homeservice: HomeService) { }

    cards: any = [];
    currentDate: Date = new Date();
    isLoading : Boolean = true;
    ngOnInit(): void {
        this.homeservice.getAllItems().subscribe(data => {
            this.cards = data;
            this.isLoading = false;
        })
    }
}