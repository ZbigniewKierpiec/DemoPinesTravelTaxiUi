import { Injectable, OnInit } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;
  private locationSubject = new Subject<{ latitude: number; longitude: number }>();
  private isConnected = false;

  constructor() {
    this.startConnection(); // Uruchomienie połączenia przy inicjalizacji serwisu
  }

  // ✅ Start SignalR connection
  public async startConnection(): Promise<void> {
    if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      console.warn('⚠️ SignalR is already connected');
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://tracking-guhhf4erdne0h2cg.uksouth-01.azurewebsites.net/driverHub', {
        withCredentials: true, // Obsługa autoryzacji, jeśli wymagana
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // Automatyczne ponawianie połączenia
      .build();

    // 🔄 Obsługa ponownego łączenia
    this.hubConnection.onreconnecting(() => {
      console.warn('🔄 SignalR reconnecting...');
      this.isConnected = false;
    });

    this.hubConnection.onreconnected(() => {
      console.log('✅ SignalR reconnected!');
      this.isConnected = true;
    });

    this.hubConnection.onclose(() => {
      console.error('❌ SignalR connection closed');
      this.isConnected = false;
    });

    try {
      await this.hubConnection.start();
      this.isConnected = true;
      console.log('✅ SignalR connection started');
    } catch (error) {
      console.error('❌ Error starting SignalR connection:', error);
    }
  }

  // ✅ Send driver's location to backend
  public async sendLocation(latitude: number, longitude: number): Promise<void> {
    if (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected
    ) {
      try {
        await this.hubConnection.invoke('SendDriverLocation', latitude, longitude);
        console.log('📡 Location sent:', latitude, longitude);
      } catch (err) {
        console.error('❌ Error sending location:', err);
      }
    } else {
      console.warn('❗ Cannot send location, SignalR is not connected');
    }
  }

  // ✅ Receive location updates as an Observable
  public receiveLocation(): Observable<{ latitude: number; longitude: number }> {
    if (!this.hubConnection) {
      console.error('❌ SignalR connection is not initialized.');
      return new Observable((observer) => observer.complete()); // Zwróć pusty Observable
    }

    this.hubConnection.on('ReceiveLocationUpdate', (latitude: number, longitude: number) => {
      console.log('📍 Location received from server:', latitude, longitude);
      this.locationSubject.next({ latitude, longitude });
    });

    return this.locationSubject.asObservable();
  }

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
