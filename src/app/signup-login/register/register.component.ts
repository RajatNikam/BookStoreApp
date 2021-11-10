import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // for password show/hide 
  hide = true;
  // form validations
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      service: "advance",
    });
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;

    console.log("calling api here ", this.registerForm.value);

    let payload = {
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      service: this.registerForm.value.service
    }
    this.userService.registrationService(payload).subscribe((response: any) => {
      console.log("response", response);
      console.log("name", response.result.fullName, response.result._id);

      localStorage.setItem('fullName', response.result.fullName);
      localStorage.setItem('email', response.result.email);
      localStorage.setItem('phoneNumber', response.result.phone);
      localStorage.setItem('password', response.result.password);

    });


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("ErroR");
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }



}
