export interface EssayFormData {
  title: string;
  content: string;
  targetBandScore: string;
}

export interface EssayResult {
  id: string;
  title: string;
  targetBandScore: string;
  content: string;
  bandScore: string;
  feedback: string;
  createdAt: string;
}

export interface EssayHistory {
  essays: EssayResult[];
  page: number;
  pageSize: number;
}