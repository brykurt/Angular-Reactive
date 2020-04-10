import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from '@angular/forms';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

export class User {
  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public sendCatalog = false,
    public addressType = 'home',
    public street1?: string,
    public street2?: string,
    public city?: string,
    public state = '',
    public zip?: string
  ) {}
}
@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.scss'],
})
export class UserinputComponent implements OnInit {
  userForm: FormGroup;
  user = new User();
  constructor(private fb: FormBuilder) {}

  //to ensure no modification cast type must be declare otherwise, it will be abstract control
  get addresses() : FormArray{
    return <FormArray>this.userForm.get('addresses');
  }
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required , Validators.email]],
        confirmEmail: ['', Validators.required],
      }, {validator : emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
      
     
    });

    this.userForm.get('notification').valueChanges.subscribe(
      value => console.log(value)
    );
  }

addAddress(): void{
  this.addresses.push(this.buildAddress());
}

  //call this method whenever the button is clicked
  buildAddress() : FormGroup{
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: ['', Validators.required],
      state: ['', Validators.required] ,
      zip: ''

    })
  }
  populateTestData(): void {
    this.userForm.setValue({
      street1: '1028 H. Viscaya',
      city: 'Caloocan',
      state: 'NCR',
      zip : '1405'
    });
  }

  save() {
    console.log(this.userForm);
    console.log('Saved: ' + JSON.stringify(this.userForm.value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.userForm.get('phone');

    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
