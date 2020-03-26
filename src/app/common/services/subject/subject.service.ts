import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Subject } from "../../entities/subject";

@Injectable({
  providedIn: "root"
})
export class SubjectService {
  private url: string = "http://localhost:3004/subjects";

  constructor(private http: HttpClient) { }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url);
  }

  public getSubjectById(id: string): Observable<Subject> {
    const currentUrl: string = `${this.url}/${id}`;
    return this.http.get<Subject>(currentUrl);
  }

  public getSubjectByName(name: string): Observable<Subject[]> {
    const currentUrl: string = `${this.url}?name=${name}`;
    return this.http.get<Subject[]>(currentUrl);
  }

  public addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.url, subject);
  }

  public deleteSubject(subjectId: number): Observable<object> {
    const currentURL: string = `${this.url}/${subjectId}`;
    return this.http.delete<object>(currentURL);
  }

  public updateSubject(subjectId: number, subject: Subject): Observable<Subject> {
    const updateURL: string = `${this.url}/${subjectId}`;
    return this.http.put<Subject>(updateURL, subject);
  }
}
