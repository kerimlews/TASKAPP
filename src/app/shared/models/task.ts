import { EStatus } from '../enums/status.enum';

export class Task {
    id: string;
    name: string;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    startedAt: Date;
    timeCompleted: string;
    timeSpent: string;
    tags: string[];
    userId: string;
}
