import { Component } from '@angular/core';
import { Product } from '../datatype';
import { SellerService } from '../sellerservice/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent {

  constructor(private route: ActivatedRoute,private seller: SellerService,private router : Router) {}

  searchQuery: string  = '';  // Variable to hold search input
  cartlength: any;
  searchResults: any[] = [];
  
  ngOnInit(): void {
    const queryParam = this.route.snapshot.paramMap.get('query');
    if (queryParam !== null) {
      this.searchQuery = queryParam;
    } else {
      this.router.navigate(['']);  // Navigate away if query is null
    }
  
    console.log("query search:", this.searchQuery);
    this.seller.searchprod(this.searchQuery).subscribe((res: Product[]) => {
      this.searchResults = res.filter((product: Product) => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      console.log('Filtered Search Results:', this.searchResults);
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
  
}
