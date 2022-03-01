import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayedWorksComponent } from './displayed-works/displayed-works.component';

const routes: Routes = [
  { path: '', redirectTo: 'works-list', pathMatch: 'full' },
  {
    path: 'works-list',
    component: DisplayedWorksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
