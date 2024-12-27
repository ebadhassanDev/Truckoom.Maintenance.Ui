import { Component, OnInit } from '@angular/core';
import { ApiService, Service } from '../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ], 
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['serviceId', 'serviceName', 'serviceDate', 'taskNames', 'actions'];
  dataSource: Service[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadServices();
  }

  // Load services from the API
  loadServices(): void {
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }

  // Format the service date to a readable string (if necessary)
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); // You can adjust the format here
  }

  // Navigate to edit service page
  editService(serviceId: number): void {
    this.router.navigate(['/edit', serviceId]);
  }

  // Delete a service
  deleteService(serviceId: number): void {
    this.apiService.deleteService(serviceId).subscribe({
      next: () => {
        this.loadServices();  // Reload the service list after deletion
      },
      error: (err) => {
        console.error('Error deleting service:', err);
      }
    });
  }

  // Logout action
  logout(): void {
    this.router.navigate(['login']);
  }
}
