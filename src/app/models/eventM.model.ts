import { EmployeeM } from "./employeeM.model";

export interface EventM {
    id: number;
    title: string;
    description: string;
    classification: 'log' | 'warn' | 'error';
    employee: EmployeeM;
    client: string;
    date: Date;
    createdAt: Date;
  }