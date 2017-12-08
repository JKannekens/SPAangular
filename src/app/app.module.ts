import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { SportcomplexesComponent } from './sportcomplexes/sportcomplexes.component';
import { EventsComponent } from './events/events.component';
import { SportcomplexDetailComponent } from './sportcomplexes/sportcomplex-detail/sportcomplex-detail.component';
import { SportcomplexListComponent } from './sportcomplexes/sportcomplex-list/sportcomplex-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SportcomplexesComponent,
    EventsComponent,
    SportcomplexDetailComponent,
    SportcomplexListComponent,
    EventDetailComponent,
    EventListComponent,
    EventItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
