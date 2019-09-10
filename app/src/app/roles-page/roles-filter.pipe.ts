import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolesFilter'
})
export class RolesFilterPipe implements PipeTransform {

  transform(roles: any[], searchText: string, selectedBand: string, selectedCapability: string, selectedFamily: string): any {
    if (!roles) { return []; }
    if (!searchText && !selectedBand && !selectedCapability && !selectedFamily) { return roles; }

    if (roles && roles.length > 0) {
      return roles.filter(it => {
        return (
          it.roleName.toLowerCase().includes(searchText.toLowerCase())
          || it.capabilityName.toLowerCase().includes(searchText.toLowerCase())
          || it.bandName.toLowerCase().includes(searchText.toLowerCase())
        )
          && (!selectedCapability || it.capabilityID == selectedCapability)
          && (!selectedBand || it.bandName == selectedBand)
          && (!selectedFamily || it.jobFamilyID == selectedFamily)
      });
    }
  }
}
