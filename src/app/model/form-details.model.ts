export interface FormDetail {
    phoneNumber: any;
      id: any;
      firstName: string;
      lastName: string;
      email: string;
      dob: Date;
      age: number;
      contactNum: string;
      familyDetails: FamilyDetail[];
    }
    
    export interface FamilyDetail {
      familyFirstName: string;
      familyLastName: string;
      familyEmail: string;
      familyDOB: Date;
      familyAge: number;
      familyContactNum: string;
    }
    
    // export interface FormDetail {
    //   allDetails: PersonalDetail[];
    // }