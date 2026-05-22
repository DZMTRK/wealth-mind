import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ExpenseBreakdownProps {
  coloredCategoryData: any[];
}

export const ExpenseBreakdown = ({ coloredCategoryData }: ExpenseBreakdownProps) => {
  return (
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
  );
};
