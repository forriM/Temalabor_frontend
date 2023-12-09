import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { getUserName } from '../app.component';

export interface Subject{
  id:number
  name:string
  professorsName:string
}

export interface Data{
  subject: Subject
  midYearPoints: number
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
    subjects: Data[]=[];
    columnsToDisplay=["name", "professorsname", "midyearpoints"]

    constructor(private http:HttpClient){
      this.http.get<Data[]>('/student/subjects/'+getUserName()).subscribe(
        data => {
          console.log(data);
          this.subjects=data
        }
      )
    }
      
    
}
