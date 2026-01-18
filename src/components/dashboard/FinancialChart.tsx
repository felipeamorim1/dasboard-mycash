import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { name: '01', income: 4000, expense: 2400 },
    { name: '05', income: 3000, expense: 1398 },
    { name: '10', income: 2000, expense: 9800 },
    { name: '15', income: 2780, expense: 3908 },
    { name: '20', income: 1890, expense: 4800 },
    { name: '25', income: 2390, expense: 3800 },
    { name: '30', income: 3490, expense: 4300 },
];

export function FinancialChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-brand-gray-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-brand-gray-900">Fluxo Financeiro</h3>
                <select className="text-sm border border-brand-gray-200 rounded px-2 py-1 bg-brand-gray-50 focus:outline-none cursor-pointer">
                    <option>Últimos 30 dias</option>
                    <option>Este ano</option>
                </select>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3} /> {/* brand-lime */}
                                <stop offset="95%" stopColor="#ccff00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /> {/* red-500 */}
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(val) => `R$${val / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#ccff00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            name="Receitas"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            name="Despesas"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
