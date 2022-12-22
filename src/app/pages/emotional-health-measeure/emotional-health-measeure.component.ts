import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emotional-health-measeure',
  templateUrl: './emotional-health-measeure.component.html',
  styleUrls: ['./emotional-health-measeure.component.scss']
})
export class EmotionalHealthMeasureComponent implements OnInit {
  readMore = false;
  constructor(private router: Router) { }

  ngOnInit() {

   }
   trigger() {
    this.readMore = !this.readMore;
    console.log(this.readMore);
  }
}
