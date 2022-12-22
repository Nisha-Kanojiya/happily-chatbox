import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss']
})
export class WelcomeUserComponent implements OnInit {
userName: string;
userLogin: boolean = false;
userID: number;
public imageLoader:boolean = false;
  constructor(private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    try {
      if (localStorage.getItem('happily_user')) {
        this.userName = JSON.parse(localStorage.getItem('happily_user')).username;
      //  this.pinID = JSON.parse(localStorage.getItem('happily_user')).user.pinCode;
      this.userID = JSON.parse(localStorage.getItem('happily_user')).userId;
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async userCheck() {
  if (this.userLogin) {
    try {
      this.imageLoader = true;
      const data = await this.apiService.get('get-details-by-username/'  + this.userName);
      if (data.statusCode && data.statusCode === 'HP211') {
        this.imageLoader = false;
        const getInfoData = data.statusMessage;
        if (getInfoData === 'UserDetails Not Exist') {
          this.router.navigateByUrl('/privacy-protected-test');
        } else {
          this.router.navigateByUrl('/userinfo');
        }
      } else {
        this.imageLoader = false;
        this.router.navigateByUrl('/userinfo');
      }
    } catch (error) {
      console.log(error.error);
    }
 }
}

async resultExist() {
  if (this.userLogin) {
    try {
      this.imageLoader = true;
      const data = await this.apiService.get('get-happiness-index/'  + this.userID);
      this.imageLoader = false;
      if (data.statusMessage && data.statusMessage === 'Success') {
        this.router.navigateByUrl('/result');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.statusMessage,
          showConfirmButton: true,
          // timer: 2000
        });
        this.router.navigateByUrl('/privacy-protected-test');
      }
    } catch (error) {
      console.log(error.error);
    }
 }
}

}
