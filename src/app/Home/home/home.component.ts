import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule,CommonModule,CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private seller: SellerService,private router : Router ) {}
  products:any;
  delmsg:any;
cartlength : any;
carousel:any;

  ngOnInit(): void {
    this.getcaroul()
    this.getprod();
    this.seller.cartLength$.subscribe((length) => {
      this.cartlength = length;
    });
   
  }
  details(id:any){
    console.warn("deatails called");

    this.router.navigate([`product-details/${id}`])
  }
  addtocart(product:any){
    console.warn("add to cart called");
    this.seller.addtocart(product).subscribe((res)=>{
      console.warn("product added");
      this.seller.updateCartLength(this.cartlength + 1);
      
    })
  }
  getcaroul(){
    this.seller.getslider().subscribe((res)=>{
      console.warn("carourl",res);
      this.carousel = res;
    });
    

  }
  getprod(){
    this.seller.getproductshome().subscribe((res)=>{
      console.warn("products",res);
      this.products = res;
    });
}
}
