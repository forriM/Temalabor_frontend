import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { getUserName } from '../app.component';

export interface Subject{
  name:string;
  midyearpoints:number;
  grade:number;
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
    subjects: Subject[]=[];

    constructor(private http:HttpClient){
      this.http.get<Subject[]>('/student/subjects/'+getUserName()).subscribe({
        next: (next)=> this.subjects=next,
        error: (error)=> console.log(error),
        complete: ()=>{
            console.log(this.subjects)
        }
      })
    }
}
