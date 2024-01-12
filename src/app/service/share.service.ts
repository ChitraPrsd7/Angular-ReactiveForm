
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  getItemById(itemId: any) {
    throw new Error('Method not implemented.');
  }

  calculateAgeFromDOB (dateofBirth: string): number | null {
    const timeDiff = Date.now() - new Date(dateofBirth).getTime();
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

    return age < 0 ? null : age;
  }
}

