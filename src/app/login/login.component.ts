import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm!: FormGroup;
  hide = true;
  UserFormControl = new FormControl('', [Validators.required]);
  PasswordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  invalidData = false;

  constructor(private fg: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.myForm = this.createMyForm()
  }

  private createMyForm(): FormGroup {
    return this.fg.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['0000']
    });
  }

  public submitFormulario() {

    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log(this.myForm.get('username'))
    }
  }

  public forgotPassword() {
    this.router.navigateByUrl('forgotPassword')
  }

  public get f(): any {
    return this.myForm.controls;
  }

}
