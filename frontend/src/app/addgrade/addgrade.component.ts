import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { getUserName } from '../app.component';


export interface Subject{
  id:number
  name:string
  studentName:string
}
export interface Profile {
  id:number
  userName:String;
  password:String;
  firstName:number;
  lastName:String;
  dateOfBirth:Date;
}

@Component({
  selector: 'app-addgrade',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './addgrade.component.html',
  styleUrl: './addgrade.component.scss'
})
export class AddgradeComponent {

  subjects: Subject[]=[];
  students: Profile[]=[]
  columnsToDisplayLeft=["name"];
  columnsToDisplayRight=["id", "name", "currentpoints", "inputs"];

  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.http.get<Subject[]>('/professor/subOfProf/'+getUserName()).subscribe(
      data => {
        console.log(data);
        this.subjects=data
      }
    )
    this.updateStudentList(this.subjects[0]);
  }

  updateStudentList(subject: Subject) {
    console.log(subject);
    this.http.get<Profile[]>('/professor/subOfProf/'+getUserName()).subscribe(
      data => {
        console.log(data);
        this.students=data
      }
    )

  }
}
