import { Component, OnInit } from '@angular/core';
import { HttpHandleService } from '../service/http-handle.service';
import { IconDefinition, faEye, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.scss'
})
export class TableDetailsComponent implements OnInit {
editDetails(arg0: any) {
throw new Error('Method not implemented.');
}
viewDetails(arg0: any) {
throw new Error('Method not implemented.');
}

  constructor(private httpHandleService: HttpHandleService, private router: Router)  { }

  ngOnInit(): void {
    this.showTableDetails();
  }

  addForm() {
this.router.navigate(['/home/add'])
  }

  allDetailsForTable: any[] = [];
  showTableDetails() {
    this.httpHandleService.getFormData().subscribe(
      (response: any) => {
        console.log('Data fetched successfully:');
        this.allDetailsForTable = response.data;
      },
      (error: any) => {
        console.log('Error fetching data:');
        // Handle error, e.g., display an error message
      }
    );
  }

  
  deleteByID (id: number) {
    if(confirm("Do you really want to delete data?")) {
    this.httpHandleService.deleteByID(id).subscribe(
      (response: any) => {
        console.log('Data Deleted successfully:', response);
      },
      (error: any) => {
        console.log('Error deleting data:');
      
      }
    );
    this.showTableDetails();
    }else {
      alert("Deletion canceled by user:")
    }
  }


  

  
  faEyes = faEye;
  faPenSquares = faPenSquare;
  faTrash: IconDefinition = faTrash;
}
