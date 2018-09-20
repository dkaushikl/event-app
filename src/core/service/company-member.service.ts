import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CompanyMember } from '../../shared/models';
import { AuthService } from './auth.service';

@Injectable()
export class CompanyMemberService {
  private companyMemberRef: AngularFireList<CompanyMember>;
  private companyMembers: Observable<CompanyMember[]>;

  constructor(private database: AngularFireDatabase, private auth: AuthService) {
  }

  getCompanyMember() {
    this.companyMemberRef = this.database.list('company_member');
    this.companyMembers = this.companyMemberRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.companyMembers;
  }

  checkEmailExist(companyMember: CompanyMember) {
    this.database.list<CompanyMember>('company_member').push(companyMember);
  }

  addCompanyMember(companyMember: CompanyMember) {
    this.database.list<CompanyMember>('company_member').push(companyMember);
  }

  updateCompanyMember(id: string, companyMember: CompanyMember) {
    return this.database.list<CompanyMember>('company_member').update(id, companyMember);
  }

  deleteCompanyMember(id: string) {
    return this.database.list<CompanyMember>('company_member').remove(id);
  }
}
