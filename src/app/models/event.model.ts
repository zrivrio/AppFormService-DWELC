export interface Event {
  id: number;
  employee: string;
  client: string;
  date: Date;
  title: string;
  description: string;
  type: 'log' | 'warn' | 'error';
  createdDate: Date;
}

  