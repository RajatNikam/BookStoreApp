import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup-login/signup/signup.component';
import { LoginComponent } from './signup-login/login/login.component';
import { RegisterComponent } from './signup-login/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetAllBooksComponent } from './get-all-books/get-all-books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardGuard } from './AuthGuard/auth-guard.guard';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: "", component: SignupComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }