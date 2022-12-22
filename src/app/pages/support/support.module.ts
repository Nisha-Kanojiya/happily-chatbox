import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { SupportComponent } from './support.component';

const routes: Routes = [
  { path: '', component: SupportComponent },
];

@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class SupportModule { }
