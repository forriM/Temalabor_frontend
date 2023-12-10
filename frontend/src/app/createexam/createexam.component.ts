import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

export interface Subject{
  id: number
  name: String
  professorsName: string
}

export interface CreateDeleteDto{
  date: Date
  subject: string
  maxNumOfStudents: number
}

@Component({
  selector: 'app-createexam',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
     MatDatepickerModule, MatNativeDateModule],
  templateUrl: './createexam.component.html',
  styleUrl: './createexam.component.scss'
})

export class CreateexamComponent{
  options: Subject[] = [];

  profileForm = new UntypedFormGroup({
    maxNumOfStudents: new UntypedFormControl(null, []),
    datePicker: new UntypedFormControl(null, []),
    selectedSubject: new UntypedFormControl(null, [])
  },)

  constructor(private http: HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.fetchOptions();
  }

  fetchOptions(){
    this.http.get<Subject[]>('/professor/subOfProf/' + this.auth.getUserName()).subscribe(
      data => {
        console.log(data);
        this.options = data;
      }
    )
  }

  onClick(){
    var createData: CreateDeleteDto = {
      date: this.profileForm.value.datePicker,
      subject: this.profileForm.value.selectedSubject,
      maxNumOfStudents: this.profileForm.value.maxNumOfStudents
    }
    console.log(createData);
    this.http.post('professor/createExam/' + this.auth.getUserName(), createData).subscribe(
      {error: (error) =>{  
        this.snackBar.open(
          'A vizsga létrehozása sikertelen', 'Bezárás', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
          );
        },
       complete: () => {
        (this.snackBar).open(
          "A vizsga létrehozása megtörtént", "Bezárás", {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
       }}
    )
  }
}
