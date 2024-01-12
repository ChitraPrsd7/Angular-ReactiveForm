import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
goToDashboard() {
  this.router.navigate(['/home'])
}

  constructor(private router: Router) {}

  goToUserDetails() {
    this.router.navigate(['/home/details'])
  }

}
