import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";
import { type Transaction } from "@/entities/finance";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[360px] overflow-y-auto">
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="text-slate-500 text-xs">{tx.date}</TableCell>
                  <TableCell className="font-medium text-slate-700">{tx.description}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No history operations for this period
          </div>
        )}
      </CardContent>
    </Card>
  );
};
