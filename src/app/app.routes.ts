import { Routes ,RouterModule} from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { SellerComponent } from './Seller/seller/seller.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerauthGuard } from './seller.auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { userAuthGuard } from './user-auth.guard';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchSellerComponent } from './search-seller/search-seller.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'seller',
        component:SellerComponent
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate:[sellerauthGuard]
    },
    {
        path:'seller-add',
        component:SellerAddProductComponent,
        canActivate:[sellerauthGuard]
    },
    {
        path:'update-product/:id',
        component:ProductUpdateComponent,
        canActivate:[sellerauthGuard]
    },
    {
        path:'product-details/:id',
        component:DetailsComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'cart',
        component:CartComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'search-products/:query',
        component:SearchProductsComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'search-seller/:query',
        component:SearchSellerComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'buy',
        component:BuyProductComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'orders',
        component:OrdersComponent,
        canActivate:[userAuthGuard]
    },
    {
        path:'user-login',
        component:UserLoginComponent,
        
    }

];
