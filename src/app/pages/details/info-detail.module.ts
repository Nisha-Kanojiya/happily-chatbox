import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { InfoDetailComponent } from './info-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  { path: '', component: InfoDetailComponent },
];

@NgModule({
  declarations: [
    InfoDetailComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class InfoDetailModule { }
