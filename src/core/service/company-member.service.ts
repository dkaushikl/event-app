import { Injectable } from '@angular/core';
import { CompanyMember } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CompanyMemberService {
  private apiUrl = 'http://event-management.azurewebsites.net/api/CompanyMember';

  constructor(private http: HttpClient, public httpService: HttpService) { }

  getCompanyMember(companyId: number) {
    return this.http.get(`${this.apiUrl}/GetAllCompanyMember/${companyId}`, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  getMaximumPage() {
    return this.http.get(`${this.apiUrl}/GetMaximumPage`, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  addCompanyMember(companyMember: CompanyMember) {
    return this.http.post(`${this.apiUrl}/InsertCompanyMember`, companyMember, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  updateCompanyMember(companyMember: CompanyMember) {
    return this.http.post(`${this.apiUrl}/UpdateCompanyMember`, companyMember, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  deleteCompanyMember(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteCompanyMember`, obj, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }
}
