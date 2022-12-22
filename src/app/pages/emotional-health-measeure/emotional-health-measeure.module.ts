import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { EmotionalHealthMeasureComponent } from './emotional-health-measeure.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: EmotionalHealthMeasureComponent },
];

@NgModule({
  declarations: [
    EmotionalHealthMeasureComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ChartsModule
  ],
  exports: [RouterModule],
})
export class EmotionalHealthMeasureModule { }
