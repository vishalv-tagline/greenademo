import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public hide: boolean = true;
  public submited: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    })
  }

  get fControl() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      this.submited = true;
      console.log("Invalid form data.");

      return
    }
    else {
      console.log('this.loginForm.value :>> ', this.loginForm.value);
      this.submited = false;
      this.loginForm.reset();
    }
  }


}
