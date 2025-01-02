import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceServiceService {

  private google: any;

  constructor() {
    // Zakładamy, że Google Maps API jest załadowane w pliku index.html
    this.google = window['google'];
  }

  getDistancia(origen: string, destino: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const service = new this.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origen],            // Punkt początkowy (np. adres)
          destinations: [destino],      // Punkt docelowy (np. adres)
          travelMode: this.google.maps.TravelMode.DRIVING, // Tryb podróży
        },
        (response: any, status: string) => {
          if (status === this.google.maps.DistanceMatrixStatus.OK) {
            // Jeśli status jest OK, pobierz odległość
            const distance = response.rows[0].elements[0].distance.value;
            resolve(distance);  // Odległość w metrach
          } else {
            // W przypadku błędu, odrzuć obietnicę
            reject('Error fetching distance: ' + status);
          }
        }
      );
    });
  }


}
