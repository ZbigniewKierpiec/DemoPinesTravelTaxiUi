import { Injectable, OnInit } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;
  private locationSubject: Subject<{ latitude: number; longitude: number }> =
    new Subject();
  private isConnected = false;

  constructor() {}

  // ✅ Start the SignalR connection
  public async startConnection(): Promise<void> {
    if (this.hubConnection && this.isConnected) {
      console.warn('SignalR is already connected');
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7202/driverHub', {
        withCredentials: false, // Set to true if using authentication
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      this.isConnected = true;
      console.log('✅ SignalR connection started');
    } catch (error) {
      console.error('❌ Error starting SignalR connection:', error);
    }
  }

  // ✅ Send driver's location to backend
  public sendLocation(latitude: number, longitude: number): void {
    if (this.isConnected) {
      this.hubConnection
        .invoke('SendDriverLocation', latitude, longitude)
        .then(() => console.log('📡 Location sent:', latitude, longitude))
        .catch((err) => console.error('❌ Error sending location:', err));
    } else {
      console.warn('❗ Cannot send location, SignalR is not connected');
    }
  }

  // ✅ Receive location updates from the backend
  // public receiveLocation(callback: (latitude: number, longitude: number) => void): void {
  //   if (!this.hubConnection) {
  //     console.error('❌ SignalR connection is not initialized.');
  //     return;
  //   }

  //   this.hubConnection.on('ReceiveLocationUpdate', (latitude: number, longitude: number) => {
  //     console.log('📍 Location received from server:', latitude, longitude);
  //     callback(latitude, longitude);
  //   });
  // }
  /////////////////////

  // Method to receive location updates as an Observable
  public receiveLocation(): Observable<{
    latitude: number;
    longitude: number;
  }> {
    if (!this.hubConnection) {
      console.error('❌ SignalR connection is not initialized.');
      return new Observable((observer) => {
        observer.complete(); // Complete the observable immediately when connection is not initialized
      });
    }

    // Listen for location updates from the server
    this.hubConnection.on(
      'ReceiveLocationUpdate',
      (latitude: number, longitude: number) => {
        console.log('📍 Location received from server:', latitude, longitude);
        this.locationSubject.next({ latitude, longitude });
      }
    );

    return this.locationSubject.asObservable(); // Return the observable stream
  }

  ////////////////////////
  // ✅ Stop SignalR connection
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => {
          this.isConnected = false;
          console.log('⏹️ SignalR connection stopped');
        })
        .catch((err) =>
          console.error('❌ Error stopping SignalR connection:', err)
        );
    }
  }
}
