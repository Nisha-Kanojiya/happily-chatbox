import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-solutions-list',
  templateUrl: './solutions-list.component.html',
  styleUrls: ['./solutions-list.component.scss']
})
export class SolutionsListComponent implements OnInit {

  searchText: any;
  userLogin: any;
  userID: number;
  solutionResponse: any;
  productResponse: any;
  public productId: number;
  listShowflag: boolean = false;
  detailShowflag: boolean = false;
  public imageLoader:boolean = false;
  statusMessage: string;

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {
    this.productId = this.route.snapshot.params['id'];
   }

  public ngOnInit() {
    try {
      if (localStorage.getItem('happily_user')) {
        this.userID = JSON.parse(localStorage.getItem('happily_user')).user.pinCode;
        this.userLogin = true;
      }
    } catch (error) {
      console.log(error);
    }
    this.solutionListData();

  }

  async solutionListData() {
    try {
      this.imageLoader = true;
      const solutionData = await this.apiService.get('product/get-product-by-category-id/' + this.productId);
      this.imageLoader = false;
      if (solutionData.statusMessage && solutionData.statusMessage === 'Success') {
        const respose = solutionData.results;
        if (respose == '' || respose.length == 0) {
          this.listShowflag = true;
          this.statusMessage = 'No product found';
        }
        this.solutionResponse = respose[0].products;
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  async showDetail(item: any) {
    this.productResponse = item;
        // tslint:disable-next-line:align
        if (this.productResponse == '' || this.productResponse.length == 0) {
          this.detailShowflag = true;
          this.statusMessage = 'No product deatils found';
        }
    // this.currIndex = index;
    // this.router.navigateByUrl('/pages/solutions-list');
    // try {
    //   const productData = await this.apiService.get('product/get-reivew-by-product-id/' + value);
    //   if (productData.statusMessage && productData.statusMessage === 'Success') {
    //     const respose = productData.results;
    //     this.productResponse = respose[0];
    //     console.log(this.productResponse);
    //     if (respose == '' || respose.length == 0) {
    //       this.detailShowflag = true;
    //       this.statusMessage = 'No product deatils found';
    //     }
    //   }
    // } catch (error) {
    //   console.log(error.error);
    // }
  }

}
