import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      service: "advance",
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("calling api here ", this.registerForm.value);

    let payload = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      service: this.registerForm.value.service
    }
    this.userService.loginService(payload).subscribe((response: any) => {
      console.log("response", response);
      localStorage.setItem('token', response.id)
      console.log('token', response.id);
      
    });

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }

}
