import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { PrivacyProtectedTestComponent } from './privacy-protected-test.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  { path: '', component: PrivacyProtectedTestComponent }
];

@NgModule({
  declarations: [
    PrivacyProtectedTestComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class PrivacyProtectedTestModule { }
