import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-addgradedialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './addgradedialog.component.html',
  styleUrl: './addgradedialog.component.scss'
})
export class AddgradedialogComponent {
  
  form = new UntypedFormGroup({
    score: new UntypedFormControl(null, [Validators.max(100)]),
  },)

  constructor(private dialogRef: MatDialogRef<AddgradedialogComponent>){
  }

  close(){
    this.dialogRef.close()
  }
  
  save(){
    this.dialogRef.close(this.form.value.score);
  }
  
}

