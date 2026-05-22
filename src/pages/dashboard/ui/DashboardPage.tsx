import { useFinanceData } from "@/entities/finance";
import { TransactionForm } from "@/features/add-transaction";
import { Sidebar } from "@/widgets/sidebar";
import { KPIOverview } from "@/widgets/kpi-overview";
import { IncomeExpenseChart } from "@/widgets/income-expense-chart";
import { ExpenseBreakdown } from "@/widgets/expense-breakdown";
import { TransactionHistory } from "@/widgets/transaction-history";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

export default function DashboardPage() {
  const {
    transactions,
    totalBalance,
    totalIncome,
    totalExpenses,
    selectedMonth,
    setSelectedMonth,
    categoryData,
    addTransaction,
  } = useFinanceData();

  const dailyDataMap: Record<string, { date: string; income: number; expense: number }> = {};

  transactions.forEach((transaction) => {
    const day = transaction.date.split("-")[2]!;

    if (!dailyDataMap[day]) {
      dailyDataMap[day] = { date: `Day ${day}`, income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      dailyDataMap[day].income += transaction.amount;
    } else {
      dailyDataMap[day].expense += transaction.amount;
    }
  });

  const chartData = Object.values(dailyDataMap).sort((a, b) => a.date.localeCompare(b.date));

  const coloredCategoryData = categoryData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
      <div className="flex min-h-dvh w-full bg-slate-50 text-slate-900 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
            <h1 className="text-lg font-semibold text-slate-800">Financial Status Overview</h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">Period:</span>
                <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="bg-white border border-slate-200 rounded-md p-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="2026-05">May 2026</option>
                  <option value="2026-04">April 2026</option>
                  <option value="2026-03">March 2026</option>
                </select>
              </div>

              <TransactionForm onAddTransaction={addTransaction} />

              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <span className="text-sm text-slate-500 font-medium">Hello, Developer!</span>
                <div
                    role="img"
                    aria-label="User avatar"
                    className="h-8 w-8 rounded-full bg-slate-200"
                />
              </div>
            </div>
          </header>

          <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
            <KPIOverview 
              totalBalance={totalBalance} 
              totalIncome={totalIncome} 
              totalExpenses={totalExpenses} 
            />

            <div className="grid gap-6 md:grid-cols-3">
              <IncomeExpenseChart chartData={chartData} />
              <ExpenseBreakdown coloredCategoryData={coloredCategoryData} />
            </div>

            <TransactionHistory transactions={transactions} />
          </div>
        </main>
      </div>
  );
}
