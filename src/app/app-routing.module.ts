import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SportcomplexesComponent} from './sportcomplexes/sportcomplexes.component';
import {SportcomplexDetailComponent} from './sportcomplexes/sportcomplex-detail/sportcomplex-detail.component';
import {EventsComponent} from './events/events.component';
import {SportcomplexEditComponent} from './sportcomplexes/sportcomplex-edit/sportcomplex-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sportcomplexes', pathMatch: 'full' },
  { path: 'sportcomplexes', component: SportcomplexesComponent, children: [
    { path: 'new', component: SportcomplexEditComponent },
    { path: ':id', component: SportcomplexDetailComponent },
    { path: ':id/edit', component: SportcomplexEditComponent },
  ] },
  { path: 'events', component: EventsComponent, children: [
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
