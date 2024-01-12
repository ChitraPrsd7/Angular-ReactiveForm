import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHandleService } from '../service/http-handle.service';
import { ShareService } from '../service/share.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class EditComponent implements OnInit {
  displayMessage() {
  throw new Error('Method not implemented.');
  }
  
    myForm!: FormGroup;
  
    constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private shareService: ShareService, private httpHandleService: HttpHandleService, private location: Location, private route: ActivatedRoute) { }
    goBack() {
      this.location.back();
    }
  
    maxDate: any
  
    ngOnInit() {
  
      this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      this.myForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contactNum: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        age: [''],
        familyDetails: this.formBuilder.array([])
      });
      
      this.getIdFromQueryParam();
    }
  
    id: number = 0
    getIdFromQueryParam() {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
      });
      this.editIndividualDetail(this.id);
    }
  
    createFamilyDetails(): FormGroup {
      return this.formBuilder.group({
        familyFirstName: ['', Validators.required],
        familyLastName: ['', Validators.required],
        familyEmail: ['', [Validators.required, Validators.email]],
        familyContactNum: ['', [Validators.required]],
        familyDOB: ['', [Validators.required]],
        familyAge: [''],
      });
    }
  
    get familyDetailsArray(): FormArray {
      return this.myForm.get('familyDetails') as FormArray;
    }
  
  
    
  
    removeFamilyDetails(index: number) {
      const familyDetails = this.myForm.get('familyDetails') as FormArray;
      familyDetails.removeAt(index);
    }
  
    get f() {
      return this.myForm.controls;
    }
  
    public personalAgeCalculation() {
      let personalAge = this.shareService.calculateAgeFromDOB(this.myForm.get('dob')?.value)
      this.myForm.get('age')!.setValue(personalAge);
    }
  
    public familyAgeCalculation(index: number) {
      let familyAge = this.shareService.calculateAgeFromDOB(this.familyDetailsArray.at(index).get('familyDOB')?.value)
      console.log(familyAge)
      this.familyDetailsArray.at(index).get('familyAge')!.setValue(familyAge);
    }
  
    onReset() {
      this.myForm.reset();
    }
  
    onSubmit(): void {
      const formData = this.myForm.value;
      formData.id = this.id; // Add the id to the formData object
  
      if (this.myForm.valid) {
        this.httpHandleService.editFormDetails(this.id, formData).subscribe(
          (response: any) => {
            console.log('Data saved successfully:');
            alert("Your data has been submitted");
            this.location.back()
          },
          (error: any) => {
            console.log('Error saving data:');
          }
        );
      } else {
        console.error('Form is not valid');
        const familyDetailsArray = this.myForm.get('familyDetails') as FormArray;
        for (let i = 0; i < familyDetailsArray.length; i++) {
          const familyGroup = familyDetailsArray.at(i) as FormGroup;
          Object.values(familyGroup.controls).forEach(control => control.markAsTouched());
        }
        Object.values(this.myForm.controls).forEach(control => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(innerControl => innerControl.markAsTouched());
          } else {
            control.markAsTouched();
          }
        });
      }
      console.log(this.myForm.value)
    }
  
    // showIndividualDetail(id: number) {
    //   console.log(id)
    //   this.httpHandlerService.getFormDataByID(id).subscribe(
    //     (response: any) => {
    //       console.log('Individual Data fetched successfully:');
    //     },
    //     (error: any) => {
    //       console.log('Error fetching data:');
    //     }
    //   );
    // }
  
  
  
    editIndividualDetail(id: number) {
      this.httpHandleService.getFormDataByID(id).subscribe(
        (response: any) => {
          console.log('Individual Data fetched successfully:', response);
          this.populateForm(response);
        },
        (error: any) => {
          console.log('Error fetching data:', error);
        }
      );
    }
  
    populateForm(data: any) {
      // Set the values for the main form
      this.myForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNum: data.contactNum,
        dob: data.dob,
        age: data.age,
      });
  
      // Clear the existing form array
      const familyDetailsArray = this.myForm.get('familyDetails') as FormArray;
      while (familyDetailsArray.length) {
        familyDetailsArray.removeAt(0);
      }
  
      // Add a new group for each family member
      data.familyDetails.forEach((familyDetail: any) => {
        familyDetailsArray.push(this.formBuilder.group({
          id: familyDetail.id, // Add the id to the form group
          familyFirstName: familyDetail.familyFirstName,
          familyLastName: familyDetail.familyLastName,
          familyEmail: familyDetail.familyEmail,
          familyContactNum: familyDetail.familyContactNum,
          familyDOB: familyDetail.familyDOB,
          familyAge: familyDetail.familyAge,
        }));
      });
    }
  
  
    
  
  
    //displayMessage() {
    //this.toastr.success('Hello, this is a success toast!');
    }
  //}