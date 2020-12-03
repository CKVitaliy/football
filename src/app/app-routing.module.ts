import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from './news/news.component';
import {ReservationComponent} from './reservation/reservation.component';
import {AdminComponent} from './admin/admin.component';
import {AdminCreateNewsComponent} from './admin-create-news/admin-create-news.component';
import {AdminEditNewsComponent} from './admin-edit-news/admin-edit-news.component';
import {AdminCreateStadiumComponent} from './admin-create-stadium/admin-create-stadium.component';
import {AdminEditStadiumComponent} from './admin-edit-stadium/admin-edit-stadium.component';
import {ReserveTimeComponent} from './reserve-time/reserve-time.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {component: NewsComponent, path: 'news'},
  {component: ReservationComponent, path: 'reservation'},
  {component: ReserveTimeComponent, path: 'reserveTime'},
  {
    component: AdminComponent,
    path: 'admin',
    children: [
      {component: AdminCreateNewsComponent, path: 'createNews'},
      {component: AdminEditNewsComponent, path: 'editNews'},
      {component: AdminCreateStadiumComponent, path: 'createStadium'},
      {component: AdminEditStadiumComponent, path: 'editStadium'},
      ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
