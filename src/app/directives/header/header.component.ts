import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {CustomvalidationService} from '../../services/custom-validation.service';
import { ApiService } from '../../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  flagLogout = false;
  storeLoginData: any;
  userId: number;
  constructor(private router: Router,
              private customvalidationService: CustomvalidationService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.customvalidationService.getLoginStatus().subscribe((data) => {
      this.flagLogout = data;
    });
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.userId = JSON.parse(localStorage.getItem('happily_user')).userId;
        this.flagLogout = true;
      }
    } catch (error) {
      console.log(error);
    }

    $('.toggle-btn').click(function() {
      $('.menuSec').slideToggle();
    });
  }
  
  
  
  logout() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Are you sure you want to Logout!',
      showConfirmButton: true,
      showCancelButton: true,
      // timer: 2000
    }).then((res) => {

      if (res.value) {
        try {
          this.storeLoginData = localStorage.getItem('happily_user');
          this.logoutData();
          localStorage.removeItem('tempUserDetails');
          localStorage.removeItem('temp_pinCode');
          localStorage.removeItem('user_pin');
          localStorage.removeItem('happily_user');
          this.flagLogout = false;
          this.router.navigate(['/login']);
    } catch (error) {
    }
    } else {

      }
    });
  }
  supportPopup() {
    if (this.flagLogout) {
      this.router.navigateByUrl('/pages/support');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Available only to members. Please sign up, or login if you are a member.',
        showConfirmButton: true,
        // timer: 2000
      });
    }
  }
  async logoutData() {
    try {
      const groupData = await this.apiService.post('user/logout', {});
      if (groupData.statusMessage && groupData.statusMessage === 'Success') {
        const Response = groupData.results;
      }
    } catch (error) {
      console.log(error.error);
    }
  }
}








