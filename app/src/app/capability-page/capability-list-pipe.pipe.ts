import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capabilityListPipe'
})
export class CapabilityListPipePipe implements PipeTransform {

  transform(capability: any[], searchText: string, selectedFamily: string): any {
    if (!capability) return [];
    if (!searchText && !selectedFamily) return capability;

    if (capability && capability.length > 0) {
      return capability.filter(it => {
        return (
          it.capabilityName.toLowerCase().includes(searchText.toLowerCase())
          || it.jobFamilyID.toLowerCase().includes(searchText.toLowerCase())
        )
          && (!selectedFamily || it.jobFamilyID == selectedFamily)
      });
    }
  }
}

