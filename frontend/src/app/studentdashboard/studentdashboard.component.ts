import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { LOCALSTORAGE_TOKEN_KEY } from '../app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-studentdashboard',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule],
  templateUrl: './studentdashboard.component.html',
  styleUrl: './studentdashboard.component.scss'
})
export class StudentdashboardComponent {
    constructor(private authService: AuthService, private router:Router){}

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
