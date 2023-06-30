import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HomeService } from 'src/app/services/home.service';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

    @Input() isLoading: Boolean;
    @Input() cards: any;
    currentDate: Date = new Date();

    // Pagination properties
    pageSize = 20;
    currentPage = 0;
    totalPages = 0;
    paginatedCards: any[] = [];

    constructor(private router: Router,private homeService : HomeService) { }

    ngOnInit() {
        this.paginatedCards = this.cards;
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
    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex;
        this.calculatePagination();
    }
    calculatePagination() {
        this.totalPages = Math.ceil(this.cards.length / this.pageSize);
        this.paginatedCards = this.cards.slice(
            this.currentPage * this.pageSize,
            (this.currentPage + 1) * this.pageSize
        );
    }
    navigateToDetails(data){
        this.router.navigate(['/post-details']);
        sessionStorage.setItem("post-details",JSON.stringify(data));
    }
}
