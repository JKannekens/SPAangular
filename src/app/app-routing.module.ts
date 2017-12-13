import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SportcomplexesComponent} from './sportcomplexes/sportcomplexes.component';
import {SportcomplexDetailComponent} from './sportcomplexes/sportcomplex-detail/sportcomplex-detail.component';
import {EventsComponent} from './events/events.component';
import {SportcomplexEditComponent} from './sportcomplexes/sportcomplex-edit/sportcomplex-edit.component';
import {EventDetailComponent} from './events/event-detail/event-detail.component'
import {EventEditComponent} from './events/event-edit/event-edit.component';
import {SportsComponent} from './sports/sports.component';
import {SportsEditComponent} from './sports/sports-edit/sports-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sportcomplexes', pathMatch: 'full' },
  { path: 'sportcomplexes', component: SportcomplexesComponent, children: [
    { path: 'new', component: SportcomplexEditComponent },
    { path: ':id', component: SportcomplexDetailComponent },
    { path: ':id/edit', component: SportcomplexEditComponent },
  ] },
  { path: 'events', component: EventsComponent, children: [
    { path: 'new', component: EventEditComponent },
    { path: ':id', component: EventDetailComponent },
    { path: ':id/edit', component: EventEditComponent },
  ]},
  { path: 'sports', component: SportsComponent, children: [
    // { path: 'new', component: EventEditComponent },
    { path: ':id', component: SportsEditComponent },
    // { path: ':id/edit', component: EventEditComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
