import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {

}
