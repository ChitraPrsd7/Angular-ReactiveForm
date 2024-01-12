import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHandleService } from '../service/http-handle.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-each-detail',
  templateUrl: './each-detail.component.html',
  styleUrl: './each-detail.component.scss'
})
export class EachDetailComponent implements OnInit {
  id: number = 0;
  resultFromTable: any = [];

  constructor(
    private route: ActivatedRoute,
    private httpHandleService: HttpHandleService,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.showDetails(this.id);
  }

  showDetails(id: number) {
    console.log('ID:', this.id);
    this.httpHandleService.getFormDataByID(id).subscribe(
      (response: any) => {
        this.resultFromTable = response;
        console.log('Data fetched successfully:');
      },
      (error: any) => {
        console.log('Error fetching data:');
        // Handle error, e.g., display an error message
      }
    );
  }
}