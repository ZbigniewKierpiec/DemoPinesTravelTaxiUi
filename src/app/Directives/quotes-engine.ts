// calculateDistance() {
//   this.distanceService
//     .getDistancia(this.origen, this.destino)
//     .then((distance) => {
//       this.distanceInMiles = distance / 1609.34; // Convert distance from meters to miles
//       console.log('Distance (in miles):', this.distanceInMiles.toFixed(1));

//       // Check for fixed prices based on origin or destination
//       const isHeathrow =
//         this.origen.toLowerCase().includes('heathrow') ||
//         this.destino.toLowerCase().includes('heathrow');
//       const isGatwick =
//         this.origen.toLowerCase().includes('gatwick') ||
//         this.destino.toLowerCase().includes('gatwick');
//       const isLuton =
//         this.origen.toLowerCase().includes('luton') ||
//         this.destino.toLowerCase().includes('luton');
//       const isStansted =
//         this.origen.toLowerCase().includes('stansted') ||
//         this.destino.toLowerCase().includes('stansted');
//       const isReading =
//         this.origen.toLowerCase().includes('reading') ||
//         this.destino.toLowerCase().includes('reading');
//       const isWokingham =
//         this.origen.toLowerCase().includes('wokingham') ||
//         this.destino.toLowerCase().includes('wokingham');

//       if (isHeathrow) {
//         // Fixed cost for Heathrow
//         this.totalCostMerce = 55.0;
//         this.totalCostIOniq = 55.0;
//       } else if (isGatwick || isLuton) {
//         // Fixed cost for Gatwick and Luton
//         this.totalCostMerce = 90.0;
//         this.totalCostIOniq = 90.0;
//       } else if (isStansted) {
//         // Fixed cost for Stansted
//         this.totalCostMerce = 140.0;
//         this.totalCostIOniq = 140.0;
//       } else if (isReading) {
//         // Fixed cost for Reading Station
//         this.totalCostMerce = 27.0;
//         this.totalCostIOniq = 27.0;
//       } else if (isWokingham) {
//         // Fixed cost for Wokingham
//         this.totalCostMerce = 15.0;
//         this.totalCostIOniq = 15.0;
//       } else {
//         // Calculate the cost based on distance
//         this.totalCostMerce = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00
//         this.totalCostIOniq = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00

//         // Ensure cost is at least £7.00
//         if (this.totalCostMerce < 7.0) {
//           this.totalCostMerce = 7.0;
//         }

//         if (this.totalCostIOniq < 7.0) {
//           this.totalCostIOniq = 7.0;
//         }
//       }

//       // Apply a 10% discount to totalCostIOniq
//       const discount = this.totalCostIOniq * 0.1;
//       this.totalCostIOniq -= discount;

//       // Rounding logic
//       this.totalCostMerce = this.roundCost(this.totalCostMerce);
//       this.totalCostIOniq = this.roundCost(this.totalCostIOniq);

//       // Format the costs to two decimal places
//       this.totalCostMerce = this.totalCostMerce.toFixed(2);
//       this.totalCostIOniq = this.totalCostIOniq.toFixed(2);

//       console.log('Total cost for Merce: £', this.totalCostMerce);
//       console.log(
//         'Total cost for IOniq after 10% discount: £',
//         this.totalCostIOniq
//       );
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
