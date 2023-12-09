import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Exam{
  id:number
  subjectName:string
  date:Date
  enroll:string
}

@Component({
  selector: 'app-enrolltoexam',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './enrolltoexam.component.html',
  styleUrl: './enrolltoexam.component.scss'
})


export class EnrolltoexamComponent {
  exams:Exam[] = [];
  columnsToDisplay = ["id", "subjectname", "date", "enroll"];
  url:string = '';
  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.http.get<Exam[]>('/student/exams').subscribe(
      data => {
        console.log(data);
        this.exams = data
      }
    )
  }

  click(exam: Exam){

    this.http.post('student/enrolltoexam/' + this.auth.getUserName(), exam).subscribe(
      {error: (error) =>{ 
        this.snackBar.open(
          'Sikertelen vizsgajelentkezés', 'Bezárás', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
          );
        },
       complete: () => {
        (this.snackBar).open(
          "Sikeres Vizsgajelentkezés", "Bezárás", {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
       }}
    )
  }
}
