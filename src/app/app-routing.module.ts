import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsPageComponent } from './components/students/students-page/students-page.component';
import { SubjectsPageComponent } from "./components/subjects/subjects-page/subjects-page.component";
import { StudentsFormComponent } from "./components/students/students-form/students-form.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectDetailsComponent } from "./components/subjects/subject-details/subject-details.component";
import { NotFoundComponent } from "./components/misc/not-found/not-found.component";
import { StatisticsPageComponent } from "./components/statistics/statistics-page/statistics-page.component";
import { ExportPageComponent } from "./components/export/export-page/export-page.component";

const routes: Routes = [
  {
    path:'students/add',
    component: StudentsFormComponent,
  },
  {
    path: 'subjects/add',
    component: SubjectFormComponent,
  },
  {
    path: 'subjects/:id',
    component: SubjectDetailsComponent,
  },
  {
    path: 'students',
    component: StudentsPageComponent,
  },
  {
    path: 'subjects',
    component: SubjectsPageComponent,
  },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
  {
    path: 'export',
    component: ExportPageComponent,
  },
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
