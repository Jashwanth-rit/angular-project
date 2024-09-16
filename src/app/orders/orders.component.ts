import { Component } from '@angular/core';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

constructor(private seller: SellerService,private router : Router) {}

orders:any;

ngOnInit(): void {
  this.getorder();
 
}

getorder(){
  this.seller.getorders().subscribe((res)=>{
    this.orders = res;
  })
}
gotohome(){
  this.router.navigate(['']);
 }

cancelOrder(id:any){
  this.seller.delorders(id).subscribe((res)=>{
    if(res){
      this.getorder();
    }
    else{
      alert("unable to cancel");
    }
  })
}
  

}
