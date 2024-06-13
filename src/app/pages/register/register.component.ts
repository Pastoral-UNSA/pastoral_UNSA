import { Component, OnInit, inject } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import OptionSelect from './../../interfaces/optionSelect';
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
import { CarreraService } from '../../services/carrera-service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Validation from '../../utils/validation';
import RegistroEstudiante from '../../interfaces/registroEstudiante';
import { log } from 'console';

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
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent implements OnInit {
  carreras: OptionSelect[] = [];
  activities: number[] = [];
  durationInSeconds = 5;
  submitted = false;
  filteredOptions: OptionSelect[] = [];

  private carreraService = inject(CarreraService);

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    career: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        career: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    this.form.disable();
    this.carreraService.getCarreras().subscribe(
      (data: OptionSelect[]) => {
        if (data.length) {
          this.carreras = data;
          this.form.enable();
        }
      },
      (error) => console.error('Error al obtener las carreras', error)
    );
  }

  onSubmit(): void {
    console.log('submit');
    this.submitted = true;
    if (this.form.valid) {
      console.log('submit-valid');
      this.form.disable();
      console.log(JSON.stringify(this.form.value, null, 2));
      const estudiante: RegistroEstudiante = {
        contrasena: this.form.value.password,
        nombres: this.form.value.firstName,
        apellidos: this.form.value.lastName,
        telefono: this.form.value.phone,
        email: this.form.value.email,
        carrera: this.form.value.career,
      };
      this.carreraService.registrarEstudianteBff(estudiante).subscribe(
        (data) => {
          console.log(data);
          if (data.resultadoRegistro == true) {
            this.openDialog();
          } else {
            this.form.enable();
          }
        },
        (error) => console.error('Error al obtener las carreras', error)
      );
    } else if (this.form.invalid) {
      console.log('submit-INVALID');
      return;
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  changeAutoComplete(event: any) {
    console.log(event.target.value);
    const filterValue = event.target.value.toLowerCase();
    this.filteredOptions = this.carreras.filter((o) =>
      o.nombre.toLowerCase().includes(filterValue)
    );
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
