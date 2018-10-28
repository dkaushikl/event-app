import { Injectable } from '@angular/core';
import { Company } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CompanyService {
  // private apiUrl = 'http://localhost:50554/api/Company';
  private apiUrl = 'http://event-management.azurewebsites.net/api/Company';

  constructor(private http: HttpClient, public httpService: HttpService) { }

  getCompanies() {
    return this.http.get(`${this.apiUrl}/GetAllCompany`, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  addCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/InsertCompany`, company, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  updateCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/UpdateCompany`, company, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  deleteCompany(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteCompany`, obj, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }
}
