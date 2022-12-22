import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import *  as  data from '../../../assets/files/data.json';
import { ApiService } from '../../services/api.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { CustomvalidationService } from 'src/app/services/custom-validation.service';
import { CountryList } from '../../../assets/files/country';
import * as $ from 'jquery';

@Component({
  selector: 'app-privacy-protected-test',
  templateUrl: './privacy-protected-test.component.html',
  styleUrls: ['./privacy-protected-test.component.scss']
})
export class PrivacyProtectedTestComponent implements OnInit {

  mindTestData: any = {};
  message: any;
  userID: number;
  userLogin = false;
  public imageLoader:boolean = false;
  withoutPin = true;
  pinID: any;
  countryData: any = [];
  submitted: boolean = false;
  userName: string;
  messageCheck: string;
  public questionsdropdownSettings: any = {};
  public questions: Array<any>;
  problemList: any;
  public serverQuestions: Array<any>;
  public deleteQuestions: Array<any>;
  privacyTestForm: FormGroup;
  languageList: any = (data as any).default;
  remain: string;
  remainReview: string;
  labelShow: boolean = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private customValidator: CustomvalidationService) {
                this.countryData = CountryList;
              }

  public religionList = [
    'None',
    'African Traditional & Diasporic',
    'Agnostic',
    'Atheist',
    'Bahá’í',
    'Buddhism',
    'Christianity',
    'Confucianism',
    'Druze',
    'Gnosticism',
    'Hinduism',
    'Indigenous American Religions',
    'Islam',
    'Jainism',
    'Judaism',
    'Juche',
    'Neo-Paganism',
    'Nonreligious',
    'primal-indigenous',
    'Rastafarianism',
    'Secular',
    'Shinto',
    'Sikhism',
    'Tenrikyo',
    'Traditional African Religions',
    'Unitarian-Universalism',
    'Zoroastrianism'
    ];
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('tempUserDetails'));

    this.problemListData();
    try {
      if (localStorage.getItem('happily_user')) {
        //this.userID = JSON.parse(localStorage.getItem('happily_user')).user.id;
        this.userName = JSON.parse(localStorage.getItem('happily_user')).username;
        this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
    // this.checkFormFilled();
    this.privacyTestForm = this.formBuilder.group({
      problems: [''],
      generalFeeling: [''],
      mindPower: [''],
      age: ['', Validators.required],
      country: ['', Validators.required],
      religion: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
      review: ['', Validators.required],
    });

    if (user) {
      this.labelShow = true
      this.privacyTestForm.patchValue(user);
    }


    this.questions = [];
    this.deleteQuestions = [];

    this.questionsdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'problem',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      enableCheckAll: false,
      allowSearchFilter: true
    };

  }
  get privacyTestControl() {
    return this.privacyTestForm.controls;
  }


  public trigger(e: any, eleId: string) {
    // tslint:disable-next-line:one-variable-per-declaration
    const tval = $('#' + eleId).val(), tlength = tval.length, set = 1000;
    switch (eleId) {
      case 'description':
        this.remain = (set - tlength).toString();
        if (+this.remain <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#' + eleId).val(tval.substring(0, tlength - 1));
          return false;
        }
        break;
        case 'review':
          this.remainReview = (set - tlength).toString();
          if (+this.remainReview <= 0 && e.which !== 0 && e.charCode !== 0) {
            $('#' + eleId).val(tval.substring(0, tlength - 1));
            return false;
          }
          break;
      default:
        break;
    }
  }


  async problemListData() {
    try {
      const problemData = await this.apiService.get('problems');
      if (problemData.statusMessage && problemData.statusMessage === 'Success') {
        this.problemList = problemData.results;
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  onQuestionsItemSelect(item: any) {
    let i = this.deleteQuestions.findIndex(y => y.question_id === item.question_id);
    if (i !== -1) {
      this.deleteQuestions.splice(i, 1);
    }
    // item.user_id = this.UserID;
    this.questions.push(item);
  }

  onQuestionsDeSelect(item: any) {
    this.questions.splice(this.questions.findIndex(y => y.question_id === item.question_id), 1);
    let l = this.serverQuestions.find(y => y.question_id === item.question_id);
    if (l) {
      this.deleteQuestions.push(l);
    }
  }

  async onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line:max-line-length
    if (this.privacyTestForm.valid) {
      // tslint:disable-next-line:max-line-length
      if (this.privacyTestForm.value.problems == '' && this.privacyTestForm.value.generalFeeling == '' && this.privacyTestForm.value.mindPower == '') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Please select atleast one checkbox!',
          showConfirmButton: true,
          // timer: 2000
        });
      // tslint:disable-next-line:max-line-length
      } else if (this.privacyTestForm.value.problems != '' || this.privacyTestForm.value.generalFeeling != '' || this.privacyTestForm.value.mindPower != '') {
        if (this.privacyTestForm.value.problems == '') {
          this.privacyTestForm.value.problems = [];
        }
        let message = '';
        if (this.userLogin ===   true) {
          console.log('withLogin');
          try {
            this.imageLoader = true;
            let req = {
              user: { id: this.userID }
            };
            req = Object.assign(req, this.privacyTestForm.value);
            let data = await this.apiService.post('user/details', req);
            this.imageLoader = false;
            message = data.statusMessage;
            const userDetails = data.results;
            if (data.statusMessage && data.statusMessage === 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User data submitted successfully!',
                showConfirmButton: false,
                timer: 2000
              });
              localStorage.setItem('tempUserDetails', JSON.stringify(userDetails));
              this.router.navigateByUrl('/how-happy-you-details');
            } else if (data.statusMessage && data.statusMessage !== 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: message,
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigateByUrl('/how-happy-you-details');
              message = data.Error;
            }
          } catch (error) {
            message = error.error;
            console.log(message);
          }
        } else {
          console.log('withoutLogin');
          try {
            this.imageLoader = true;
            let data = await this.apiService.post('user/details', this.privacyTestForm.value);
            this.imageLoader = false;
            message = data.statusMessage;
            const userDetails = data.results;
            if (data.statusMessage && data.statusMessage === 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User data submitted successfully!',
                showConfirmButton: false,
                timer: 2000
              });
              localStorage.setItem('tempUserDetails', JSON.stringify(userDetails));
              this.router.navigateByUrl('/how-happy-you-details');
            } else if (data.statusMessage && data.statusMessage !== 'Success') {
              message = data.Error;
              if (data.statusCode && data.statusCode === 'HP999') {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  // tslint:disable-next-line:max-line-length
                  title: 'Refreshing page is taking too long. Please click on OK, move out of this page, and return to try again. Or try closing browser and re-opening the website. Sorry for the inconvenience.',
                  showConfirmButton: true,
                  // timer: 2000
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'info',
                  title: message,
                  showConfirmButton: false,
                  timer: 2000
                });
              }
              this.router.navigateByUrl('/how-happy-you-details');
            }
          } catch (error) {
            message = error.error;
            console.log(message);
          }
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please enter all information.',
        showConfirmButton: true,
        // timer: 2000
      });
    }

  }

  // async checkFormFilled() {
  //   this.messageCheck = JSON.parse(this.cookieService.get('form_filled'));
  //   console.log('this.messageCheck', this.messageCheck);
  //   if (this.userLogin) {
  //       console.log('userLogin', this.userLogin);
  //       try {
  //         const data = await this.apiService.get('get-details-by-username/'  + this.userName);
  //         if (data.statusMessage && data.statusMessage === 'Success') {
  //           const getInfoData = data.results.statusMessage;
  //           console.log('getttttt', getInfoData);
  //           if (getInfoData === 'UserDetails Not Exist') {
  //             console.log('1111');
  //             this.router.navigateByUrl('/privacy-protected-test');
  //           } else {
  //             this.router.navigateByUrl('/userinfo');
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error.error);
  //       }
  //    }
  //   }
}

