import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsTableComponent } from './components/students/students-table/students-table.component';
import { StudentsPageComponent } from './components/students/students-page/students-page.component';
import { StudentsFormComponent } from './components/students/students-form/students-form.component';
import { FormComponent } from './shared/components/form/form.component';
import { SubjectsPageComponent } from './components/subjects/subjects-page/subjects-page.component';
import { SubjectsListComponent } from './components/subjects/subjects-list/subjects-list.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';
import { SubjectDetailsComponent } from './components/subjects/subject-details/subject-details.component';
import { SubjectTableComponent } from './components/subjects/subject-table/subject-table.component';
import { NotFoundComponent } from './components/misc/not-found/not-found.component';
import { StatisticsPageComponent } from './components/statistics/statistics-page/statistics-page.component';
import { ExportPageComponent } from './components/export/export-page/export-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsTableComponent,
    StudentsPageComponent,
    StudentsFormComponent,
    FormComponent,
    SubjectsPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectDetailsComponent,
    SubjectTableComponent,
    NotFoundComponent,
    StatisticsPageComponent,
    ExportPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
