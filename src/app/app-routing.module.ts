import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './signup-login/login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetAllBooksComponent } from './get-all-books/get-all-books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardGuard } from './AuthGuard/auth-guard.guard';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderplacedComponent } from './orderplaced/orderplaced.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: "", component: LoginPageComponent,
    // children: [
    //   { path: '', redirectTo: 'login', pathMatch: 'full' },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'register', component: SignupComponent }
    // ],
  },

  { path: 'book-details', component: BookDetailsComponent },
  { path: 'get-all-books', component: GetAllBooksComponent },

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard],
    children: [
      { path: '', redirectTo: 'get-all-books', pathMatch: 'full' },
      { path: 'get-all-books', component: GetAllBooksComponent },
      { path: 'book-details', component: BookDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'orderplaced', component: OrderplacedComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }