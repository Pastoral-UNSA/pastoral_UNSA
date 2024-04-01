import { Component, inject } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import OptionSelect from './../../interfaces/optionSelect';
import optionsCareer from '../../utils/constans';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-annotated-component-example',
  templateUrl: 'activities-error.snackbar.html',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
})
export class SnackBarAnnotatedComponentExample {
  snackBarRef = inject(MatSnackBarRef);
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  careersOptions: OptionSelect[] = optionsCareer;
  activities: number[] = [];
  durationInSeconds = 5;
  submitted = false;

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    career: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    activities: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      career: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.activities.length == 0) {
      this.openSnackBar();
    } else if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarAnnotatedComponentExample, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  setActivities(idActivitie: number): void {
    const activitie = this.activities.indexOf(idActivitie);
    activitie === -1
      ? this.activities.push(idActivitie)
      : this.activities.splice(activitie, 1);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
