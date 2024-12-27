import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, CommonModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Truckoom.Maintenance.Ui';
}
