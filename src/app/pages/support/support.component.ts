import {
  Component,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import Swal from "sweetalert2";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.scss"],
})
export class SupportComponent implements OnInit {
  public currIndex: number = -1;
  public detailModeOn: boolean = false;
  public replyModeOn: boolean = false;
  submitted: boolean = false;
  inboxShowflag: boolean = false;
  sentMessageShowflag: boolean = false;
  public imageLoader: boolean = false;
  inboxResponse: any;
  userID: number;
  message: string;
  statusMessage: string;
  sendBtnDisabled = false;
  sendBtnDisabledReply = false;
  getAllsendMessagesResponse: any;
  technicalForm: FormGroup;
  replyMessage: any = {};
  replyObj: any = {};
  userName: string;
  composeBtn = false;
  remainCharcter: string;
  remainCharacterSubject: string;
  replyCharacter: string;
  replyCharacterCount: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    try {
      if (localStorage.getItem("happily_user")) {
        this.userID = JSON.parse(localStorage.getItem("happily_user")).userId;
        this.userName = JSON.parse(
          localStorage.getItem("happily_user")
        ).user.username;
        if (this.userName == "tchsupportcis") {
          this.composeBtn = true;
        }
        console.log(this.userName);
      }
    } catch (error) {
      console.log(error);
    }
    this.technicalForm = this.formBuilder.group({
      subject: ["", Validators.required],
      body: ["", Validators.required],
    });

    this.inboxTechnicalListData();
    this.getAllsendTechnicalMessagesListData();
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

  public showDetail(index: number, replyMode?: boolean, value?: any) {
    this.detailModeOn = true;
    this.replyObj = value;
    this.currIndex = index;
    replyMode ? (this.replyModeOn = true) : (this.replyModeOn = false);
  }

  public hideDetail() {
    this.detailModeOn = false;
    this.replyModeOn = false;
  }

  async inboxTechnicalListData() {
    try {
      this.imageLoader = true;
      const inboxData = await this.apiService.get(
        "message/inbox/" + this.userID + "/" + true
      );
      this.imageLoader = false;
      if (inboxData.statusMessage && inboxData.statusMessage === "Success") {
        this.inboxResponse = inboxData.results;
        if (this.inboxResponse == null || this.inboxResponse.length == 0) {
          this.inboxShowflag = true;
          this.statusMessage = "No conversation message";
        }
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  async getAllsendTechnicalMessagesListData() {
    try {
      this.imageLoader = true;
      const getAllsendMessagesData = await this.apiService.get(
        "message/get-all-send-message/" + this.userID + "/" + true
      );
      this.imageLoader = false;
      if (
        getAllsendMessagesData.statusMessage &&
        getAllsendMessagesData.statusMessage === "Success"
      ) {
        this.getAllsendMessagesResponse = getAllsendMessagesData.results;
        if (
          this.getAllsendMessagesResponse == null ||
          this.getAllsendMessagesResponse.length == 0
        ) {
          this.sentMessageShowflag = true;
          this.statusMessage = "No conversation message";
        }
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  async deletePopupInbox(value: number) {
    console.log(value);
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Are you sure you want to delete?",
      showConfirmButton: true,
      showCancelButton: true,
      // timer: 2000
    }).then(async (res) => {
      if (res.value) {
        const req = {
          messageId: value,
          receiverId: this.userID,
        };
        try {
          this.imageLoader = true;
          const data = await this.apiService.delete(
            "message/delete-message",
            req
          );
          const resonseData = data;
          console.log(resonseData);
          this.imageLoader = false;
          this.message = data.statusMessage;
          if (data.statusMessage && data.statusMessage === "Success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Delete message successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
            this.replyMessage = {};
            this.inboxTechnicalListData();
            this.getAllsendTechnicalMessagesListData();
            this.router.navigateByUrl("/pages/support");
          } else if (data.statusMessage && data.statusMessage !== "Success") {
            Swal.fire({
              position: "center",
              icon: "error",
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
        this.router.navigateByUrl("/pages/support");
      }
    });
  }

  async deletePopupSender(value: number) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Are you sure you want to delete?",
      showConfirmButton: true,
      showCancelButton: true,
      // timer: 2000
    }).then(async (res) => {
      if (res.value) {
        const req = {
          messageId: value,
          senderId: this.userID,
        };
        try {
          this.imageLoader = true;
          const data = await this.apiService.delete(
            "message/delete-message",
            req
          );
          const resonseData = data;
          console.log(resonseData);
          this.imageLoader = false;
          this.message = data.statusMessage;
          if (data.statusMessage && data.statusMessage === "Success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Delete message successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
            this.replyMessage = {};
            this.inboxTechnicalListData();
            this.getAllsendTechnicalMessagesListData();
            this.router.navigateByUrl("/pages/support");
          } else if (data.statusMessage && data.statusMessage !== "Success") {
            Swal.fire({
              position: "center",
              icon: "error",
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
        this.router.navigateByUrl("/pages/support");
      }
    });
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

      if (
        this.replyMessage &&
        !this.replyMessage.group &&
        !this.replyMessage.allMembers &&
        !this.replyMessage.happily
      ) {
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
          this.replyMessage.technicalSupport = true;
        }
        // this.replyMessage.replyToMessageId = this.replyObj.id;
        this.replyMessage.username = [this.replyObj.from];
        let req = {
          sender: { id: this.userID },
        };
        req = Object.assign(req, this.replyMessage);
        try {
          this.imageLoader = true;
          const data = await this.apiService.post("message/send-message", req);
          this.imageLoader = false;
          const resonseData = data.results;
          this.message = data.statusMessage;
          if (data.statusMessage && data.statusMessage === "Success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Send Message Successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
            this.replyMessage = {};
            this.inboxTechnicalListData();
            location.reload();
            this.router.navigateByUrl("/pages/support");
          } else if (data.statusMessage && data.statusMessage !== "Success") {
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
                position: "center",
                icon: "error",
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
   
  }

  get technicalFormControl() {
    return this.technicalForm.controls;
  }

  async onSubmit() {
    this.sendBtnDisabled = true;
    this.submitted = true;
    if (this.technicalForm.valid) {
      this.technicalForm.value.happily = false;
      this.technicalForm.value.allMembers = false;
      this.technicalForm.value.replyToMessageId = null;
      this.technicalForm.value.productUrl = null;
      this.technicalForm.value.serviceProviderEmail = null;
      this.technicalForm.value.technicalSupport = true;
      try {
        this.imageLoader = true;
        let req = {
          sender: { id: this.userID },
        };
        req = Object.assign(req, this.technicalForm.value);
        const data = await this.apiService.post("message/send-message", req);
        this.imageLoader = false;
        const resonseData = data.results;
        this.message = data.statusMessage;
        if (data.statusMessage && data.statusMessage === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Send Message Successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.technicalForm.reset();
          location.reload();
          this.getAllsendTechnicalMessagesListData();
          this.router.navigateByUrl("/pages/support");
        } else if (data.statusMessage && data.statusMessage !== "Success") {
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
              position: "center",
              icon: "error",
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
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        // tslint:disable-next-line:max-line-length
        title: "Incorrect or incomplete information.",
        showConfirmButton: true,
        // timer: 2000
      });
      this.sendBtnDisabled = false;
    }
  }
}
