import { DateTime } from "ionic-angular/umd";

export class Company {
  id: string;
  name: string;
  email: string;
  mobileno: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdBy: string;
  createdDate: string;
}

export class CompanyDisplay {
  address: string;
  city: string;
  companyEmail: string;
  country: string;
  createdDate: DateTime;
  firstName: string;
  id: number;
  lastName: string;
  mobileNo: string;
  name: string;
  state: string;
  userEmail: string;
}
