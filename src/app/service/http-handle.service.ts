import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiHandler } from '../model/global-api-handler.model';
import { FormDetail } from '../model/form-details.model';
import { FormGroup } from '@angular/forms';
// Import the FormDetail interface

@Injectable({
  providedIn: 'root'
})
export class HttpHandleService {


  constructor(private http: HttpClient) { }

  // api for data 
  public apiUrl = 'http://localhost:8989/api/v1';


  getFormData(): Observable<GlobalApiHandler<FormDetail[]>> {
    return this.http.get<GlobalApiHandler<FormDetail[]>>(`${this.apiUrl}/formDetails/fetch`);
  }

  getFormDataByID(id: number): Observable<GlobalApiHandler<FormDetail>> {
    return this.http.get<GlobalApiHandler<FormDetail>>(`${this.apiUrl}/formDetails/fetch/${id}`);
  }

  saveFormData(formdata: any):
    Observable<GlobalApiHandler<FormDetail>> {
    return this.http.post<GlobalApiHandler<FormDetail>>(`${this.apiUrl}/formDetails/save`, formdata);
  }

  editFormDetails(id: number, updateRequest: FormDetail): Observable<GlobalApiHandler<FormDetail>> {
    return this.http.put<GlobalApiHandler<FormDetail>>(`${this.apiUrl}/formDetails/update`, updateRequest);
  }

  deleteByID(id: number): Observable<GlobalApiHandler<FormDetail>> {
    return this.http.delete<GlobalApiHandler<FormDetail>>(`${this.apiUrl}/formDetails/delete/${id}`)
  }

  loginUser(myform: any): Observable<GlobalApiHandler<FormGroup>> {
    return this.http.post<GlobalApiHandler<FormGroup>>(`${this.apiUrl}/login`, myform);
  }
}