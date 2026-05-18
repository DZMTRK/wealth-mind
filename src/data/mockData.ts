import type {Transaction, Account} from '../types/finance';

export const mockAccounts: Account[] = [
    { id: 'acc-1', name: 'Основная карта', type: 'card', balance: 4250, currency: 'USD' },
    { id: 'acc-2', name: 'Наличные', type: 'cash', balance: 350, currency: 'USD' },
    { id: 'acc-3', name: 'Сберегательный счет', type: 'savings', balance: 7850, currency: 'USD' },
];

export const mockTransactions: Transaction[] = [
    // Май 2026
    { id: 't-1', amount: 3200, type: 'income', category: 'Salary', date: '2026-05-10', description: 'Основная зарплата', accountId: 'acc-1' },
    { id: 't-2', amount: 120, type: 'expense', category: 'Food & Groceries', date: '2026-05-12', description: 'Закупка в супермаркете', accountId: 'acc-1' },
    { id: 't-3', amount: 85, type: 'expense', category: 'Running & Sports', date: '2026-05-14', description: 'Новые беговые кроссовки', accountId: 'acc-1' },
    { id: 't-4', amount: 450, type: 'expense', category: 'Rent & Utilities', date: '2026-05-15', description: 'Аренда квартиры и коммуналка', accountId: 'acc-1' },
    { id: 't-5', amount: 40, type: 'expense', category: 'Transport', date: '2026-05-16', description: 'Заправка авто', accountId: 'acc-2' },

    // Апрель 2026
    { id: 't-10', amount: 3200, type: 'income', category: 'Salary', date: '2026-04-10', description: 'Зарплата за апрель', accountId: 'acc-1' },
    { id: 't-11', amount: 500, type: 'income', category: 'Freelance', date: '2026-04-18', description: 'Разработка лендинга', accountId: 'acc-3' },
    { id: 't-12', amount: 150, type: 'expense', category: 'Entertainment', date: '2026-04-20', description: 'Ужин с семьей в ресторане', accountId: 'acc-1' },
    { id: 't-13', amount: 60, type: 'expense', category: 'Food & Groceries', date: '2026-04-22', description: 'Продукты', accountId: 'acc-2' },
    { id: 't-14', amount: 30, type: 'expense', category: 'Transport', date: '2026-04-25', description: 'Поездки на такси', accountId: 'acc-1' },

    // Март 2026
    { id: 't-20', amount: 3000, type: 'income', category: 'Salary', date: '2026-03-10', description: 'Зарплата за март', accountId: 'acc-1' },
    { id: 't-21', amount: 95, type: 'expense', category: 'Running & Sports', date: '2026-03-15', description: 'Взнос за полумарафон', accountId: 'acc-1' },
    { id: 't-22', amount: 110, type: 'expense', category: 'Food & Groceries', date: '2026-03-18', description: 'Гипермаркет', accountId: 'acc-1' },
    { id: 't-23', amount: 200, type: 'expense', category: 'Entertainment', date: '2026-03-28', description: 'Концерт', accountId: 'acc-2' },
];