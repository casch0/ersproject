export class Reimbursement {
    id: number;
    amount: number;
    submitted: string;
    resolved: string;
    description: string;
    receipt: Blob;
    author: string;
    resolver: string;
    status: string;
    type: string;
}