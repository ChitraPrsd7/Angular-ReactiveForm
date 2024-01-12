import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number): string {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const numStr = value.toString();
    let nepaliStr = '';
    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i], 10);
      nepaliStr += nepaliDigits[digit];
    }
    return nepaliStr;
  }

}
