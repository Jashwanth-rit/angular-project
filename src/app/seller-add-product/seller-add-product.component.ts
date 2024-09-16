import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm
import { SellerService } from '../sellerservice/seller.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addprodmsg: string | undefined;

  constructor(private seller: SellerService, private router: Router) {}

  add(data: any, form: NgForm) {  // Accept the form as an argument
    console.warn("Data received:", data);
    this.seller.addProduct(data).subscribe((result: any) => {
      if (result) {
        this.addprodmsg = "Product added successfully";
        console.warn(result);
        form.reset();  // Reset the form fields after successful addition
      }
      setTimeout(() => (this.addprodmsg = undefined), 3000);
    });
  }
}
