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
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'activities-success.dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  styleUrl: './activities-success.dialog.scss',
  styles: [
    `
      :host {
        display: block;
        background: white;
        color: #111827;
        padding: 16px;
        top: 0;
      }
    `,
  ],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
    if (this.form.valid && this.activities.length) {
      this.form.disable()
      this.openDialog();
      console.log(JSON.stringify(this.form.value, null, 2));
    } else if (this.activities.length == 0) {
      this.openSnackBar();
    } else if (this.form.invalid) {
      return;
    }
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

  openDialog(): void {
    const anchoPantalla = screen.width;
    const configMobile: MatDialogConfig = {
      minWidth: '250px',
      maxWidth: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      disableClose: true,
    };
    const configDesktop: MatDialogConfig = {
      width: '550px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      disableClose: true,
    };
    const configDialog = anchoPantalla < 650 ? configMobile : configDesktop;
    this.dialog.open(DialogAnimationsExampleDialog, configDialog);
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
