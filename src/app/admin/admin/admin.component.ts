import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export default class AdminComponent {

}
