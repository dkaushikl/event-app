import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Company } from '../model/events';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  companyList: any;
  companyRef: AngularFireList<Company>;
  companies: Observable<Company[]>;
  company: AngularFireObject<Company>;

  constructor(public auth: AngularFireAuth, private database: AngularFireDatabase) {
    this.companyRef = database.list('company');
    this.companies = this.companyRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getCompanies() {
    return this.companies;
  }

  addCompany(company: Company) {
    this.database.list<Company>("company").push(company);
  }

  getClient(id: string) {
    this.company = this.database.object('/company/' + id);
    return this.company;
  }

  updateCompany(id: string, company: Company) {
    return this.database.list<Company>("company").update(id, company);
  }

  deleteCompany(id: string) {
    return this.database.list<Company>("company").remove(id);
  }
}
