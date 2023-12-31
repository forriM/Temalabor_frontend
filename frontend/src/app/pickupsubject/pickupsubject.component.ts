import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Subject{
  id:number
  name:string
  professorsName:string
  enroll: string
}

@Component({
  selector: 'app-pickupsubject',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './pickupsubject.component.html',
  styleUrl: './pickupsubject.component.scss'
})
export class PickupsubjectComponent {
  subjects: Subject[]=[];
  columnsToDisplay=["id", "name", "professorsname", "enroll"]

  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.http.get<Subject[]>('/student/subjects').subscribe(
      data => {
        console.log(data);
        this.subjects = data
      }
    )
  }

  click(subject: Subject){
    this.http.post('/student/pickupsubject/'+ this.auth.getUserName(), subject).subscribe(
      {error: (error) =>{ 
        this.snackBar.open(
          'Sikertelen tárgyfelvétel', 'Bezárás', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
          );
        },
       complete: () => {
        (this.snackBar).open(
          "Sikeres tárgyfelvétel", "Bezárás", {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
       }}
    )
  }

}
