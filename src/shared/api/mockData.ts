import type { Transaction, Account } from '@/entities/finance/model/types';

export const mockAccounts: Account[] = [
    { id: 'acc-1', name: 'Main Card', type: 'card', balance: 4250, currency: 'USD' },
    { id: 'acc-2', name: 'Cash', type: 'cash', balance: 350, currency: 'USD' },
    { id: 'acc-3', name: 'Savings Account', type: 'savings', balance: 7850, currency: 'USD' },
];

export const mockTransactions: Transaction[] = [
    // May 2026
    { id: 't-1', amount: 3200, type: 'income', category: 'Salary', date: '2026-05-10', description: 'Main salary', accountId: 'acc-1' },
    { id: 't-2', amount: 120, type: 'expense', category: 'Food & Groceries', date: '2026-05-12', description: 'Supermarket shopping', accountId: 'acc-1' },
    { id: 't-3', amount: 85, type: 'expense', category: 'Running & Sports', date: '2026-05-14', description: 'New running shoes', accountId: 'acc-1' },
    { id: 't-4', amount: 450, type: 'expense', category: 'Rent & Utilities', date: '2026-05-15', description: 'Apartment rent and utilities', accountId: 'acc-1' },
    { id: 't-5', amount: 40, type: 'expense', category: 'Transport', date: '2026-05-16', description: 'Car refueling', accountId: 'acc-2' },

    // April 2026
    { id: 't-10', amount: 3200, type: 'income', category: 'Salary', date: '2026-04-10', description: 'April salary', accountId: 'acc-1' },
    { id: 't-11', amount: 500, type: 'income', category: 'Freelance', date: '2026-04-18', description: 'Landing page development', accountId: 'acc-3' },
    { id: 't-12', amount: 150, type: 'expense', category: 'Entertainment', date: '2026-04-20', description: 'Family dinner at a restaurant', accountId: 'acc-1' },
    { id: 't-13', amount: 60, type: 'expense', category: 'Food & Groceries', date: '2026-04-22', description: 'Groceries', accountId: 'acc-2' },
    { id: 't-14', amount: 30, type: 'expense', category: 'Transport', date: '2026-04-25', description: 'Taxi rides', accountId: 'acc-1' },

    // March 2026
    { id: 't-20', amount: 3000, type: 'income', category: 'Salary', date: '2026-03-10', description: 'March salary', accountId: 'acc-1' },
    { id: 't-21', amount: 95, type: 'expense', category: 'Running & Sports', date: '2026-03-15', description: 'Half marathon entry fee', accountId: 'acc-1' },
    { id: 't-22', amount: 110, type: 'expense', category: 'Food & Groceries', date: '2026-03-18', description: 'Hypermarket', accountId: 'acc-1' },
    { id: 't-23', amount: 200, type: 'expense', category: 'Entertainment', date: '2026-03-28', description: 'Concert', accountId: 'acc-2' },
];