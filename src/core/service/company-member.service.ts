import { Injectable } from '@angular/core';
import { CompanyMember } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable()
export class CompanyMemberService {

  private apiUrl = 'http://localhost:50554/api/CompanyMember';
  constructor(private http: HttpClient, public httpService: HttpService) { }

  getCompanyMember(companyId: number) {
    return this.http.get(`${this.apiUrl}/GetAllCompanyMember/${companyId}`, this.httpService.GetAuthHttpCommon());
  }

  getMaximumPage() {
    return this.http.get(`${this.apiUrl}/GetMaximumPage`, this.httpService.GetAuthHttpCommon());
  }

  addCompanyMember(companyMember: CompanyMember) {
    return this.http.post(`${this.apiUrl}/InsertCompanyMember`, companyMember, this.httpService.GetAuthHttpCommon());
  }

  updateCompanyMember(companyMember: CompanyMember) {
    return this.http.post(`${this.apiUrl}/UpdateCompanyMember`, companyMember, this.httpService.GetAuthHttpCommon());
  }

  deleteCompanyMember(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteCompanyMember`, obj, this.httpService.GetAuthHttpCommon());
  }
}
