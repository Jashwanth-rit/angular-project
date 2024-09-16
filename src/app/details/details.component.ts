import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../sellerservice/seller.service';
import { CommonModule } from '@angular/common';
import { Product } from '../datatype';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  productId: string | null = null;
  product:any;
  searchQuery: string  = '';  // Variable to hold search input
  cartlength: any;
  searchResults: any[] = [];


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
this.searchQuery = this.product.name;
      console.log("query search:", this.searchQuery);
      this.seller.searchprod(this.searchQuery).subscribe((res: Product[]) => {
        this.searchResults = res.filter((product: Product) => 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        
        console.log('Filtered Search Results:', this.searchResults);
      });
    })


}

buy(product:any){
  console.warn("add to cart called");
  this.seller.addtobuy(product).subscribe((res)=>{
    console.warn("product added");
    
  })

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


goBack(){
  this.router.navigate(['']);
}
}
