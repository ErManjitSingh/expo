export interface FlightSearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface FlightResult {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  price: number;
}

/** External flight API interface — connect provider later. */
export async function searchFlights(_params: FlightSearchParams): Promise<FlightResult[]> {
  throw new Error('Flight search service is not connected yet');
}
