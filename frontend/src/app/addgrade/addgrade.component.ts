import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { getUserName } from '../app.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddgradedialogComponent } from '../addgradedialog/addgradedialog.component';


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

export interface AddPointsRequest {
  subjectId:number
  studentId:number
  grade:number
}


@Component({
  selector: 'app-addgrade',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatDialogModule ],
  templateUrl: './addgrade.component.html',
  styleUrl: './addgrade.component.scss'
})
export class AddgradeComponent {

  subjects: Subject[]=[];
  selectedSubjectId: number=-1;
  students: Profile[]=[]
  columnsToDisplayLeft=["name"];
  columnsToDisplayRight=["id", "name", "save"];

  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar, private dialog: MatDialog){
    this.http.get<Subject[]>('/professor/subOfProf/'+getUserName()).subscribe(
      data => {
        console.log(data);
        this.subjects=data
        this.updateStudentList(this.subjects[0]);
      }
    )
    
  }

  updateStudentList(subject: Subject) {
    console.log(subject);
    this.selectedSubjectId=subject.id
    const options={
      params: {'subjectid': subject.id}
    }
    this.http.get<Profile[]>('subject/students', options).subscribe(
      data => {
        console.log(data);
        this.students=data
      }
    )
  }

  save(student:Profile){
    let dialogref=this.dialog.open(AddgradedialogComponent)
    var points:number=0;
    dialogref.afterClosed().subscribe(data=>{
      points=data;
      console.log(data);
      const request: AddPointsRequest={
        subjectId:this.selectedSubjectId,
        studentId:student.id,
        grade:points
      }
      if (data===undefined) {
        return;
      }
      this.http.post("/professor/points/addpoints", request).subscribe({
        next: (response) => console.log(response),
        error: (error) =>{ 
          this.snackBar.open(
          "Sikertelen jegybeírás", 'Bezárás', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        },
        complete: () => {
          (this.snackBar).open(
            "Sikeres Jegybeírás", "Bezárás", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        }
    }) 
    })

  }
}
