import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsService } from '../../services/form-service';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-pin-set',
  templateUrl: './pin-set.component.html',
  styleUrls: ['./pin-set.component.scss']
})
export class PinComponent implements OnInit {
  pinAddressForm: FormGroup;
  ipAddress: string;
  sessionWithoutLoginPin: any;
  constructor(private router: Router,
              public formService: FormsService,
              private formBuilder: FormBuilder,
              private apiService: ApiService,

              private toastrService: ToasterService) { }

  ngOnInit() {
    this.pinAddressForm = this.formBuilder.group({
      pinCode: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  async onSubmit() {
    let message = '';
    try {
      let data = await this.apiService.post('user/username-pincode', this.pinAddressForm.value);
      const pinObj = data.results;
      message = data.statusMessage;
      if (message && message === 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pincode Set Successfully!',
          showConfirmButton: false,
          timer: 2000
        });
        // this.toastrService.success(message, 'Successfully login with pincode');
        localStorage.setItem('WithoutLoginPin', JSON.stringify(pinObj));
        this.router.navigateByUrl('/privacy-protected-test');
      } else if (message && message !== 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 2000
        });
        // this.toastrService.error('error', message);
        message = data.error;
        this.pinAddressForm.reset();
      }

    } catch (error) {
      message = error.error;
      console.log(message);
    }
  }


  async checkUser() {
    try {
      this.sessionWithoutLoginPin = localStorage.getItem('withOutLoginPin');
      localStorage.removeItem('withOutLoginPin');
      this.router.navigateByUrl('/privacy-protected-test');
      } catch (error) {
      console.log(error.error);
    }
  }
}


