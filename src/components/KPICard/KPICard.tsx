import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CardKPIVariant = "default" | "positive" | "negative";

export interface CardKPIProps {
    title: string;
    value: string;
    variant?: CardKPIVariant;
}

const valueClassNameByVariant: Record<CardKPIVariant, string> = {
    default: "",
    positive: "text-green-600",
    negative: "text-red-600",
};

const KPICard = ({
        title,
        value,
        variant = "default",
    }: CardKPIProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <div className={cn("text-2xl font-bold", valueClassNameByVariant[variant])}>{value}</div>
            </CardContent>
        </Card>
    )
}

export default KPICard