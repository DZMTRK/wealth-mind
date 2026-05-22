export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
    | 'Salary'
    | 'Freelance'
    | 'Food & Groceries'
    | 'Rent & Utilities'
    | 'Entertainment'
    | 'Transport'
    | 'Running & Sports';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    date: string; // ISO формат YYYY-MM-DD
    description: string;
    accountId: string;
}

export interface Account {
    id: string;
    name: string;
    type: 'card' | 'cash' | 'savings';
    balance: number;
    currency: string;
}