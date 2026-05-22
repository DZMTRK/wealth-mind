import { Button } from "@/shared/ui";

export const Sidebar = () => {
  return (
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
  );
};
