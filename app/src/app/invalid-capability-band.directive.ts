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
    const bandID = control.get('bandID');
    const capabilityID = control.get('capabilityID');

    return capabilityID && bandID && this.checkBandCapabilityInvalid(bandID.value, capabilityID.value) ? { 'invalidCombo': true } : null;
  };

  checkBandCapabilityInvalid (bandID, capabilityID){
    if(!this.roles) {
      return false;
    }

    for(let i = 0; i < this.roles.length; i++) {
        if(this.roles[i].bandID == bandID && this.roles[i].capabilityID == capabilityID) {
          return true;
        }
    };
    return false;
  };
};

