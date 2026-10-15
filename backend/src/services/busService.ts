export interface BusSearchParams {
  from: string;
  to: string;
  date: string;
}

export async function searchBuses(_params: BusSearchParams): Promise<unknown[]> {
  throw new Error('Bus search service is not connected yet');
}
