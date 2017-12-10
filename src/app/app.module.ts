import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { SportcomplexesComponent } from './sportcomplexes/sportcomplexes.component';
import { EventsComponent } from './events/events.component';
import { SportcomplexDetailComponent } from './sportcomplexes/sportcomplex-detail/sportcomplex-detail.component';
import { SportcomplexListComponent } from './sportcomplexes/sportcomplex-list/sportcomplex-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';
import {SportcomplexItemComponent} from './sportcomplexes/sportcomplex-list/sportcomplex-item/sportcomplex-item.component';
import {AppRoutingModule} from './app-routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import {SportcomplexService} from './sportcomplexes/sportcomplex.service';
import {HttpModule} from '@angular/http';
import {SportcomplexEditComponent} from './sportcomplexes/sportcomplex-edit/sportcomplex-edit.component';
import {EventService} from './events/event.service';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent,
    SportcomplexesComponent,
    EventsComponent,
    SportcomplexDetailComponent,
    SportcomplexListComponent,
    SportcomplexItemComponent,
    SportcomplexEditComponent,
    EventDetailComponent,
    EventListComponent,
    EventItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SportcomplexService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
