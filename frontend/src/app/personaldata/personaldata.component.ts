import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LOCALSTORAGE_TOKEN_KEY } from '../app.component';

export interface Profile {
  id:number
  userName:String;
  password:String;
  firstName:number;
  lastName:String;
}

@Component({
  selector: 'app-personaldata',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './personaldata.component.html',
  styleUrl: './personaldata.component.scss'
})
export class PersonaldataComponent {
  oldUserName:String="";
  oldPassWord:String="";
  oldFirstName:number=0;
  oldLastName:String="";

  profileForm = new UntypedFormGroup({
    username: new UntypedFormControl(null, [Validators.maxLength(50)]),
    password: new UntypedFormControl(null, []),
    firstname: new UntypedFormControl(null, []),
    lastname: new UntypedFormControl(null, [])
  },)

  constructor(private http:HttpClient, ){
    var responseData: Profile;
    var username=localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.http.get<Profile>("student/getpersonaldata/" + username).
    subscribe({
      next: (next) =>  {responseData = next;}, 
      error: (error) => console.log(error), 
      complete: () => {
        console.log(responseData); 
        this.oldUserName=responseData.userName;
        this.oldPassWord=responseData.password;
        this.oldFirstName=responseData.firstName;
        this.oldLastName=responseData.lastName;}
      });
  }

  cancel(){

  }

  save(){

  }
}
