import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Options } from 'ng5-slider';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-result-emotional',
  templateUrl: './result-emotional.component.html',
  styleUrls: ['./result-emotional.component.scss']
})
export class ResultEmotionalComponent implements OnInit {

  emotionGraphData: any;
  status = '';
  userlogin: boolean = false;
  currentIndex = 0;
  questionList: any = [];
  emotionalState: any = [];
  rating = 0;
  userID: any;
  answerDetails: Array<any> = [];
  public imageLoader:boolean = false;
  NewPinID: any;
  questionData: any = [];
  value: number = 0;
  options: Options = {
    floor: -50,
    ceil: 50
  };
  @ViewChild('contentToConvert', {static:true}) el!: ElementRef<HTMLImageElement>;
  barLeftSideValue = [ 
    "Anger",
    "Hatred",
    "Fear",
    "Jealousy", 
    "Greed", 
    "Desire", 
    "Discontent",
    "Egotism", 
    "Sadness", 
    "Fatigue", ]

    barRightSideValue = [
      "Calm",
  "Love",
  "Confidence",
  "Admiration",
  "Generosity",
  "Indifference",
  "Content",
  "Humility",
  "Cheerfulness",
  "Zestfulness",
    ]

  public barChartType: ChartType = 'horizontalBar';

  public barChartOptions: ChartOptions = {};

  // tslint:disable-next-line:max-line-length
  public barChartLabels: Label[] = [];
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    {
      data: [], backgroundColor: '', hoverBackgroundColor: '', barPercentage: 0.6,
      maxBarThickness: 20
    }
  ];
  public emotionalStateList: Array<any> = [];
  constructor(private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    try {
      // if (localStorage.getItem('user_pin')) {
      //   this.pinID = JSON.parse(localStorage.getItem('user_pin')).pinCode;
      // } else {
        if (localStorage.getItem('happily_user')) {
          this.userlogin = true;
          this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
        }
      //   this.NewPinID = JSON.parse(localStorage.getItem('temp_pinCode')).pinCode;
      // }
    } catch (error) {
      console.log(error);
    }
    this.getEmotionalGraphData();

    // tslint:disable-next-line:align
    this.barChartOptions = {
      responsive: true,
      legend: {
        display: false,
        position: 'top',
        labels: {
          fontSize: 20,
        }
      },
      tooltips: {
        enabled: true,
        backgroundColor: 'rgba(255,255,255,0.9)',
        bodyFontColor: '#333',
        borderColor: '#999',
        borderWidth: 1,
        caretPadding: 15,
        displayColors: false,
        intersect: true,
        mode: 'index',
        titleFontColor: '#000',
        titleMarginBottom: 10,
        xPadding: 15,
        yPadding: 15,
        titleFontSize: 20,
        bodyFontSize: 20,
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            max: 100,
            min: -100,
            fontSize: 16
          },
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
          },
        }],
        yAxes: [{
          display: false,
          ticks: {
            max: 100,
            min: -100,
            fontSize: 16
          },
        }]
      }
    };
  }
  // position: 'nearest',
  // custom: this.customTooltips,

  async getEmotionalGraphData() {
    if (this.userID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('emotional-state/' + this.userID);
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === 'Success') {
        this.emotionGraphData = data.results;
        this.emotionGraphData.categories.forEach(obj => {
          this.barChartData[0].data.push(obj.emotionalStateValue);
          this.emotionalState.push(obj);
          this.barChartLabels.push(obj.emotionalState);
          // this.barChartLabels = this.barLeftSideValue;
          // obj.questionAnswers.forEach(element => {
          //   this.questionList.push(element);
          // });
        });

        // this.emotionGraphData.categories = [];
        this.emotionGraphData.categories.forEach(ele => {
          ele.questionAnswers.forEach((item: any) => {
            this.answerDetails.push(Object.assign({}, {
              categoriesId: ele.categoriesId,
              emotionalState: ele.allEmotionalState.join('/'),
              emotionalStateValue: ele.emotionalStateValue,
              answer: item.answer * 2,
              positiveLabel: item.positiveLabel,
              negativeLabel: item.negativeLabel,
              questionId: item.id
            }));
          });

        });
        console.log(this.answerDetails);
        
        this.answerDetails.sort(function(a, b){return a.questionId-b.questionId});

        let colors = [];
        colors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        let Hovercolors = [];
        Hovercolors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        this.barChartData[0].backgroundColor = colors;
        this.barChartData[0].hoverBackgroundColor = Hovercolors;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong server not working!',
          showConfirmButton: true,
          // timer: 2000
        });
        this.router.navigateByUrl('/privacy-protected-test');
      }
     } catch (error) {
        console.log(error);
      }
    }  else if (!this.userID && !this.NewPinID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('emotional-state');
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === 'Success') {
        this.emotionGraphData = data.results;
        this.emotionGraphData.categories.forEach(obj => {
          this.barChartData[0].data.push(obj.emotionalStateValue);
          this.emotionalState.push(obj);
          // this.barChartLabels.push(obj.emotionalState);
        });

       // this.emotionGraphData.categories = [];
        this.emotionGraphData.categories.forEach(ele => {
        ele.questionAnswers.forEach((item: any) => {
          this.answerDetails.push(Object.assign({}, {
            categoriesId: ele.categoriesId,
            emotionalState: ele.emotionalState,
            emotionalStateValue: ele.emotionalStateValue,
            answer: item.answer * 2,
            positiveLabel: item.positiveLabel,
            negativeLabel: item.negativeLabel,
            questionId: item.id
          }));
        });
      });
      this.answerDetails.sort(function(a, b){return a.questionId-b.questionId});

        let colors = [];
        colors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        let Hovercolors = [];
        Hovercolors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        this.barChartData[0].backgroundColor = colors;
        this.barChartData[0].hoverBackgroundColor = Hovercolors;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong server not working!',
          showConfirmButton: true,
          // timer: 2000
        });
        this.router.navigateByUrl('/privacy-protected-test');
      }
     } catch (error) {
        console.log(error);
      }
    } else if (!this.userID) {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('emotional-state/' + this.NewPinID);
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === 'Success') {
        this.emotionGraphData = data.results;
        this.emotionGraphData.categories.forEach(obj => {
          this.barChartData[0].data.push(obj.emotionalStateValue);
          this.emotionalState.push(obj);
          this.barChartLabels.push(obj.emotionalState);
          // obj.questionAnswers.forEach(element => {
          //   this.questionList.push(element);
          // });
        });

        this.emotionGraphData.categories.forEach(ele => {
          ele.questionAnswers.forEach((item: any) => {
            this.answerDetails.push(Object.assign({}, {
              categoriesId: ele.categoriesId,
              emotionalState: ele.emotionalState,
              emotionalStateValue: ele.emotionalStateValue,
              answer: item.answer * 2,
              positiveLabel: item.positiveLabel,
              negativeLabel: item.negativeLabel,
              questionId: item.id
            }));
          });
        });
        this.answerDetails.sort(function(a, b){return a.questionId-b.questionId});

        let colors = [];
        colors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        let Hovercolors = [];
        Hovercolors = (this.barChartData[0].data as any[]).map((a: number | string) => {
          return a < 0 ? 'red' : 'green';
        });
        this.barChartData[0].backgroundColor = colors;
        this.barChartData[0].hoverBackgroundColor = Hovercolors;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong server not working!',
          showConfirmButton: true,
          // timer: 2000
        });
        this.router.navigateByUrl('/privacy-protected-test');
      }
     } catch (error) {
        console.log(error);
      }
     }
  }

  getVal(evt: any) {
    this.rating = evt;
  }
  // customTooltips = function(tooltip) {
  //   // Tooltip Element
  //   let tooltipEl = document.getElementById('chartjs-tooltip');
  //   if (!tooltipEl) {
  //     tooltipEl = document.createElement('div');
  //     tooltipEl.id = 'chartjs-tooltip';
  //     tooltipEl.innerHTML = '<table></table>';
  //     this._chart.canvas.parentNode.appendChild(tooltipEl);
  //   }
  //   // Hide if no tooltip
  //   if (tooltip.opacity === 0) {
  //     tooltipEl.style.opacity = 0 as any;
  //     return;
  //   }
  //   // Set caret Position
  //   tooltipEl.classList.remove('above', 'below', 'no-transform');
  //   if (tooltip.yAlign) {
  //     tooltipEl.classList.add(tooltip.yAlign);
  //   } else {
  //     tooltipEl.classList.add('no-transform');
  //   }
  //   function getBody(bodyItem) {
  //     return bodyItem.lines;
  //   }
  //   // Set Text
  //   if (tooltip.body) {
  //     const titleLines = tooltip.title || [];
  //     const bodyLines = tooltip.body.map(getBody);
  //     let innerHtml = '<thead>';
  //     // tslint:disable-next-line:only-arrow-functions
  //     titleLines.forEach(function (title) {
  //       innerHtml += '<tr><th>' + title + '</th></tr>';
  //     });
  //     innerHtml += '</thead><tbody>';
  //     // tslint:disable-next-line:only-arrow-functions
  //     bodyLines.forEach(function (body, i) {
  //       const colors = tooltip.labelColors[i];
  //       let style = 'background-color:' + colors.backgroundColor;
  //       style += '; border-color:' + colors.borderColor;
  //       style += '; border-width: 2px';
  //       const span = '<span class="chartjs-tooltip-key" style="' +
  //         style +
  //         '"></span>';
  //       innerHtml += '<tr><td>' + span + body + '</td></tr>';
  //     });
  //     innerHtml += '</tbody>';
  //     const tableRoot = tooltipEl.querySelector('table');
  //     tableRoot.innerHTML = innerHtml;
  //   }
  //   const positionY = this._chart.canvas.offsetTop;
  //   const positionX = this._chart.canvas.offsetLeft;
  //   // Display, position, and set styles for font
  //   tooltipEl.style.opacity = 1 as any;
  //   tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  //   tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  //   tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  //   tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
  //   tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  //   tooltipEl.style.padding = tooltip.yPadding +
  //     'px ' +
  //     tooltip.xPadding +
  //     'px';
  // };

  generateHtmltoPDF() {
    // var data = document.getElementById('contentToConvert');
    console.log(this.el.nativeElement);
    
    html2canvas(this.el.nativeElement).then((canvas) => {
      // var imgWidth = 208;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/jpeg')
      let pdf = new jsPDF({ orientation: 'portrait'})
      const imageProps = pdf.getImageProperties(contentDataURL)
      const pdfw = pdf.internal.pageSize.getWidth();
      console.log(pdfw);
      
      const pdfh = (imageProps.height*pdfw)/imageProps.width;
      console.log(pdfh);
      
      pdf.addImage( contentDataURL,'PNG', 1, 2, pdfw, pdfh,);
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('your_self_test_result_graph.pdf');
    });
  }


  // async generateHtmltoPDF() {
  //   try {
  //     var data = document.getElementById("contentToConvert");
  //     console.log(data);
      
  //     $("pdfOpenHide").attr("hidden", true);
  //     // To disable the scroll
  //     document.getElementById("alldata").style.overflow = "inherit";
  //     document.getElementById("alldata").style.maxHeight = "inherit";
  
  //     await html2canvas(data, { scrollY: -window.scrollY, scale: 1 }).then(
  //       (canvas) => {
  //         const contentDataURL = canvas.toDataURL("image/png", 1.0);
  //         // enabling the scroll
  //         document.getElementById("alldata").style.overflow = "scroll";
  //         document.getElementById("alldata").style.maxHeight = "90vh";
  
  //         let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF
  
  //         let imgWidth = 300;
  //         let pageHeight = pdf.internal.pageSize.height;
  //         let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //         let heightLeft = imgHeight;
  //         let position = 0;
  
  //         pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  
  //         while (heightLeft >= 0) {
  //           position = heightLeft - imgHeight;
  //           pdf.addPage();
  //           pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
  //           heightLeft -= pageHeight;
  //         }
  //         window.open(
  //           pdf.output("bloburl", { filename: "new-file.pdf" }),
  //           "_blank"
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
      
  //   }
   
  // }


  htmltoPdfDetails() {
    this.apiService.generateHtmltoPDF();
  }

}
