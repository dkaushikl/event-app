// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CompanyMember } from '../../shared/models';

@Injectable()
export class CompanyMemberService {
  // private companyMemberRef: AngularFireList<CompanyMember>;
  // private companyMembers: Observable<CompanyMember[]>;

  getCompanyMember() {
    // this.companyMemberRef = this.database.list('company_member');
    // this.companyMembers = this.companyMemberRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    // return this.companyMembers;z
  }

  checkEmailExist(companyMember: CompanyMember) {
    // this.database.list<CompanyMember>('company_member').push(companyMember);
  }

  addCompanyMember(companyMember: CompanyMember) {

    // this.database.database.ref().child('/company_member').push(companyMember);

    // this.db.object(`members/${userid}`).valueChanges()

    // this.database.database.ref().set(companyMember.key, this.database.object(`members/${companyMember.userId}.valueChanges()`));

    // console.log(companyMember);

    // const data = this.database.object(`company_member/${companyMember.key}`);
    // console.log(data);



    // this.database.list<CompanyMember>('company_member').push(companyMember);
  }

  updateCompanyMember(id: string, companyMember: CompanyMember) {
    // return this.database.list<CompanyMember>('company_member').update(id, companyMember);
  }

  deleteCompanyMember(id: string) {
    // return this.database.list<CompanyMember>('company_member').remove(id);
  }
}
