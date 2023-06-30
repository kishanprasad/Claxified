import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostCommonComponent } from './components/add-post-common/add-post-common.component';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';
import { ViewPostDetailsComponent } from './components/view-post-details/view-post-details.component';


const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path : "post", component : PostComponent},
  {path : "", redirectTo: '/home', pathMatch: 'full' },
  {path : "add-post", component : AddPostCommonComponent},
  {path : "view-posts", component : ViewPostsComponent},
  {path : "post-details", component : ViewPostDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
