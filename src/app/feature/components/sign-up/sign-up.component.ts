import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public businessForm!: FormGroup;
  public representativeForm!: FormGroup;
  public hide: boolean = true;
  public hide2: boolean = true;
  public error: boolean = false;
  public submited: boolean = false;


  constructor(private fb: FormBuilder) {
    this.businessForm = this.fb.group({
      businessType: [null, Validators.required],
      businessName: [null, Validators.required],
      businessAddress: [null, Validators.required],
      postcode: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required]
    });

    this.representativeForm = this.fb.group({
      name: [null, Validators.required],
      jobTitle: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      spassword: [null, Validators.required],
      cpassword: [null, Validators.required]
    })
  }
  get fControl() {
    return this.businessForm.controls;
  }

  get frmControl() {
    return this.representativeForm.controls;
  }

  public onNext() {
    if (this.businessForm.invalid) {
      this.submited = true;
      return
    }
    else {
      console.log('this.signupForm.value :>> ', this.businessForm.value);
      this.submited = false;
      this.businessForm.reset();
    }
  }

  ngOnInit(): void {
    this.confirmPasswordCheck();
  }

  private confirmPasswordCheck() {
    this.frmControl['cpassword']?.valueChanges.subscribe((res: any) => {
      if (res !== this.frmControl['spassword'].value) {
        this.frmControl['cpassword'].markAllAsTouched();
        this.frmControl['cpassword'].setErrors(
          {
            misMatch: true,
          }
        );
      }
      else {
        this.frmControl['cpassword'].setErrors(null);
      }
    });

    this.frmControl['spassword']?.valueChanges.subscribe((res: any) => {
      if (res !== this.frmControl['cpassword'].value) {
        if (this.frmControl['cpassword'].value) {
          this.frmControl['cpassword'].markAllAsTouched();
          this.frmControl['cpassword'].setErrors(
            {
              misMatch: true,
            }
          );
        }
      }
      else {
        this.frmControl['cpassword'].setErrors(null);
      }
    });
  }

  public onSubmit() {
    if (this.representativeForm.invalid) {
      this.submited = true;
      return
    }
    else {
      console.log('this.representativeForm.value :>> ', this.representativeForm.value);
      this.submited = false;
      this.representativeForm.reset();
    }
  }

}
