import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
      <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden">

        {/* ЛЕВОЕ БОКОВОЕ МЕНЮ (Sidebar) */}
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
                <span>📊</span> Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
                <span>💳</span> Transactions
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
                <span>🎯</span> Budget
              </Button>
            </nav>
          </div>

          <div className="text-xs text-slate-400 border-t border-slate-100 pt-4">
            v1.0.0 · Portfolio ready
          </div>
        </aside>

        {/* ГЛАВНАЯ РАБОЧАЯ ОБЛАСТЬ (Main Content) */}
        <main className="flex-1 flex flex-col overflow-y-auto">

          {/* Хедер страницы */}
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
            <h1 className="text-lg font-semibold text-slate-800">Financial Status Overview</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Hello, Developer!</span>
              <div className="h-8 w-8 rounded-full bg-slate-200" />
            </div>
          </header>

          {/* Контент дашборда */}
          <div className="p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* Временные KPI карточки для проверки UI */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450.00</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Monthly Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+$3,200.00</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Monthly Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">-$1,450.00</div>
                </CardContent>
              </Card>
            </div>

            {/* Сюда на следующем шаге мы вставим графики и таблицы */}
            <Card className="h-96 flex items-center justify-center border-dashed">
              <p className="text-slate-400">Place for future Recharts graphs</p>
            </Card>

          </div>
        </main>

      </div>
  );
}