import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { validateUser } from 'src/app/store/actions/user.action';

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
  matcher = new MyErrorStateMatcher();
  isUser;

  constructor(private fg: FormBuilder, private router: Router, private store: Store<State>) { }

  ngOnInit() {
    this.myForm = this.createMyForm();
    this.store.subscribe(({isUser}) => {
      this.isUser = isUser;
      if(this.isUser === true){
        this.router.navigate(['../'])
      }
    });
  }

  private createMyForm(): FormGroup {
    return this.fg.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(validateUser({user: this.myForm.value}));
    }
  }

  public forgotPassword() {
    this.router.navigateByUrl('forgotPassword')
  }

}
