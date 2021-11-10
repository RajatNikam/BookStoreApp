import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartitems: any;
  count: any;
  ordercount: any;
  fullname: any;
  mobilenumber: any;
  address: any;
  disabled: boolean = true;

  displayButton = true;
  displayaddresss = true;
  displayCheckout = true;
  customerDetailsForm!: FormGroup;

  orderlist: any = [];

  formdata: any;

  alladdress: any;
  addressType: any;
  selectedaddress: any;

  constructor(private bookservice: BooksService, private routes: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cartitemslist()

    this.customerDetailsForm = this.formbuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      fullAddress: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', [Validators.required]],
      state: ['', Validators.required],
      addressType: ['', Validators.required]

    })
  }

  showadderss() {
    this.displayButton = false;
    this.displayaddresss = false;
  }

  cartitemslist() {
    this.bookservice.getCartItems().subscribe(
      (response: any) => {
        console.log(response);
        this.cartitems = response.result;
        this.count = response.result.length;
        console.log(this.cartitems);
        // this.fullname = this.cartitems[0].user_id.fullName;
        // this.mobilenumber = this.cartitems[0].user_id.phone;
        // this.address = this.cartitems[0].user_id.address;
        // this.addressdata();
      },
      (error) => console.log(error)
    )
  }

  addressdata() {
    let formgroupobj: any = [];

    this.address.forEach((item: any) => {
      formgroupobj.push(new FormGroup(
        {
          addressType: new FormControl(item.addressType),
          address: new FormControl({ value: item.fullAddress, disabled: this.disabled }, [Validators.required]),
          city: new FormControl({ value: item.city, disabled: this.disabled }, [Validators.required]),
          state: new FormControl({ value: item.state, disabled: this.disabled }, [Validators.required])
        }))
    });

    console.log(formgroupobj);
    this.alladdress = new FormArray(formgroupobj);
    console.log(this.alladdress);
  }

  updateadress() {
    this.alladdress.controls.forEach((element: any) => {
      console.log(this.addressType);

      if (element.value.addressType == this.addressType) {
        this.selectedaddress = element;
      }
    });
    console.log(this.selectedaddress);

    let payload = {
      "addressType": this.selectedaddress.value.addressType,
      "fullAddress": this.selectedaddress.value.address,
      "city": this.selectedaddress.value.city,
      "state": this.selectedaddress.value.state
    }
    this.bookservice.updateaddress(payload).subscribe(
      (response: any) => {
        console.log(response);
        this.cartitemslist();
      },
      (error) => console.log(error)
    )
  }

  submit() {
    console.log(this.customerDetailsForm.value);
    this.displayCheckout = false;
    let reqData = {
      fullName: this.customerDetailsForm.value.fullName,
      phonenumber: this.customerDetailsForm.value.phoneNumber,
      fullAddress: this.customerDetailsForm.value.fullAddress,
      city: this.customerDetailsForm.value.city,
      state: this.customerDetailsForm.value.state,
      addressType: this.customerDetailsForm.value.addressType,
      service: "advance"
    }
    this.bookservice.customerDetailsService(reqData).subscribe((response: any) => {
      console.log("the api", response);
      localStorage.setItem('fullAddress', this.customerDetailsForm.value.fullAddress);
      localStorage.setItem('city', this.customerDetailsForm.value.city);
      localStorage.setItem('state', this.customerDetailsForm.value.state);
      localStorage.setItem('addressType', this.customerDetailsForm.value.addressType0);

    })

  }


  countincrease(data: any) {
    this.ordercount = data.quantityToBuy;
    this.ordercount += 1
    console.log("increased", this.ordercount);

    this.updateCount(data)
  }

  countdecrease(data: any) {
    this.ordercount = data.quantityToBuy;
    if (this.ordercount > 0) {
      this.ordercount -= 1;
    }
    else {
      return;
    }
    this.updateCount(data)
  }

  updateCount(data: any) {
    let payload = {
      "quantityToBuy": this.ordercount
    }
    console.log("updated", this.ordercount);
    console.log(data._id);

    this.bookservice.updateitemcount(data.product_id._id, payload).subscribe((response) => {
      console.log(response);
    },
      (error) => console.log(error)
    )
    this.cartitemslist()
  }



  removecartitem(data: any) {
    this.bookservice.removecartitem(data._id).subscribe(
      (response) => { console.log(response); this.cartitemslist() },
      (error) => console.log(error)
    )
  }

  checkout() {
    // this.routes.navigateByUrl("/dashboard/orderplaced")
    this.cartitems.forEach((element: any) => {
      this.orderlist.push(
        {
          "product_id": element.product_id._id,
          "product_name": element.product_id.bookName,
          "product_quantity": element.quantityToBuy,
          "product_price": element.product_id.price - element.product_id.discountPrice
        }
      );
    });
    console.log(this.orderlist);


    let payload = {
      "orders": this.orderlist
    }
    this.bookservice.orderplace(payload).subscribe(
      (response) => {
        console.log(response);
        this.routes.navigateByUrl("/dashboard/orderplaced")
      },
      (error) => console.log(error)
    )
  }

  enable() {
    this.disabled = false;
    this.addressdata();
  }


}