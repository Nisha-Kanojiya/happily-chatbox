import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NetworkVerifyComponent } from './network-verify.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  { path: '', component: NetworkVerifyComponent },
];

@NgModule({
  declarations: [
    NetworkVerifyComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class NetworkVerifyModule { }
