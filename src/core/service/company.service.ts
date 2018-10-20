import { Injectable } from '@angular/core';
import { Company } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
@Injectable()
export class CompanyService {
  private apiUrl = 'http://localhost:50554/api/Company';
  constructor(private http: HttpClient, public httpService: HttpService) { }

  getCompanies() {
    return this.http.get(`${this.apiUrl}/GetAllCompany`, this.httpService.GetAuthHttpCommon());
  }

  addCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/InsertCompany`, company, this.httpService.GetAuthHttpCommon());
  }

  updateCompany(company: Company) {
    return this.http.post(`${this.apiUrl}/UpdateCompany`, company, this.httpService.GetAuthHttpCommon());
  }

  deleteCompany(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteCompany`, obj, this.httpService.GetAuthHttpCommon());
  }
}
