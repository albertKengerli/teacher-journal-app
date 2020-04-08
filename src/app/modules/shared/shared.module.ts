import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

import { FormComponent } from "../../shared/components/form/form.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { DatepickerDialogComponent } from "../../shared/components/datepicker-dialog/datepicker-dialog.component";
import { DropdownPickerComponent } from "../../shared/components/dropdown-picker/dropdown-picker.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "../../common/interceptors/header/header.interceptor";

import { TranslateModule } from "@ngx-translate/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { gradesReducer, GradesEffects } from "../../store/grades";
import { editableGradesReducer } from "../../store/editableGrades";

@NgModule({
  declarations: [
    FormComponent,
    SpinnerComponent,
    DatepickerDialogComponent,
    DropdownPickerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatIconModule,
    StoreModule.forFeature("grades", gradesReducer),
    EffectsModule.forFeature([GradesEffects]),
    StoreModule.forFeature("editableGrades", editableGradesReducer),
  ],
  exports: [
    TranslateModule,
    FormComponent,
    SpinnerComponent,
    DropdownPickerComponent,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  entryComponents: [
    DatepickerDialogComponent,
  ]
})
export class SharedModule { }
