import { DatePipe ,} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../service/share.service';
import { HttpHandleService } from '../service/http-handle.service';
import { Location } from '@angular/common';
import { ToastrNotificationService } from '../service/toastr-notification.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  myForm: FormGroup = new FormGroup<any>({});showTable: any;
;
  maxDate: any

  constructor( private formBuilder: FormBuilder, private datePipe: DatePipe, private location: Location,  
    private shareService: ShareService, private httpHandleService: HttpHandleService,
    private toastr: ToastrNotificationService
    ) {

  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      contactNum: ['', [Validators.required, Validators.pattern("\\d*"), Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['', [Validators.required]],
      age: [''],

      familyDetails: this.formBuilder.array([])
    });
    this.addFamilyDetails();
  }

  createFamilyDetails(): FormGroup {
    return this.formBuilder.group({
      familyFirstName: ['', Validators.required],
      familyLastName: ['', Validators.required],
      familyEmail: ['', [Validators.required, Validators.email]],
      familyContactNum: ['', [Validators.required, Validators.pattern("\\d*"), Validators.minLength(10), Validators.maxLength(10)]],
      familyDOB: ['', [Validators.required]],
      familyAge: [''],
    });
  }

  get familyDetailsArray(): FormArray {
    return this.myForm.get('familyDetails') as FormArray;
  }


  addFamilyDetails() {
    this.familyDetailsArray.push(this.formBuilder.group({
      familyFirstName: ['', Validators.required],
      familyLastName: ['', Validators.required],
      familyEmail: ['', [Validators.required, Validators.email]],
      familyContactNum: ['', [Validators.required, Validators.pattern("\\d*"), Validators.minLength(10), Validators.maxLength(10)]],
      familyDOB: ['', [Validators.required]],
      familyAge: [''],
    }));
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
    this.toastr.showError("You Reset Your Details")
  }



  onSubmit(): void {
    const formData = this.myForm.value;

    if (this.myForm.valid) {
      this.httpHandleService.saveFormData(formData).subscribe(
        (response: any) => {
          console.log('Data saved successfully:');
          alert("Your data has been submitted");
            this.location.back()
        },
        (error: any) => {
          console.log('Error saving data:');
          
        }
      );
    } {
      
      console.error('Form is not valid');
      // Mark controls inside the familyDetails array as touched
      const familyDetailsArray = this.myForm.get('familyDetails') as FormArray;
      for (let i = 0; i < familyDetailsArray.length; i++) {
        const familyGroup = familyDetailsArray.at(i) as FormGroup;
        Object.values(familyGroup.controls).forEach(control => control.markAsTouched());
      }
      // Mark outer controls as touched
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

  allDetailsForTable: any[] = [];
  showTableDetails() {
    this.httpHandleService.getFormData().subscribe(
      (response: any) => {
        console.log('Data fetched successfully:');
        this.allDetailsForTable = response;
        console.log(this.allDetailsForTable, "Table Data Show SucessFull")
      },
      (error: any) => {
        console.log('Error fetching data:');
        // Handle error, e.g., display an error message
      }
    );

  }


}



