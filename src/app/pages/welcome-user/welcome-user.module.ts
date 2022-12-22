import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { WelcomeUserComponent } from './welcome-user.component';

const routes: Routes = [
  { path: '', component: WelcomeUserComponent },
];

@NgModule({
  declarations: [
    WelcomeUserComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class WelcomeModule { }
