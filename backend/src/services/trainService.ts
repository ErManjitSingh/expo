export interface TrainSearchParams {
  from: string;
  to: string;
  date: string;
}

export async function searchTrains(_params: TrainSearchParams): Promise<unknown[]> {
  throw new Error('Train search service is not connected yet');
}
