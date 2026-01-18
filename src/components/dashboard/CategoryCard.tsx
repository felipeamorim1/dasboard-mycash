import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CategoryCardProps {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

export function CategoryCard({ category, amount, percentage, color }: CategoryCardProps) {
    const data = [
        { name: 'Value', value: percentage },
        { name: 'Rest', value: 100 - percentage },
    ];

    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    }).format(amount);

    return (
        <div className="flex-shrink-0 w-48 p-4 bg-white rounded-xl border border-brand-gray-200 shadow-sm flex flex-col items-center gap-3 snap-start hover:border-brand-gray-300 transition-colors group cursor-pointer">
            <div className="relative w-16 h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={24}
                            outerRadius={32}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="#f3f4f6" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-black">{percentage}%</span>
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm font-medium text-brand-gray-600 truncate max-w-[10rem]" title={category}>{category}</p>
                <p className="text-lg font-bold text-brand-black">{formattedAmount}</p>
            </div>
        </div>
    );
}
