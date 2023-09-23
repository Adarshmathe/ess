import { ValidatorFn, AbstractControl } from "@angular/forms";

export class AppValidation {

    allowedNumberOnly(event: any): boolean {
      const pattern = /[0-9\+\-\ ]/;
      var a = event.charCode;
      let inputChar = String.fromCharCode(a);
      if(a==0){return false;}
      
      if (!pattern.test(inputChar) || event.which === 32) {
        // invalid character, prevent input
        event.preventDefault();
      }
      if (event.which == 13)
        return true;
      else
        return false;
    }  

    allowedwordsOnly(event: any): boolean {
      const pattern = /^[a-zA-Z\\\s]+$/;
      var a = event.charCode;
      let inputChar = String.fromCharCode(a);
      if(a==0){return false;}
      
      if (!pattern.test(inputChar) ) {
        // invalid character, prevent input
        event.preventDefault();
      }
      if (event.which == 13 || event.which == 32 )
        return true;
      else
        return false;
    }  

    
    checkCGPA(event: any): boolean {
      const pattern =/[0-9\+\-\\.]/;
      var a = event.charCode;

      let inputChar = String.fromCharCode(a);

      if(a==0){return false;}
      
      if (!pattern.test(inputChar) || event.which === 32) {
        // invalid character, prevent input
        event.preventDefault();
      }
      if (event.which == 13)
        return true;
      else
        return false;
    }  
}

export function checkMatchValidator(field1: string, field2: string) {
  return function (frm) {
    let field1Value = frm.get(field1).value;
    let field2Value = frm.get(field2).value;

    if (field1Value !== '' && field1Value !== field2Value) {
      return { 'notMatch': `value ${field1Value} is not equal to ${field2}` }

    }
    return null;
  }
}

export function checkPanNumberValidation(nameRe: RegExp): ValidatorFn {
  return (control:AbstractControl): {[key:string]: any} | null => {
    // if input field is empty return as valid else test
    const ret = (control.value !== '') ? nameRe.test(control.value) : true;
    return !ret ? {'invalidNumber': {value: control.value}} : null;
  };
}