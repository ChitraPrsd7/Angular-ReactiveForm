import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHandleService } from '../service/http-handle.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit{

button: any;
myform!: FormGroup;



  constructor( private router: Router, private formBuilder: FormBuilder,private httpHandleService: HttpHandleService)  { }
ngOnInit(): void {
    this.myform=this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
}
token : string = ''
loginUser() {
  // console.log('i came');
  this.httpHandleService.loginUser(this.myform.value).subscribe(
    (response: any) => {
      this.token= response.data.token;
      localStorage.setItem("token", this.token)
      if (!this.token) {
        alert('Invalid Credentials');
        } else {
         this.router.navigate(['/home']);
          }
    },
    (error: any) => {
      console.log('error in backend');
    }
  );
}
}
