import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { getUserName } from '../app.component';
import { AuthService } from '../auth.service';

export interface Exam{
  id:number
  subjectName:string
  date:Date
}

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  exams:Exam[]=[];
  columnsToDisplay=["id", "subjectname", "date"];
  url:string='';
  constructor(private http:HttpClient, private auth:AuthService){
    this.http.get<Exam[]>('/student/exams/'+this.auth.getUserName()).subscribe(
      data => {
        console.log(data);
        this.exams=data
      }
    )
  }

  seturl(){
    if(this.auth.getUserType()==="student"){
      this.url='/student/exams/'+this.auth.getUserName()
    } else{
      this.url='/professor/exams/'+this.auth.getUserName()
    }
  }
}
