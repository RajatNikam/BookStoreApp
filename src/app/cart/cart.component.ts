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
  step1: any;
  step1button: boolean = true;
  step2: any;
  step2button: boolean = true;
  fullname: any;
  mobilenumber: any;
  address: any;
  disabled: boolean = true;

  orderlist: any = [];

  formdata: any;

  alladdress: any;
  addressType: any;
  selectedaddress: any;
  public userDetails!: FormGroup;

  constructor(private bookservice: BooksService, private routes: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cartitemslist()

    // this.userDetails = this.formBuilder.group({
    //   fullName: new FormControl(),
    //   phone: new FormControl(),
    //   fullAddress: new FormControl(),
    //   city: new FormControl(),
    //   state: new FormControl(),
    //   addressType: new FormControl(),
    // })
  }

  // cartitemslist() {
  //   this.bookservice.getCartItems().subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this.cartitems = response.result;
  //       this.count = response.result.length;
  //       console.log('res', this.cartitems);
  //       this.fullname = this.cartitems[0].user_id.fullName;
  //       this.mobilenumber = this.cartitems[0].user_id.phone;
  //     },
  //     (error) => console.log(error)
  //   )
  // }

  cartitemslist() {
    this.bookservice.getCartItems().subscribe(
      (response: any) => {
        console.log(response);
        this.cartitems = response.result;
        this.count = response.result.length;
        console.log(this.cartitems);
        this.fullname = this.cartitems[0].user_id.fullName;
        this.mobilenumber = this.cartitems[0].user_id.phone;
        this.address = this.cartitems[0].user_id.address;
        this.addressdata();
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

  setStep(index: any) {
    if (index == 1) {
      this.step1 = true;
      this.step1button = false;
    }
    else if (index == 2) {
      this.step2 = true;
      this.step2button = false;
    }
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