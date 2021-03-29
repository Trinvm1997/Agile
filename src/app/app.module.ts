import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { RoleAddComponent } from './components/role/role-add/role-add.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UsersListComponent } from './components/user/users-list/users-list.component';
import { FacultyAddComponent } from './components/faculty/faculty-add/faculty-add.component';
import { FacultyDetailsComponent } from './components/faculty/faculty-details/faculty-details.component';
import { FacultiesListComponent } from './components/faculty/faculties-list/faculties-list.component';
import { ContributionAddComponent } from './components/contribution/contribution-add/contribution-add.component';
import { ContributionDetailsComponent } from './components/contribution/contribution-details/contribution-details.component';
import { ContributionsListComponent } from './components/contribution/contributions-list/contributions-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomePagesComponent } from './components/home-pages/home-pages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RoleAddComponent,
    RoleDetailsComponent,
    RolesListComponent,
    UserAddComponent,
    UserDetailsComponent,
    UsersListComponent,
    FacultyAddComponent,
    FacultyDetailsComponent,
    FacultiesListComponent,
    ContributionAddComponent,
    ContributionDetailsComponent,
    ContributionsListComponent,
    LoginComponent,
    HomePagesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
