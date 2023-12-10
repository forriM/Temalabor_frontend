import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { LOCALSTORAGE_TOKEN_KEY } from '../app.component';
import { AuthService } from '../auth.service';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-professordashboard',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule,MatIconModule,MatButtonModule],
  templateUrl: './professordashboard.component.html',
  styleUrl: './professordashboard.component.scss'
})
export class ProfessordashboardComponent {
  constructor(private authService: AuthService, private router:Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addGrade(){
    this.router.navigate([''])
  }
}
