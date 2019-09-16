import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolesFilter'
})
export class RolesFilterPipe implements PipeTransform {

  transform(Roles: any[], searchText: string, selectedBand: string, selectedCapability: string, selectedFamily: string): any {
    if (!Roles) return [];
    if (!searchText && !selectedBand && !selectedCapability && !selectedFamily) return Roles;

    console.log(`Filtering ${selectedFamily} + ${selectedCapability} + ${selectedBand}`);

    if (Roles && Roles.length > 0) {
      return Roles.filter(it => {

        console.log(it);
        return (it.roleName.toLowerCase().includes(searchText.toLowerCase())
          || it.capabilityName.toLowerCase().includes(searchText.toLowerCase())
          || it.bandName.toLowerCase().includes(searchText.toLowerCase()))
          && `${it.capabilityID}`.includes(selectedCapability)
          && `${it.bandName}`.includes(selectedBand)
          && `${it.jobFamilyID}`.includes(selectedFamily)
      });
    }
  }
}
