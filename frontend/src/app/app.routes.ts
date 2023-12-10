import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardStud } from './auth-guard/auth.guardstudent';
import { AuthGuardProf } from './auth-guard/auth.guardprofessor';
import { ProfessordashboardComponent } from './professordashboard/professordashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { PersonaldataComponent } from './personaldata/personaldata.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ExamsComponent } from './exams/exams.component';
import { EnrolltoexamComponent } from './enrolltoexam/enrolltoexam.component';
import { PickupsubjectComponent } from './pickupsubject/pickupsubject.component';
import { AddgradeComponent } from './addgrade/addgrade.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'signup', component:SignupComponent
    },
    {
        path:'student', component:StudentdashboardComponent, canActivate: [AuthGuardStud],

        children:[
            {
                path: 'personaldata', component:PersonaldataComponent
            },
            
            {
                path: 'subjects', component:SubjectsComponent
            }, 
            {
                path: 'exams', component:ExamsComponent
            },
            {
                path: 'enrollToExam', component:EnrolltoexamComponent
            },
            {
                path: 'pickUpSubject', component:PickupsubjectComponent
            }
        ]
    },
    {
        path:'professor', component:ProfessordashboardComponent, canActivate:[AuthGuardProf],

        children:[
            {
                path: 'personaldata', component:PersonaldataComponent
            },
            {
                path: 'subjects', component:SubjectsComponent
            },
            {
                path: 'exams', component:ExamsComponent
            },
            {
                path: 'addpoints', component:AddgradeComponent
            }
        ]
    }


];
