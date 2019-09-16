import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capabilityListPipe'
})
export class CapabilityListPipePipe implements PipeTransform {

  transform(Capability: any[], searchText: string, selectedFamily: string): any {
    if (!Capability) return [];
    if (!searchText && !selectedFamily) return Capability;

    if (Capability && Capability.length > 0) {
      return Capability.filter(it => {
        console.log(it);
        return it.capabilityName.toLowerCase().includes(searchText.toLowerCase())
          || it.jobFamilyName.toLowerCase().includes(searchText.toLowerCase())
          && `${it.jobFamilyName}`.includes(selectedFamily)
      });
    }
  }

}
