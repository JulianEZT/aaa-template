import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm!:FormGroup;

  constructor(private fg:FormBuilder, private router:Router) { }

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

    if(this.myForm.invalid){
      /* this.myForm.controls['username'].markAsTouched(); ===  de esta forma solo valida un campo*/
      Object.values(this.myForm.controls).forEach(control =>{
        control.markAsTouched();
      });

      return;
    }

    /* if(!this.loginPro.ingresarApplication(this.myForm.value)){

      const toastLiveExample = document.getElementById('liveToast')!;
      const toast = new Toast(toastLiveExample)

      var textWrapper = document.querySelector('.ml9 .letters');
      textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
        
      anime.timeline({loop: true})
        .add({
          targets: '.ml9 .letter',
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i+1)
        }).add({
          targets: '.ml9',
          opacity: 0,
          duration: 100,
          easing: "easeOutExpo",
          delay: 1000
        });
      toast.show()
   }else{
    this.router.navigate(['principal'])
   }
 */
  }

  public get f(): any{
    return this.myForm.controls;
  }

}
