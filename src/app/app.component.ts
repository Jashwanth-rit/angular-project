import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SellerComponent } from './Seller/seller/seller.component';
import { HomeComponent } from './Home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SellerService } from './sellerservice/seller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SellerComponent,
    HomeComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    // Ensure HttpClientModule is imported here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix from styleUrl to styleUrls
})
export class AppComponent {

  
  title = 'angular-project';
}
