import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../sellerservice/seller.service';
import { Product } from '../datatype';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent {

  constructor(private seller: SellerService,private router : Router) {}
  products:any;
  delmsg:any;
  
  totalcost : number = 0;
  discount : number  = 0;
  finalAmount : number = 0;

  ngOnInit(): void {
    this.getprod();
    this.calculateFinalAmount();
   
  }
  delete(id:any){
    this.seller.delbuy(id).subscribe((res)=>{
      if(res){
this.delmsg = "product removed successfully";
this.getprod();
this.calculateFinalAmount();
setTimeout(() => (this.delmsg = undefined), 3000);
      }
    })

  }

  getprod(){
    this.seller.getbuy().subscribe((res)=>{
      console.warn("products",res);
      this.products = res;
      this.totalcost = this.getcost();
      this.calculateFinalAmount();
    });
    
   

  }
 gotohome(){
  this.router.navigate(['']);
 }
 getcost(): number {
  let totalCost = 0;
  console.warn("entered");

  this.products.forEach((product: any) => {
    let price = parseFloat(product.price); // Convert price from string to number
    if (!isNaN(price)) {
      console.warn(price);
      totalCost += price; // Add the price to totalCost
    } else {
      console.warn("Invalid price:", product.price); // Handle invalid price
    }
  });

  console.warn("Total cost:", totalCost);
  return totalCost;
}


 
    // Example discount
 deliveryCharge = 50; // Example delivery charge
 

 

 calculateFinalAmount() {
   // Example total cost
 const discount = 0.01*this.totalcost;
   const tax = this.totalcost * 0.1; // 10% tax
   this.finalAmount = this.totalcost + tax - discount + this.deliveryCharge;
 }

 submitOrder(formData: any) {
  // Gather products details
  const productDetails = this.products.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      discription: product.discription,
      url: product.url,
      category: product.category,

    };
  });

  // Gather user and payment details from the form
  const userAndPaymentDetails = {
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    pickupTime: formData.pickupTime,
    orderDay: formData.orderDay,
    paymentMethod: formData.paymentMethod,
  };

  // Bill details
  const billDetails = {
    totalCost: this.totalcost,
    tax: this.totalcost * 0.1,
    discount: this.totalcost * 0.01,
    deliveryCharge: this.deliveryCharge,
    finalAmount: this.finalAmount,
  };

  // Combine all into a final order object
  const finalOrderObject = {
    products: productDetails,
    userDetails: userAndPaymentDetails,
    billDetails: billDetails
  };

  // Log the final object for debugging purposes
  console.log("Final Order Object:", finalOrderObject);

  // Send the final order object to the API
  this.seller.orderdetails(finalOrderObject).subscribe((res: any) => {
    if (res) {
      alert("Order placed successfully!");
      this.router.navigate(['']);
    } else {
      alert("Something went wrong, try again!");
    }
  });
}


 

}



