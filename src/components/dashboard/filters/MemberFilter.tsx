import { useFinance } from '../../../context/FinanceContext';

export function MemberFilter() {
    const { members, filters, setFilters } = useFinance();

    const handleSelect = (memberId: string | 'all') => {
        setFilters(prev => ({ ...prev, selectedMember: memberId }));
    };

    return (
        <div className="flex items-center -space-x-3 overflow-hidden py-1">
            {/* 'All' Option */}
            <button
                onClick={() => handleSelect('all')}
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 z-30 hover:z-40 hover:scale-110
                    ${filters.selectedMember === 'all'
                        ? 'bg-brand-black text-brand-lime border-brand-lime shadow-lg'
                        : 'bg-brand-gray-100 text-brand-gray-600 border-white hover:bg-brand-gray-200'}
                `}
                title="Todos"
            >
                <span className="text-xs font-bold">All</span>
            </button>

            {/* Member Avatars */}
            {members.map((member) => {
                const isSelected = filters.selectedMember === member.id;
                return (
                    <button
                        key={member.id}
                        onClick={() => handleSelect(member.id)}
                        className={`
                            w-10 h-10 rounded-full border-2 transition-all duration-200 relative hover:z-50 hover:scale-110
                            ${isSelected
                                ? 'border-brand-lime z-40 shadow-lg scale-110'
                                : 'border-white z-0 opacity-80 hover:opacity-100'}
                        `}
                        title={member.name}
                    >
                        <img
                            src={member.avatarUrl || undefined}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                        {isSelected && (
                            <div className="absolute inset-0 rounded-full ring-2 ring-brand-lime" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
