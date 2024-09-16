import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../sellerservice/seller.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']  // Corrected to 'styleUrls'
})
export class ProductUpdateComponent implements OnInit {
  productId: string | null = null;
  product:any;

  constructor(private route: ActivatedRoute,private seller: SellerService,private router : Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log("Product ID:", this.productId);
    this.seller.getupdate(this.productId).subscribe((res:any)=>{
      console.warn("product",res[0]);
      this.product = res[0];
      console.warn(this.product.name);
      // this.product = JSON.stringify(this.product);
      // console.warn(this.product)
    })




  }

  update(data:any){
    console.warn("data",data);
    data  = JSON.stringify(data);
    console.warn(data);
    this.seller.updateproduct(data,this.productId).subscribe((res)=>{
      if(res){
        this.router.navigate(['seller-home']);
      }
    })
  }
}
