import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { getUserName } from '../app.component';
import { AuthService } from '../auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Exam{
  id:number
  subjectName:string
  date:Date
  maxNumOfStudents:number
}

export interface Data{
  exam:Exam
  grade:number
  numberOfStudents:number
}

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {

  exams:Data[]=[];
  columnsToDisplay=["id", "subjectname", "date", "grade", "button"];
  url:string='';

  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.setUserBasedParams();
    this.getDatafromBackEnd()
  }

  getDatafromBackEnd(){
    this.http.get<Data[]>(this.url).subscribe(
      data => {
        console.log(data);
        this.exams=data
      }
    )
  }

  setUserBasedParams(){
    if(this.auth.getUserType()==="student"){
      this.url='/student/exams/'+this.auth.getUserName()
      this.columnsToDisplay=["id", "subjectname", "date", "numberofstudents", "grade", "button"]
    } else{
      this.url='/professor/exams/'+this.auth.getUserName()
      this.columnsToDisplay=["id", "subjectname", "date", "numberofstudents", "button"]
    }
  }

  drop(exam: Exam) {
    const options={
      params: {'examid': exam.id}
    }
    this.http.delete("/student/dropexam/"+this.auth.getUserName(),options).subscribe(
      {error: (error) =>{ 
        this.snackBar.open(
          'Hiba történt', 'Bezárás', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
          );
        },
       complete: () => {
        (this.snackBar).open(
          "Siker", "Bezárás", {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
          this.getDatafromBackEnd();
      }
      }
    )
  }
}
