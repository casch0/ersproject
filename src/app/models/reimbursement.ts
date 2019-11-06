export class Reimbursement {
    id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    receipt: Blob;
    author: string;
    resolver: string;
    status: string;
    type: string;
}