import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bandsFilter'
})
export class BandsFilterPipe implements PipeTransform {

  transform(Band: any[], searchText: string): any {
    if (!Band) return [];
    if (!searchText) return Band;

    if (Band && Band.length > 0) {
      return Band.filter(it => {
        return (it.bandName.toLowerCase().includes(searchText.toLowerCase()))
      });
    }
  }

}
