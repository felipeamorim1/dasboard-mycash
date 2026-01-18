import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CategoryCard } from './CategoryCard';

export function CategoryCarousel() {
    const { expensesByCategory } = useFinance();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200; // Approx card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Use mouse wheel for horizontal scroll
    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            // Prevent page vertical scroll only if we are actually scrolling horizontally
            // But usually, shift+wheel is standard for horizontal. 
            // The prompt says "Mouse wheel horizontal". 
            // If user uses just vertical wheel, we translate it to horizontal.
            if (e.deltaY !== 0) {
                // e.preventDefault(); // React synthetic events can't simply prevent default for wheel to stop window scroll easily without passive checks, 
                // but we can try just scrolling the div.
                scrollRef.current.scrollLeft += e.deltaY;
            }
        }
    };

    if (expensesByCategory.length === 0) {
        return (
            <div className="w-full p-8 text-center bg-white rounded-card border border-brand-gray-200">
                <p className="text-brand-gray-500">Nenhuma despesa registrada neste período.</p>
            </div>
        );
    }

    return (
        <div className="relative group">
            {/* Left Fade/Button */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border border-brand-gray-200 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 -ml-4"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onWheel={handleWheel}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 -mx-1 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {expensesByCategory.map((cat) => (
                    <CategoryCard
                        key={cat.category}
                        {...cat}
                    />
                ))}
            </div>

            {/* Right Fade/Button */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border border-brand-gray-200 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity -mr-4"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
