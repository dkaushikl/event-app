import { Injectable } from '@angular/core';
import { Company } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
@Injectable()
export class CompanyService {
  private apiUrl = 'http://localhost:50554/api/Company';
  private companies: any;
  constructor(private http: HttpClient, public httpService: HttpService) { }

  getCompanies(isForced) {
    if (this.companies !== undefined && !isForced) {
      return this.companies;
    } else {
      return this.http.get(`${this.apiUrl}/GetAllCompany`, this.httpService.GetAuthHttpCommon());
    }
  }

  addCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/InsertCompany`, company, this.httpService.GetHttpJson());
  }

  updateCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/UpdateCompany`, company, this.httpService.GetHttpJson());
  }

  deleteCompany(id: string) {
    return this.http.post(`${this.apiUrl}/DeleteCompany`, id, this.httpService.GetHttpJson());
  }
}
