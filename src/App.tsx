import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KPICard, { type CardKPIVariant } from "@/components/KPICard";
import { useFinanceData } from "./hooks/useFinanceData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type KPI = {
  title: string;
  value: string;
  variant: CardKPIVariant;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

export default function App() {
  const {
    transactions,
    totalBalance,
    totalIncome,
    totalExpenses,
    selectedMonth,
    setSelectedMonth,
    categoryData,
  } = useFinanceData();

  const dailyDataMap: Record<string, { date: string; income: number; expense: number }> = {};

  const cardData: KPI[] = [
    { title: "Total Balance", value: `$${totalBalance.toFixed(2)}`, variant: "default" },
    { title: "Monthly Income", value: `$${totalIncome.toFixed(2)}`, variant: "positive" },
    { title: "Monthly Expenses", value: `$${totalExpenses.toFixed(2)}`, variant: "negative" },
  ];

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
        {/* Left sidebar menu */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-bold text-xl tracking-tight">WealthMind</span>
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 bg-slate-100 text-indigo-600 font-medium">
                <span aria-hidden="true">📊</span> Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
                <span aria-hidden="true">💳</span> Transactions
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
                <span aria-hidden="true">🎯</span> Budget
              </Button>
            </nav>
          </div>

          <div className="text-xs text-slate-400 border-t border-slate-100 pt-4">
            v1.0.0 · Portfolio ready
          </div>
        </aside>

        {/* Main workspace */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Page header */}
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
            <h1 className="text-lg font-semibold text-slate-800">Financial Status Overview</h1>

            <div className="flex items-center gap-4">
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

              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Hello, Developer!</span>
                <div
                    role="img"
                    aria-label="User avatar"
                    className="h-8 w-8 rounded-full bg-slate-200"
                />
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* KPI cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {cardData.map((item) => (
                  <KPICard
                      key={item.title}
                      title={item.title}
                      value={item.value}
                      variant={item.variant}
                  />
              ))}
            </div>

            {/* Charts section */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Income and expenses chart */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Monthly Activity Trend
                  </CardTitle>
                </CardHeader>

                <CardContent className="h-80">
                  {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis
                              dataKey="date"
                              tickLine={false}
                              axisLine={false}
                              stroke="#94a3b8"
                              fontSize={12}
                          />
                          <YAxis
                              tickLine={false}
                              axisLine={false}
                              stroke="#94a3b8"
                              fontSize={12}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar
                              dataKey="income"
                              name="Income"
                              fill="#16a34a"
                              radius={[4, 4, 0, 0]}
                          />
                          <Bar
                              dataKey="expense"
                              name="Expenses"
                              fill="#dc2626"
                              radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                  ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                        No transactions for the selected period
                      </div>
                  )}
                </CardContent>
              </Card>

              {/* Expenses by category chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Expense Breakdown
                  </CardTitle>
                </CardHeader>

                <CardContent className="h-80 flex flex-col justify-between">
                  {coloredCategoryData.length > 0 ? (
                      <>
                        <div className="h-56 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                  data={coloredCategoryData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                              />
                              <Tooltip formatter={(value) => `$${value}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Custom legend */}
                        <div className="grid grid-cols-2 gap-2 text-xs overflow-y-auto max-h-20 content-start">
                          {coloredCategoryData.map((item) => (
                              <div key={item.name} className="flex items-center gap-1.5 truncate">
                                <div
                                    className="h-2 w-2 rounded-full shrink-0"
                                    style={{ backgroundColor: item.fill }}
                                />
                                <span className="text-slate-600 truncate">
                            {item.name}: ${item.value}
                          </span>
                              </div>
                          ))}
                        </div>
                      </>
                  ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                        No expenses
                      </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
  );
}