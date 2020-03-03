import { Pipe, PipeTransform } from '@angular/core';

import { StudentWithGrades } from '../../entities/student';

import { calculateAverageGrade } from "../../helpers/average";

@Pipe({
  name: 'subjectTableValue'
})
export class SubjectTableValuePipe implements PipeTransform {

  transform(student: StudentWithGrades, pipeType: string, date: string): string {
    switch (pipeType) {
      case 'name' :
        return student.name;
      case 'surname' :
        return student.surname;
      case 'averageGrade' :
        return calculateAverageGrade(student.grades);
      case 'studentGrade' :
        return student.grades.hasOwnProperty(date) ? student.grades[date].toString() : '';
      default:
        return 'Pipe is broken';
    }
  }

}
