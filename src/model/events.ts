export class Company {
  key: string;
  name: string;
  createdBy: string;
  createdDate: string;
}

export interface CompanyMember {
  userID: string;
  createdBy: string;
  createdDate: string;
}

export class Event {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  companyId: string;
  createdBy: string;
  createdDate: string;
  id: string;
}

// export interface Event {
//   companyID: string;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   createdBy: string;
//   createdDate: string;
//   isActive: boolean;
// }

export interface EventMember {
  userID: string;
  eventID: string;
  createdDate: string;
}

export interface UserProfile {
  userID: string;
  firstname: string;
  lastname: string;
  createdDate: string;
}
