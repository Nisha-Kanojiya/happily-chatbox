import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import *  as  data from '../../../assets/files/data.json';
import { CountryList } from '../../../assets/files/country';
import Swal from 'sweetalert2';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent implements OnInit {
  userInfoData: any = {};
  userName: string;
  languageList: any = (data as any).default;
  countryData: any = [];
  public problemsdropdownSettings: any = {};
  public problems: Array<any>;
  problemList: any;
  public imageLoader:boolean = false;
  public serverProblems: Array<any>;
  public deleteProblems: Array<any>;
  public deleteProblemsID: Array<any>;
  privacyTestForm: FormGroup;
  userLogin = false;
  submitted: boolean = false;
  userID: number;
  remain: string;
  remainReview: string;
  constructor(private router: Router,
              private apiService: ApiService , private formBuilder: FormBuilder) {
              this.countryData = CountryList;
               }

  public religionList = [
    'None',
    'Atheism/Agnosticism',
    'Bahá’í',
    'Buddhism',
    'Christianity',
    'Confucianism',
    'Druze',
    'Gnosticism',
    'Hinduism',
    'Islam',
    'Jainism',
    'Judaism',
    'Rastafarianism',
    'Shinto',
    'Sikhism',
    'Zoroastrianism',
    'Traditional African Religions',
    'African Diaspora Religions',
    'Indigenous American Religions'];

  ngOnInit() {
    try {
      if (localStorage.getItem('happily_user')) {
        this.userName = JSON.parse(localStorage.getItem('happily_user')).username;
        this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
         this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
    this.problems = [];
    this.deleteProblems = [];

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

    this.problemsdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'problem',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.problemListData();
    this.userInfoDetails();
  }

  async problemListData() {
    try {
      this.imageLoader = true;
      const problemData = await this.apiService.get('problems');
      this.imageLoader = false;
      if (problemData.statusMessage && problemData.statusMessage === 'Success') {
        this.problemList = problemData.results;
        console.log("list",this.problemList)
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  onProblemsItemSelect(item: any) {
    let i = this.deleteProblems.findIndex(y => y.id === item.id);
    if (i !== -1) {
      this.deleteProblems.splice(i, 1);
    }
    // item.user_id = this.UserID;
    this.problems.push(item);
  }

  onProblemsDeSelect(item: any) {
    this.problems.splice(this.problems.findIndex(y => y.id === item.id), 1);
    let l = this.serverProblems.find(y => y.id === item.id);
    if (l) {
      this.deleteProblems.push(l);
    }
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

    async userInfoDetails() {
      try {
        this.imageLoader = true;
        let data = await this.apiService.get('get-details-by-username/'  + this.userName);
        this.imageLoader = false;
        if (data.statusMessage && data.statusMessage === 'Success') {
          const getInfoData = data.results;

          if (data.statusCode && data.statusCode === 'HP200') {
            this.userInfoData = getInfoData;
            this.privacyTestForm.controls['age'].setValue(this.userInfoData.age)
            this.privacyTestForm.controls['country'].setValue(this.userInfoData.country)
            this.privacyTestForm.controls['language'].setValue(this.userInfoData.language)
            this.privacyTestForm.controls['religion'].setValue(this.userInfoData.religion)
            this.privacyTestForm.controls['description'].setValue(this.userInfoData.description)
            this.privacyTestForm.controls['review'].setValue(this.userInfoData.review)
            this.privacyTestForm.controls['generalFeeling'].setValue(this.userInfoData.generalFeeling)
            this.privacyTestForm.controls['mindPower'].setValue(this.userInfoData.mindPower)
            // this.privacyTestForm.controls['problems'].setValue(this.userInfoData.problems)
            this.problems = this.userInfoData.problems;
          } else {
            this.userInfoData = getInfoData.results;
            this.privacyTestForm.controls['age'].setValue(this.userInfoData.age)
            this.privacyTestForm.controls['country'].setValue(this.userInfoData.country)
            this.privacyTestForm.controls['language'].setValue(this.userInfoData.language)
            this.privacyTestForm.controls['religion'].setValue(this.userInfoData.religion)
            this.privacyTestForm.controls['description'].setValue(this.userInfoData.description)
            this.privacyTestForm.controls['review'].setValue(this.userInfoData.review)
            this.privacyTestForm.controls['generalFeeling'].setValue(this.userInfoData.generalFeeling)
            this.privacyTestForm.controls['mindPower'].setValue(this.userInfoData.mindPower)
            // this.privacyTestForm.controls['problems'].setValue(this.userInfoData.problems)
            this.problems = this.userInfoData.problems;
          }

          this.serverProblems = [];
          if (this.userInfoData.problems) {
            for (let b = 0; b < this.userInfoData.problems.length; b++) {
           this.userInfoData.problems[b] = Object.assign(this.userInfoData.problems[b],  this.userInfoData.problems[b].problem);
           this.serverProblems = this.userInfoData.problems;
            }
          }
        } else {
          if (data.statusCode && data.statusCode === 'HP999') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Refreshing page is taking too long. Please click on OK, move out of this page, and return to try again. Or try closing browser and re-opening the website. Sorry for the inconvenience.',
              showConfirmButton: true,
              // timer: 2000
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong server not working!',
              showConfirmButton: true,
              // timer: 2000
            });
           }
        }
      } catch (error) {
        console.log(error.error);
      }
    }


  async onSubmit() {
    this.submitted = true;
    this.privacyTestForm.controls['problems'].setValue(this.problems)
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
              // user: { id: this.userID }
              id: this.userID
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


}

