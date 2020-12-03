import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { NewsComponent } from './news/news.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminCreateNewsComponent } from './admin-create-news/admin-create-news.component';
import { AdminEditNewsComponent } from './admin-edit-news/admin-edit-news.component';
import { FooterComponent } from './footer/footer.component';
import { SelectorComponent } from './selector/selector.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { MomentPipe } from './share/moment.pipe';
import { AdminCreateStadiumComponent } from './admin-create-stadium/admin-create-stadium.component';
import { AdminEditStadiumComponent } from './admin-edit-stadium/admin-edit-stadium.component';
import { ReserveTimeComponent } from './reserve-time/reserve-time.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TruncatePipe } from './share/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReservationComponent,
    AdminComponent,
    AdminCreateNewsComponent,
    AdminEditNewsComponent,
    FooterComponent,
    SelectorComponent,
    CalendarComponent,
    ReservationListComponent,
    MomentPipe,
    AdminCreateStadiumComponent,
    AdminEditStadiumComponent,
    ReserveTimeComponent,
    PageNotFoundComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
