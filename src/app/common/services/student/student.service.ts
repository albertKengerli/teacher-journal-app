import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Student } from "../../entities/student";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private url: string = "http://localhost:3004/students";

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  public deleteStudent(studentID: number): Observable<object> {
    const currentURL: string = `${this.url}/${studentID}`;
    return this.http.delete<object>(currentURL);
  }

  public searchStudent(query: string): Observable<Student[]> {
    const searchURL: string = `${this.url}?q=${query}`;
    return this.http.get<Student[]>(searchURL);
  }
}
