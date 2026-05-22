import { useState } from "react";
import {useForm, useWatch} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui";
import { Button } from "@/shared/ui";
import type { TransactionCategory } from "@/entities/finance";
import { Plus } from "lucide-react"; // Иконка плюсика

const today = new Date().toISOString().slice(0, 10);

const transactionCategories = [
    "Salary",
    "Freelance",
    "Food & Groceries",
    "Rent & Utilities",
    "Entertainment",
    "Transport",
    "Running & Sports",
] as const satisfies readonly TransactionCategory[];

const transactionSchema = z.object({
    amount: z.number({ error: "Enter a valid number" }).positive("Amount must be greater than zero"),
    type: z.enum(["income", "expense"] as const),
    category: z.enum(transactionCategories, { error: "Select a category" }),
    date: z.string().min(1, "Select a date"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    accountId: z.string().min(1, "Select an account"),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
    onAddTransaction: (data: TransactionFormValues) => void;
}

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
    // State for controlled dialog closing
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: 0,
            type: "expense",
            category: "Food & Groceries",
            date: today,
            description: "",
            accountId: "acc-1",
        },
    });

    const currentType = useWatch({
        control,
        name: "type",
    });

    const categories: TransactionCategory[] = currentType === "income"
        ? ["Salary", "Freelance"]
        : ["Food & Groceries", "Rent & Utilities", "Entertainment", "Transport", "Running & Sports"];

    const onSubmit = (data: TransactionFormValues) => {
        onAddTransaction(data);
        reset({
            amount: NaN,
            type: currentType,
            category: currentType === "income" ? "Salary" : "Food & Groceries",
            date: today,
            description: "",
            accountId: "acc-1",
        });
        setIsOpen(false); // Automatically close the dialog after successful submission
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            {/* Trigger button that opens the dialog */}
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm font-medium">
                    <Plus className="h-4 w-4" /> Add transaction
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-800">New transaction</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm mt-2">

                    {/* Transaction type */}
                    <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center justify-center gap-2 p-2 border border-slate-200 rounded-md cursor-pointer text-slate-600 font-medium has-[:checked]:bg-red-50 has-[:checked]:border-red-500 has-[:checked]:text-red-700">
                            <input type="radio" value="expense" {...register("type")} className="sr-only" />
                            Expense
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2 border border-slate-200 rounded-md cursor-pointer text-slate-600 font-medium has-[:checked]:bg-green-50 has-[:checked]:border-green-500 has-[:checked]:text-green-700">
                            <input type="radio" value="income" {...register("type")} className="sr-only" />
                            Income
                        </label>
                    </div>

                    {/* Amount and date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">Amount ($)</label>
                            <input
                                type="number"
                                step="10"
                                min="0"
                                {...register("amount", { valueAsNumber: true })}
                                className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            />
                            {errors.amount && <p className="text-xs text-red-500 font-medium">{errors.amount.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">Date</label>
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            />
                            {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date.message}</p>}
                        </div>
                    </div>

                    {/* Category and account */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">Category</label>
                            <select
                                {...register("category")}
                                className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-xs text-red-500 font-medium">{errors.category.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">Account</label>
                            <select
                                {...register("accountId")}
                                className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="acc-1">Main card</option>
                                <option value="acc-2">Cash</option>
                                <option value="acc-3">Savings account</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500">Transaction description</label>
                        <input
                            type="text"
                            placeholder="Example: Grocery shopping"
                            {...register("description")}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                        {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default TransactionForm;