import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Validator} from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Console } from 'console';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    username:FormControl=new FormControl('')
    password:FormControl=new FormControl('')
    isProf:FormControl=new FormControl('')
    response:any
    constructor(private fb:FormBuilder, private http: HttpClient){}
     login(){
      let url:string
      if(this.isProf.value){
        url="/nyilvantartas/professor/login"
      }
      else {
        url="/nyilvantartas/student/login"
      }
      
      
       var response=this.http.post<boolean>(url, {username: this.username.value, password:this.password.value}).subscribe();
      
      this.response=response;
     }
}

export interface User {
  username: string;
  password: string;
}
