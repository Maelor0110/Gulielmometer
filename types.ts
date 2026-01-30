
export interface BeautyResult {
  punteggio: number;
  commento: string;
  dettagli: string[];
  titolo: string;
}

export interface AppState {
  image: string | null;
  loading: boolean;
  result: BeautyResult | null;
  error: string | null;
}
