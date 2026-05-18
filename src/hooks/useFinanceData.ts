import { useMemo, useState } from 'react';
import { mockTransactions, mockAccounts } from '../data/mockData';
import type { TransactionCategory } from '../types/finance';

export function useFinanceData() {
    // Состояние для фильтрации
    const [selectedMonth, setSelectedMonth] = useState<string>('2026-05'); // Формат YYYY-MM
    const [selectedAccount, setSelectedAccount] = useState<string>('all');

    // 1. Фильтруем транзакции по месяцу и аккаунту с помощью useMemo
    const filteredTransactions = useMemo(() => {
        return mockTransactions.filter((transaction) => {
            const matchesMonth = transaction.date.startsWith(selectedMonth);
            const matchesAccount = selectedAccount === 'all' || transaction.accountId === selectedAccount;
            return matchesMonth && matchesAccount;
        });
    }, [selectedMonth, selectedAccount]);

    // 2. Считаем KPI (Общий доход и расход за выбранный период) через reduce
    const { totalIncome, totalExpenses } = useMemo(() => {
        return filteredTransactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.totalIncome += transaction.amount;
                } else {
                    acc.totalExpenses += transaction.amount;
                }
                return acc;
            },
            { totalIncome: 0, totalExpenses: 0 }
        );
    }, [filteredTransactions]);

    // 3. Группируем расходы по категориям для PieChart
    const categoryData = useMemo(() => {
        const categoriesMap: Record<TransactionCategory, number> = {} as Record<TransactionCategory, number>;

        filteredTransactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                if (!categoriesMap[t.category]) {
                    categoriesMap[t.category] = 0;
                }
                categoriesMap[t.category] += t.amount;
            });

        // Трансформируем объект в массив, который понимает библиотека графиков Recharts
        return Object.entries(categoriesMap).map(([name, value]) => ({
            name,
            value,
        }));
    }, [filteredTransactions]);

    // Высчитываем общий текущий баланс по всем кошелькам
    const totalBalance = useMemo(() => {
        return mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    }, []);

    return {
        transactions: filteredTransactions,
        accounts: mockAccounts,
        totalBalance,
        totalIncome,
        totalExpenses,
        categoryData,
        selectedMonth,
        setSelectedMonth,
        selectedAccount,
        setSelectedAccount,
    };
}