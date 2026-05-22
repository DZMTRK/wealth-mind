import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IncomeExpenseChartProps {
  chartData: any[];
}

export const IncomeExpenseChart = ({ chartData }: IncomeExpenseChartProps) => {
  return (
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
              <Tooltip formatter={(value) => `$${value}`} />
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
  );
};
