import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { getUserName } from '../app.component';
import { AuthService } from '../auth.service';

export interface Subject{
  id:number
  name:string
  professorsName:string
}

export interface Data{
  subject: Subject
  midYearPoints: number
  numberOfStudents: number
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
    url:string='';
    columnsToDisplay:string[]=[]

    constructor(private http:HttpClient, private auth:AuthService){
        this.setUserbasedParams()
        this.getDatafromBackend();
    }
    getDatafromBackend(){
      this.http.get<Data[]>(this.url).subscribe(
        data => {
          console.log(data);
          this.subjects=data
        }
      )
    }

    setUserbasedParams(){
      if(this.auth.getUserType()=='student'){
        this.columnsToDisplay=["id", "name", "professorsname", "midyearpoints"]
        this.url='/student/subjects/'+getUserName();
    } else {
        this.columnsToDisplay=["id", "name", "professorsname", "numberofstudents"]
        this.url='/professor/subjects/'+getUserName();
    }
  }
    
}
