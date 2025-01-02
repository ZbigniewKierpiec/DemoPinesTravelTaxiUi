import { Data } from 'ws';

export interface AddBookingRequest {
  pickupLocation: string; // Pickup location (e.g., address)
  dropoffLocation: string; // Drop-off location (e.g., address)
  pickupTime: string; // Time when the taxi is scheduled to pick up (ISO 8601 string format)
  via?: string; // Optional via location (optional stop)
  passengers: string; // Number of passengers
  louggages: string; // Number of luggages
  greet: boolean; // Whether the user wants a greet at the pickup
  price: number; // Estimated price for the taxi ride
  carType: string; // Preferred car type (e.g., sedan, SUV)
  carImage?: string; // Image of the car (optional)
  name: string; // Customer's name
  phoneNumber: string; // Customer's phone number
  email: string; // Customer's email address
  driverInstruction?: string; // Any specific instructions for the driver (optional)
  bookedAt?:string;
  
}
