import { KPICard } from "@/entities/finance";
import type { CardKPIVariant } from "@/entities/finance/ui/KPICard";

interface KPI {
  title: string;
  value: string;
  variant: CardKPIVariant;
}

interface KPIOverviewProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const KPIOverview = ({ totalBalance, totalIncome, totalExpenses }: KPIOverviewProps) => {
  const cardData: KPI[] = [
    { title: "Total Balance", value: `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, variant: "default" },
    { title: "Monthly Income", value: `$${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, variant: "positive" },
    { title: "Monthly Expenses", value: `$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, variant: "negative" },
  ];

  return (
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
  );
};
