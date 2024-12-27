import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  serviceId: number;
  serviceName: string;
  serviceDate: string;
  serviceTasks: Task[];
}

export interface Task {
  taskId: number;
  taskName: string;
  description: string;
  remarks: string;
}
export interface User {
  userId: number,
  firstName: string,
  lastName: string,
  token: string,
  username: string,
  passwordHash: string,
  email:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `https://localhost:7105/api/`;  // Adjust this URL to match your API

  constructor(private http: HttpClient) { }

  // Get all services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/service`);
  }

  // Get a specific service by ID
  getService(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/service/${id}`);
  }

  // Create a new service
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/service`, service);
  }

  // Update an existing service
  updateService(id: number, service: Service): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/service/${id}`, service);
  }

  // Delete a service
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/service/${id}`);
  }
  login(email: string, password: string): Observable<User> {
    const loginUrl = `${this.apiUrl}/auth/signin`;
    const payload = { email, password };
    return this.http.post<any>(loginUrl, payload);
  }
}
