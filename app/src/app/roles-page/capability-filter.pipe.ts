import { Pipe, PipeTransform } from '@angular/core';
import { Capability } from '../capability';

@Pipe({
  name: 'capabilityFilter'
})
export class CapabilityFilterPipe implements PipeTransform {

  transform(capabilities: Capability[], id: string): Capability[] {
    if (!capabilities) return [];
    if (!id) return capabilities;

    console.log(capabilities, id);

    return capabilities.filter(c => {
      return c.jobFamilyID === parseInt(id);
    });
  }

}
