
export interface MyBookings {
  pickupLocation: string;
  dropoffLocation: string;
  carType: string;
  carImage: string;
  driverInstruction: string;
  email: string;
  greet: string;
  louggages: string;  // Assuming it's a number; change as needed
  name: string;
  passengers: number;
  phoneNumber: string;
  price: number;  // Assuming price is a number
 user:string;
  via: string;
  pickupTime: string;  // Assuming PickupTime is a string (ISO 8601 format)
  userId: string;  // Logged in user's ID
  createdAt: string;  // Created at timestamp (string, formatted date)
  isConfirmes:boolean;
}
