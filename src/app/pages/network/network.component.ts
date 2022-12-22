import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../../services/form-service';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import *  as  data from '../../../assets/files/bad-words.json';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
declare var require: any;

const Filter = require('bad-words');
let filter = new Filter({ regex: /\*|\.|$/gi });


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  message: string;
  userID: number;
  networkForm: FormGroup;
  submitted = false;
  groupResponse: any;
  inboxResponse: any;
  replyMessage: any = {};
  statusMessage: string;
  inboxShowflag: boolean = false;
  sentMessageShowflag: boolean = false;
  getAllsendMessagesResponse: any;
  public currIndex: number = -1;
  public detailModeOn: boolean = false;
  public replyModeOn: boolean = false;
  public imageLoader:boolean = false;
  replyObj: any = {};
  userName: string;
  sendBtnDisabled = false;
  sendBtnDisabledReply = false;
  badWords: any = (data as any).default;
  badWordsSub: any = (data as any).default;
  badWordsReply: any = (data as any).default;
  badWordsSubReply: any = (data as any).default;
  userNameExist = false;
  remainCharcter: string;
  remainCharacterSubject: string;
  replyCharacter: string;
  replyCharacterCount: string;

  constructor(private router: Router,
              public formService: FormsService,
              private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit() {
    console.log("demo");
    
      try {
       
        if (localStorage.getItem('happily_user')) {
          this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
          console.log(this.userID);
          
          this.userName = JSON.parse(localStorage.getItem('happily_user')).username;
          console.log(this.userName);
        }
      } catch (error) {
        console.log(error);
      }
      this.networkForm = this.formBuilder.group({
      happily: [''],
      allMembers: [''],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      productUrl: [''],
    });

      // this.networkForm.get('username').valueChanges.subscribe(res => {
      //   console.log(res);
      //   if (res) {
      //     this.networkForm.controls.happily.setValue(false);
      //     this.networkForm.controls.allMembers.setValue(false);
      //     this.networkForm.controls.group.setValue('');
      //   }
      // });
      this.networkForm.get('happily').valueChanges.subscribe(res => {
        console.log(res);
        if (res) {
          this.networkForm.controls.username.setValue('');
          this.networkForm.controls.allMembers.setValue(false);
          this.networkForm.controls.group.setValue('');
        }
      });
      this.networkForm.get('allMembers').valueChanges.subscribe(res => {
        console.log(res);
        if (res) {
          this.networkForm.controls.username.setValue('');
          this.networkForm.controls.happily.setValue(false);
          this.networkForm.controls.group.setValue('');
        }
      });
      // this.networkForm.get('group').valueChanges.subscribe(res => {
      //   console.log(res);
      //   if (res) {
      //     this.networkForm.controls.username.setValue('');
      //     this.networkForm.controls.happily.setValue(false);
      //     this.networkForm.controls.allMembers.setValue(false);
      //   }
      // });

    // });
   
      this.inboxListData();

    //   $('textarea').keypress((e) => {
    //     // tslint:disable-next-line:one-variable-per-declaration
    //     const tval = $('textarea').val(),
    //         tlength = tval.length,
    //         set = 100,
    //         remain = (set - tlength).toString();
    //     if (+remain <= 0 && e.which !== 0 && e.charCode !== 0) {
    //         $('textarea').val((tval).substring(0, tlength - 1));
    //         return false;
    //     }
    // });

  }

  public trigger(e: any, eleId: string) {
    // tslint:disable-next-line:one-variable-per-declaration
    const tval = $('#' + eleId).val(), tlength = tval.length, set = 1000;
    switch (eleId) {
      case 'textarea':
        this.remainCharcter = (set - tlength).toString();
        if (+this.remainCharcter <= 0 && e.which !== 0 && e.charCode !== 0) {
          $('#' + eleId).val(tval.substring(0, tlength - 1));
          return false;
        }
        break;
        case 'composeSubject':
          this.remainCharacterSubject = (set - tlength).toString();
          if (+this.remainCharacterSubject <= 0 && e.which !== 0 && e.charCode !== 0) {
            $('#' + eleId).val(tval.substring(0, tlength - 1));
            return false;
          }
          break;
          case 'replyTextarea':
            this.replyCharacter = (set - tlength).toString();
            if (+this.replyCharacter <= 0 && e.which !== 0 && e.charCode !== 0) {
              $('#' + eleId).val(tval.substring(0, tlength - 1));
              return false;
            }
            break;
            case 'replyComposeSubject':
              this.replyCharacterCount = (set - tlength).toString();
              if (+this.replyCharacterCount <= 0 && e.which !== 0 && e.charCode !== 0) {
                $('#' + eleId).val(tval.substring(0, tlength - 1));
                return false;
              }
              break;
      default:
        break;
    }
  }

  // async groupListData() {
  //   try {
  //     this.imageLoader = true;
  //     const groupData = await this.apiService.get('groups/get-all-groups');
  //     this.imageLoader = false;
  //     if (groupData.statusMessage && groupData.statusMessage === 'Success') {
  //       this.groupResponse = groupData.results;
  //     }
  //   } catch (error) {
  //     console.log(error.error);
  //   }
  // }

  async inboxListData() {
    try {
      this.imageLoader = true;
      const inboxData = await this.apiService.get('message/inbox/' + this.userID + '/' + false);
      this.imageLoader = false;
      if (inboxData.statusMessage && inboxData.statusMessage === 'Success') {
        this.inboxResponse = inboxData.results;
        if (this.inboxResponse == null || this.inboxResponse.length == 0) {
          this.inboxShowflag = true;
          this.statusMessage = 'No conversation message';
        }
        // this.inboxResponse.push(...this.inboxResponse);
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  async getAllsendMessagesListData() {
    try {
      this.imageLoader = true;
      const getAllsendMessagesData = await this.apiService.get('message/get-all-send-message/' + this.userID + '/' + false);
      this.imageLoader = false;
      if (getAllsendMessagesData.statusMessage && getAllsendMessagesData.statusMessage === 'Success') {
        this.getAllsendMessagesResponse = getAllsendMessagesData.results;
        // this.getAllsendMessagesResponse.push(...this.getAllsendMessagesResponse);
        if (this.getAllsendMessagesResponse == null || this.getAllsendMessagesResponse.length == 0) {
          this.sentMessageShowflag = true;
          this.statusMessage = 'No conversation message';
        }
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  async deletePopupInbox(value: number) {
      console.log(value);
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Are you sure you want to delete?',
        showConfirmButton: true,
        showCancelButton: true,
        // timer: 2000
      }).then( async (res) => {
        if (res.value) {
          const req = {
            "messageId": value,
            "receiverId": this.userID
        };
          try {
            this.imageLoader = true;
            const data = await this.apiService.delete('message/delete-message', req);
            const resonseData  = data;
            console.log(resonseData);
            this.imageLoader = false;
            this.message = data.statusMessage;
            if (data.statusMessage && data.statusMessage === 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete message successfully!',
                showConfirmButton: false,
                timer: 2000
              });
              this.replyMessage = {};
              this.inboxListData();
              this.getAllsendMessagesListData();
              this.router.navigateByUrl('/pages/network');
            } else if (data.statusMessage && data.statusMessage !== 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: this.message,
                showConfirmButton: true,
                // timer: 2000
              });
              this.message = data.error;
            }
          } catch (error) {
            this.message = error;
            console.log(this.message);
        }
      } else {
        this.router.navigateByUrl('/pages/network');
      }
      });

  }

  async deletePopupSender(value: number) {
    console.log(value);
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Are you sure you want to delete?',
      showConfirmButton: true,
      showCancelButton: true,
      // timer: 2000
    }).then( async (res) => {
      if (res.value) {
        const req = {
          "messageId": value,
          "senderId": this.userID
      };
        try {
          this.imageLoader = true;
          const data = await this.apiService.delete('message/delete-message', req);
          const resonseData  = data;
          console.log(resonseData);
          this.imageLoader = false;
          this.message = data.statusMessage;
          if (data.statusMessage && data.statusMessage === 'Success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Delete message successfully!',
              showConfirmButton: false,
              timer: 2000
            });
            this.replyMessage = {};
            this.inboxListData();
            this.getAllsendMessagesListData();
            this.router.navigateByUrl('/pages/network');
          } else if (data.statusMessage && data.statusMessage !== 'Success') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: this.message,
              showConfirmButton: true,
              // timer: 2000
            });
            this.message = data.error;
          }
        } catch (error) {
          this.message = error;
          console.log(this.message);
      }
    } else {
      this.router.navigateByUrl('/pages/network');
    }
    });

}

  public textChange(event) {
    // let filter = new Filter(this.badWords);
    // console.log("filter", filter);
    let newBadWords = this.badWords;
    filter.addWords(...newBadWords);

    if (event && event.target.value) {
    this.networkForm.controls['body'].setValue(filter.clean(event.target.value));
    }
  }

  public textChangeSub(event) {
    let newBadWordsSub = this.badWordsSub;
    filter.addWords(...newBadWordsSub);

    if (event && event.target.value) {
    this.networkForm.controls['subject'].setValue(filter.clean(event.target.value));
    }
  }


  public textChangeReply(event) {
    let newBadWordsReply = this.badWordsReply;
    filter.addWords(...newBadWordsReply);

    if (event && event.target.value) {
    this.replyMessage.body = (filter.clean(event.target.value));
    }
  }

  public textChangeReplySub(event) {
    let newBadWordsSubReply = this.badWordsSubReply;
    filter.addWords(...newBadWordsSubReply);

    if (event && event.target.value) {
    this.replyMessage.subject = (filter.clean(event.target.value));
    }
  }

  public showDetail(index: number, replyMode?: boolean, value?: any) {
    this.detailModeOn = true;
    console.log(value);
    this.replyObj = value;
    this.currIndex = index;
    replyMode ? this.replyModeOn = true : this.replyModeOn = false;
  }

  public hideDetail() {
    this.detailModeOn = false;
    this.replyModeOn = false;
  }

  async sendReplyMessage() {
    this.sendBtnDisabledReply = true;
    if(!this.replyMessage.subject && !this.replyMessage.body) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Incomplete information.  Please enter Subject and Message contents.',
        showConfirmButton: true,
        // timer: 2000
      });
      this.sendBtnDisabledReply = false;
    } else {
          // tslint:disable-next-line:max-line-length
    if (this.replyMessage && !this.replyMessage.group && !this.replyMessage.allMembers  && !this.replyMessage.happily) {
      if (this.replyMessage.senderId || this.replyMessage.senderId == null) {
        delete this.replyMessage.senderId;
      }
      if (!this.replyMessage.group) {
        delete this.replyMessage.group;
      }
      if (!this.replyMessage.username) {
        delete this.replyMessage.username;
      }
      if (!this.replyMessage.happily) {
        this.replyMessage.happily = false;
      }
      if (!this.replyMessage.allMembers) {
        this.replyMessage.allMembers = false;
      }
      if (!this.replyMessage.serviceProviderEmail) {
        this.replyMessage.serviceProviderEmail = null;
      }
      if (!this.replyMessage.productUrl) {
        this.replyMessage.productUrl = null;
      }
      if (!this.replyMessage.technicalSupport) {
        this.replyMessage.technicalSupport = false;
      }
      // this.replyMessage.replyToMessageId = this.replyObj.id;
      this.replyMessage.username = [this.replyObj.from];
      let req = {
      sender: { id: this.userID}
    };
      req = Object.assign(req, this.replyMessage);
      try {
      this.imageLoader = true;
      const data = await this.apiService.post('message/send-message', req );
      this.imageLoader = false;
      const resonseData  = data.results;
      this.message = data.statusMessage;
      if (data.statusMessage && data.statusMessage === 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Send Message Successfully!',
          showConfirmButton: false,
          timer: 2000
        });
        this.replyMessage = {};
        this.inboxListData();
        location.reload();
        this.router.navigateByUrl('/pages/network');
      } else if (data.statusMessage && data.statusMessage !== 'Success') {
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
            icon: 'error',
            title: this.message,
            showConfirmButton: true,
            // timer: 2000
          });
        }

        this.message = data.error;
        this.sendBtnDisabledReply = false;
      }
    } catch (error) {
      this.message = error;
      console.log(this.message);
    }
  }
    }

    // this.router.navigateByUrl('/pages/network');
  }
  get networkFormControl() {
    return this.networkForm.controls;
  }
  async onSubmit() {
    this.sendBtnDisabled = true;
    this.submitted = true;
    // tslint:disable-next-line:max-line-length
    if (this.networkForm.value.happily != '' || this.networkForm.value.allMembers != '' ) {
          if (this.networkForm.valid) {
  
        if (!this.networkForm.value.happily) {
          this.networkForm.value.happily = false;
        } else {
          if ((this.userName == "HAPPILY") && (this.networkForm.value.happily == true)) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'You can not send message to yourself. Please select different username',
              showConfirmButton: true,
              // timer: 2000
            });
          }
        }
        if (!this.networkForm.value.allMembers) {
          this.networkForm.value.allMembers = false;
        }

        if (!this.userNameExist) {
          try {
            this.imageLoader = true;
            let req = {
              sender: { id: this.userID}, technicalSupport: false
            };
            req = Object.assign(req, this.networkForm.value);
            const data = await this.apiService.post('message/send-message', req);
            this.imageLoader = false;
            const resonseData  = data.results;
            this.message = data.statusMessage;
            if (data.statusMessage && data.statusMessage === 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Send Message Successfully!',
                showConfirmButton: false,
                timer: 2000
              });
              this.networkForm.reset();
              this.getAllsendMessagesListData();
              location.reload();
              this.router.navigateByUrl('/pages/network');
            } else if (data.statusMessage && data.statusMessage !== 'Success') {
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
                  icon: 'error',
                  title: this.message,
                  showConfirmButton: true,
                  // timer: 2000
                });
              }
              this.message = data.error;
              this.sendBtnDisabled = false;
            }
          } catch (error) {
            this.message = error;
            console.log(this.message);
          }
        }
    } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          // tslint:disable-next-line:max-line-length
          title: 'Incorrect or incomplete information.',
          showConfirmButton: true,
          // timer: 2000
        });
        this.sendBtnDisabled = false;
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        // tslint:disable-next-line:max-line-length
        title: 'Please select atleast one receiver',
        showConfirmButton: true,
        // timer: 2000
      });
      this.sendBtnDisabled = false;
    }
  }

}

