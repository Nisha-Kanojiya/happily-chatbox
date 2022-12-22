import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  storeLoginData: any;
  userLogin: boolean = false;
  userName: string;
  readMore: boolean = false;
  constructor(private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.userName = JSON.parse(localStorage.getItem('happily_user')).username;
        console.log(this.userName );
        
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  trigger() {
    this.readMore = !this.readMore;
    console.log(this.readMore);
  }

}
