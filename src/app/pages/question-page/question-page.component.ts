import { Component, Input, OnInit, ViewChild, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
import * as $ from 'jquery';
import { Options } from 'ng5-slider';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionComponent implements OnInit {

  status = '';
  currentIndex = 0;
  previousIndexPosition = -1;
  questionData: any = {};
  userLogin = false;
  withoutPin = true;
  rating = 0;
  userID: any;
  questionObj: any = {};
  public imageLoader: boolean = false;
  // flagCompleted = false;
  @ViewChild('countdown') counter: CountdownComponent;
  private readonly MAX_NUMBER_OF_STARS = 5;
  timer: any;
  questionList: any;
  percentageValue: any = {};
  @ViewChild('cd', { static: false }) private countdown: QuestionComponent;
  value: number = 0;
  questionCount = 0;
  options: Options = {
    floor: -50,
    ceil: 50,
    step: 0.1
  };

  answersRating: any = [];
  taskTimerCounter;
  isTestStarted = 0;
  taskPercentage = 0;
  width: any=100;


  constructor(private router: Router,
    private apiService: ApiService) {
      this.runProgressBar();
  }

  ngOnInit() {
    try {
      if (localStorage.getItem('happily_user')) {
        this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
    $('.ng5-slider-floor').css('display', 'none');
    $('.ng5-slider-ceil').css('display', 'none');
    $('.ng5-slider-model-value').css('display', 'none');
    this.questionListData();

    console.log("url",this.router.url)
  }

  ngOnDestroy() {
    clearInterval(this.taskTimerCounter);
   
}

  public finishTest(event: any) {
    // if (event.action == 'done') {
    // console.log('countdownEvent', event);
    // this.router.navigateByUrl('/');
    // }
  }
  // public start() {
  //   this.countdown.begin();
  // }

  // getVal(evt: any) {
  //   this.rating = evt;
  // }

  getVal(evt: any, value: any, selectedQuestionIndex: number) {
   // console.log("rating",evt)
     this.rating = evt;
    if (this.userID && (this.userLogin === true)) {
    let check = this.answersRating.findIndex(x => x.questionId === value.id);
    if (check == -1) {

     
      this.answersRating.push({ questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating, userId: this.userID });
    } else {
      this.answersRating[check] = { questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating, userId: this.userID };
    }
  }
  else {
     let check = this.answersRating.findIndex(x => x.questionId === value.id);
      if (check == -1) {
        this.answersRating.push({ questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating });
      } else {
        this.answersRating[check] = { questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating };
      }
  }

  this.rating = 0;
  }

  async getPreviousQuestionPair(value: any, selectedQuestionIndex: number) {

    //  for (const iterator of this.answersRating) {
    //    const rating = iterator.rating;

    //    if ((selectedQuestionIndex - 1 ) === iterator.qIndex) {
    //      this.value = rating;
    //    }
    //  }
    // this.currentIndex--;

    if (this.currentIndex == 4) {

      this.previousIndexPosition = -1;
      this.currentIndex = this.currentIndex - 3;
    }
  else  if(this.currentIndex >= 28)
    {
      console.log("curr",this.currentIndex ,this.previousIndexPosition)
    this.previousIndexPosition = this.previousIndexPosition - 3;
    this.currentIndex = this.currentIndex - 1;
    }
    else {
      console.log("curr1",this.currentIndex ,this.previousIndexPosition)
      this.previousIndexPosition = this.previousIndexPosition - 3;
      this.currentIndex = this.currentIndex - 3;

    }

  }

  async getNextQuestionPair(value: any, selectedQuestionIndex: number) {

    if(this.currentIndex == 0)
    {
    this.startTimerAndSubmit();
    }
    let message = '';
    this.isTestStarted = 1;
    if(this.currentIndex > 0)
    {
      this.taskPercentage = this.taskPercentage + 10;
      this.completeProgressBar();
    }
    
    if (this.userID && (this.userLogin === true)) {
      console.log('login');
      // item.user_id = this.UserID;if()
      for (var i in this.answersRating) {

        if (isNaN(this.answersRating[i].rating)  || this.answersRating[i].rating == null) {
           this.answersRating[i].rating = 0;
         
        }
      }

     

      // this.currentIndex++;
      this.previousIndexPosition = this.currentIndex;
     //console.log("curr1",this.currentIndex)
      if(this.currentIndex >= 27)
      {
       // console.log("curr",this.currentIndex)
      this.currentIndex = this.currentIndex + 1;
      }
      else
      {
        this.currentIndex = this.currentIndex + 3;
      }
      window.scroll(0,0);
      this.value = 0;
      this.rating = 0;
      if (this.answersRating.length === this.questionList.length) {
       
        try {
          this.imageLoader = true;
          const data = await this.apiService.post('answers-rating', { answersRating: this.answersRating });
          this.imageLoader = false;
          this.questionObj = data.results;
          message = data.statusMessage;
          const userAnswerData = this.questionObj[0];
          localStorage.setItem('user_pin', JSON.stringify(userAnswerData));
          if (data.statusMessage && data.statusMessage === 'Success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your Self-Reflection Test Submitted',
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.router.navigateByUrl('/show-result');
        } catch (error) {
          console.log(error.error);
        }
      }
    } else {
      console.log('without');
      for (var i in this.answersRating) {

        if (isNaN(this.answersRating[i].rating)  || this.answersRating[i].rating == null) {
           this.answersRating[i].rating = 0;
         
        }
      }
      // let check = this.answersRating.findIndex(x => x.questionId === value.id);
      // if (check == -1) {
      //   this.answersRating.push({ questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating });
      // } else {
      //   this.answersRating[check] = { questionId: value.id, qIndex: selectedQuestionIndex, rating: this.rating };
      // }
      // this.currentIndex++;
      // this.previousIndexPosition = this.currentIndex;
      // this.currentIndex = this.currentIndex + 3;
 // this.currentIndex++;
 
 this.previousIndexPosition = this.currentIndex;
 //console.log("curr1",this.currentIndex)
  if(this.currentIndex >= 27)
  {
   // console.log("curr",this.currentIndex)
  this.currentIndex = this.currentIndex + 1;
  }
  else
  {
    this.currentIndex = this.currentIndex + 3;
  }

      window.scroll(0,0);
      this.value = 0;
      this.rating = 0;
      if (this.answersRating.length === this.questionList.length) {
        try {
          this.imageLoader = true;
          const data = await this.apiService.post('answers-rating', { answersRating: this.answersRating });
          this.imageLoader = false;
          this.questionObj = data.results;
          const userAnswerData = this.questionObj[0];
          message = data.statusMessage;
          localStorage.setItem('user_pin', JSON.stringify(userAnswerData));
         
          if (data.statusMessage && data.statusMessage === 'Success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your Self-Reflection Test Submitted',
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.router.navigateByUrl('/show-result');
        } catch (error) {
          console.log(error.error);
        }
        
      }
    }
  }

  startTimerAndSubmit()
{
  setTimeout(() => { 

    if(this.router.url == '/question-page')
    {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Suggested test time is over.  Please complete the test by reflecting on your feelings, not thoughts or past actions!',
      showConfirmButton: true,
     // timer: 2000
    });
    }
  }, 600000)
}

  async questionListData() {
    try {
      this.imageLoader = true;
      const getQuestionData = await this.apiService.get('question/get-all-questions');
      this.imageLoader = false;
      if (getQuestionData.statusMessage && getQuestionData.statusMessage === 'Success') {
        this.questionList = getQuestionData.results;
        console.log(this.questionList.length)
        this.questionList.map(obj => ({ ...obj, selectedValue: 0 }))
      }
    } catch (error) {
      console.log(error.error);
    }
  }


  runProgressBar(){
    Observable.timer(0,6000)
    .takeWhile(()=>
       this.isWidthWithinLimit()
       )
    .subscribe(()=>{
              this.width=this.width-1;
    })
    
  }

  isWidthWithinLimit(){
    if(this.width===0){ 
      if(this.router.url == '/question-page')
    {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Suggested test time is over.  Please complete the test by reflecting on your feelings, not thoughts or past actions!',
          showConfirmButton: true,
         // timer: 2000
        });
      return false;
    }
    }else{
      return true;
    }
  }

  completeProgressBar(){
    this.taskPercentage=this.taskPercentage;
  }

  isWidthCompleteLimit(){
    if(this.taskPercentage===100){ 
      return false;
    }else{
      return true;
    }
  }

}
