import { Component } from '@angular/core';
import { Product } from '../datatype';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../sellerservice/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-seller.component.html',
  styleUrl: './search-seller.component.css'
})
export class SearchSellerComponent {
  constructor(private route: ActivatedRoute,private seller: SellerService,private router : Router) {}

  searchQuery: string  = '';  // Variable to hold search input
  cartlength: any;
  searchResults: any[] = [];
  products:any;
  delmsg:any;


  ngOnInit(): void {
    const queryParam = this.route.snapshot.paramMap.get('query');
    if (queryParam !== null) {
      this.searchQuery = queryParam;
    } else {
      this.router.navigate(['seller-home']);  // Navigate away if query is null
    }
  
    console.log("query search:", this.searchQuery);
    this.seller.searchprod(this.searchQuery).subscribe((res: Product[]) => {
      this.searchResults = res.filter((product: Product) => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      console.log('Filtered Search Results:', this.searchResults);
      this.products = this.searchResults;
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
