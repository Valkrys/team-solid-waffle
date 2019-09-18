import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { DataService } from './data.service';
import { Role } from 'src/app/role';

@Directive({
  selector: '[appInvalidCapabilityBand]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InvalidCapabilityBandDirective, multi: true }]
})
export class InvalidCapabilityBandDirective implements Validator {

  roles: Role[];

  validate(control: AbstractControl): ValidationErrors {
    return this.invalidCapabilityBandDirective(control);
  }

  constructor(private dataService: DataService){
    dataService.getRoleList().subscribe(roles => this.roles = roles);
  }

  invalidCapabilityBandDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const bandName = control.get('bandName');
    const capabilityName = control.get('capabilityName');
    
    return capabilityName && bandName && this.checkBandCapabilityInvalid(bandName, capabilityName) ? { 'invalidCombo': true } : null;
  };

  checkBandCapabilityInvalid (bandName, capabilityName){
    for(let role of this.roles) {
      if(role.bandName == bandName && role.capabilityName == capabilityName) {
        return true;
      }
    }
    
    return false;
  };
}

