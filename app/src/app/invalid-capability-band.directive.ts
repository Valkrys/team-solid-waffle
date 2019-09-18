import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { DataService } from './data.service';

@Directive({
  selector: '[appInvalidCapabilityBand]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InvalidCapabilityBandDirective, multi: true }]
})
export class InvalidCapabilityBandDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    return this.invalidCapabilityBandDirective(control);
  }

  constructor(private dataService: DataService){
    this.dataService = dataService;
  }

  invalidCapabilityBandDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const bandName = control.get('bandName');
    const capabilityName = control.get('capabilityName');
    
    return capabilityName && bandName && this.checkBandCapabilityValid(bandName, capabilityName) ? { 'invalidCombo': true } : null;
  };

  checkBandCapabilityValid (bandName, capabilityName){
    this.dataService.get
    
    return bandName.value=="Trainee" && capabilityName.value=="Technical" ;
  };
}

