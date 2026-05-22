import { useMemo, useState } from 'react';
import { mockTransactions, mockAccounts } from "@/shared/api/mockData";
import type { Transaction, TransactionCategory } from "./types";

export function useFinanceData() {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>(mockTransactions);
    const [selectedMonth, setSelectedMonth] = useState<string>('2026-05');
    const [selectedAccount, setSelectedAccount] = useState<string>('all');

    // Add new transaction function
    const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
        const transactionWithId: Transaction = {
            ...newTx,
            id: `t-${Date.now()}`, // Генерируем временный ID
        };
        setTransactionsList((prev) => [transactionWithId, ...prev]);
    };

    // 1. Filter transactions by month and account using useMemo
    const filteredTransactions = useMemo(() => {
        return transactionsList.filter((transaction) => {
            const matchesMonth = transaction.date.startsWith(selectedMonth);
            const matchesAccount = selectedAccount === 'all' || transaction.accountId === selectedAccount;
            return matchesMonth && matchesAccount;
        });
    }, [transactionsList, selectedMonth, selectedAccount]);

    // 2. Calculate KPI values: total income and expenses for the selected period
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

    // 3. Group expenses by category for the PieChart
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

        // Transform the object into an array format supported by the Recharts library
        return Object.entries(categoriesMap).map(([name, value]) => ({
            name,
            value,
        }));
    }, [filteredTransactions]);

    // Calculate the total current balance across all wallets
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
        addTransaction,
    };
}