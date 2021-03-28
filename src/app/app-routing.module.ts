import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributionAddComponent } from './components/contribution/contribution-add/contribution-add.component';
import { ContributionDetailsComponent } from './components/contribution/contribution-details/contribution-details.component';
import { ContributionsListComponent } from './components/contribution/contributions-list/contributions-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacultiesListComponent } from './components/faculty/faculties-list/faculties-list.component';
import { FacultyAddComponent } from './components/faculty/faculty-add/faculty-add.component';
import { FacultyDetailsComponent } from './components/faculty/faculty-details/faculty-details.component';
import { HomePagesComponent } from './components/home-pages/home-pages.component';
import { LoginComponent } from './components/login/login.component';
import { RoleAddComponent } from './components/role/role-add/role-add.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UsersListComponent } from './components/user/users-list/users-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'roles/add', component: RoleAddComponent },
  { path: 'roles/:id', component: RoleDetailsComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'faculties', component: FacultiesListComponent },
  { path: 'faculties/add', component: FacultyAddComponent },
  { path: 'faculties/:id', component: FacultyDetailsComponent },
  { path: 'contributions', component: ContributionsListComponent },
  { path: 'contributions/add', component: ContributionAddComponent },
  { path: 'contributions/:id', component: ContributionDetailsComponent },
  { path: 'home', component: HomePagesComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
