import { Component } from '@angular/core';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  constructor(private seller: SellerService,private router : Router) {}
  products:any;
  delmsg:any;

  ngOnInit(): void {
    this.getprod();
   
  }
  delete(id:any){
    this.seller.delproduct(id).subscribe((res)=>{
      if(res){
this.delmsg = "product deleted";
this.getprod();
setTimeout(() => (this.delmsg = undefined), 3000);
      }
    })

  }

  getprod(){
    this.seller.getproducts().subscribe((res)=>{
      console.warn("products",res);
      this.products = res;
    });

  }
  update(id:any){
    this.router.navigate([`update-product/${id}`])


  }



}
