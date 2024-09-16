import { Component } from '@angular/core';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private seller: SellerService,private router : Router) {}
  products:any;
  delmsg:any;
  cartlength:any;

  ngOnInit(): void {
    this.getprod();
   
  }
  delete(id:any){
    this.seller.delcart(id).subscribe((res)=>{
      if(res){
this.delmsg = "product removed successfully";
this.getprod();
setTimeout(() => (this.delmsg = undefined), 3000);
      }
    })

  }
  gotohome(){
    this.router.navigate(['']);
   }
  

  getprod(){
    this.seller.getcart().subscribe((res)=>{
      console.warn("products",res);
      this.products = res;
      this.cartlength = this.products.length;
      this.seller.updateCartLength(this.cartlength); 
    });

  }
  buy(product:any){
    console.warn("add to cart called");
    this.seller.addtobuy(product).subscribe((res)=>{
      console.warn("product added");
      
    })

  }
 


}
