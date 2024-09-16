import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { login, Product, SignUp } from '../datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false); 
  isUserLoggedIn = new BehaviorSubject<boolean>(false); 
  issellerLoginError = new EventEmitter<boolean>(false);
  isuserLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  private cartLengthSubject = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLengthSubject.asObservable();

  updateCartLength(length: number): void {
    this.cartLengthSubject.next(length);
  }

  sellerSignUp(data: SignUp): void {
    console.warn("Service called");
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        localStorage.setItem("seller", JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
        console.warn(res);
      });
  }
  userSignUp(data: SignUp): void {
    console.warn("Service called");
    this.http.post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((res) => {
        localStorage.setItem("user", JSON.stringify(res.body));
        this.router.navigate(['']);
        console.warn(res);
      });
  }

  addProduct(data: any): Observable<any> {
    console.warn("Service called");
    return this.http.post('http://localhost:3000/products', data, { observe: 'response' });
  }

  sellerLogin(data: login): void {
    console.warn("Service called");
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          localStorage.setItem("seller", JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
          console.warn(res);
        } else {
          alert("Login failed, incorrect email or password.");
          this.issellerLoginError.emit(true);
        }
      });
  }
  userLogin(data: login): void {
    console.warn("Service called");
    this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          localStorage.setItem("user", JSON.stringify(res.body));
          this.router.navigate(['']);
          console.warn(res);
        } else {
          alert("Login failed, incorrect email or password.");
          this.isuserLoginError.emit(true);
        }
      });
  }

  getproducts(){
    return this.http.get('http://localhost:3000/products');
  }
  getbuy(){
    return this.http.get('http://localhost:3000/buy');
  }

  searchprod(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }
  getcart(){
    return this.http.get('http://localhost:3000/cart');
  }
  getproductshome(){

    return this.http.get(`http://localhost:3000/products`);
    // return this.http.get(`http://localhost:3000/carousel?_limit=4`);
  }
  getorders(){

    return this.http.get(`http://localhost:3000/order`);
    // return this.http.get(`http://localhost:3000/carousel?_limit=4`);
  }
  getslider(){
    return this.http.get(`http://localhost:3000/carousel?_limit=4`);
  }
  delproduct(data:any){
    return this.http.delete(`http://localhost:3000/products/${data}`)
  }
  delcart(data:any){
    return this.http.delete(`http://localhost:3000/cart/${data}`)
  }
  delorders(data:any){
    return this.http.delete(`http://localhost:3000/order/${data}`)
  }
  delbuy(data:any){
    return this.http.delete(`http://localhost:3000/buy/${data}`)
  }
  getupdate(id:any){
    return this.http.get(`http://localhost:3000/products?id=${id}`)

  }
  addtocart(product:any){
    return this.http.post('http://localhost:3000/cart', product);
  }
  addtobuy(product:any){
    return this.http.post('http://localhost:3000/buy', product);
  }
  orderdetails(product:any){
    return this.http.post('http://localhost:3000/order', product);
  }

  updateproduct(data:any,id:any){

return this.http.put(`http://localhost:3000/products/${id}`,data);
  }

  reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
    else{
      this.router.navigate(['seller']);
    }
  }
  reloaduser(): void {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['']);
    }
    else{
      this.router.navigate(['user-login']);
    }
  }
}
