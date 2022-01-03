import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio'; 
import { RatingModule } from 'ng-starrating';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout/flex';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core'; 
import {MatBadgeModule} from '@angular/material/badge'; 

import { SignupComponent } from './signup-login/signup/signup.component';
import { LoginComponent } from './signup-login/login/login.component';
import { RegisterComponent } from './signup-login/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetAllBooksComponent } from './get-all-books/get-all-books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';

import { AuthguardService } from './services/AuthGuardService/authguard.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderplacedComponent } from './orderplaced/orderplaced.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterPipe } from './Pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    GetAllBooksComponent,
    BookDetailsComponent,
    CartComponent,
    WishlistComponent,
    OrderplacedComponent,
    ProfileComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatOptionModule,
    MatBadgeModule,
    MatRadioModule,
    RatingModule
  ],
  providers: [ 
    AuthguardService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
