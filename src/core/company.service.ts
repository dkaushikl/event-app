import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../models';
@Injectable()
export class CompanyService {
  private companyRef: AngularFireList<Company>;
  private companies: Observable<Company[]>;

  constructor(private database: AngularFireDatabase) {
  }

  getCompanies(isForced) {
    if (this.companies !== undefined && !isForced) {
      return this.companies;
    } else {
      this.companyRef = this.database.list('company');
      this.companies = this.companyRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      return this.companies;
    }
  }

  addCompany(company: Company) {
    this.database.list<Company>('company').push(company);
  }

  updateCompany(id: string, company: Company) {
    return this.database.list<Company>('company').update(id, company);
  }

  deleteCompany(id: string) {
    return this.database.list<Company>('company').remove(id);
  }
}
