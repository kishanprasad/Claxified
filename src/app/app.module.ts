import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSlider, MatSliderModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { AddPostCommonComponent } from './components/add-post-common/add-post-common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GadgetFiltersComponent } from './components/gadget-filters/gadget-filters.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ViewPostDetailsComponent } from './components/view-post-details/view-post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    AddPostCommonComponent,
    GadgetFiltersComponent,
    HeaderComponent,
    ViewPostsComponent,
    PostCardComponent,
    ViewPostDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
