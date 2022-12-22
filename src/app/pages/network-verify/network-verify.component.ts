import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../../services/form-service';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-network-verify',
  templateUrl: './network-verify.component.html',
  styleUrls: ['./network-verify.component.scss']
})
export class NetworkVerifyComponent implements OnInit {

  storeLoginData: string;
  networkForm: FormGroup;
  userLogin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }


  }

  supportPopup() {
    if (this.storeLoginData) {
      this.router.navigateByUrl('/pages/network');
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


}

