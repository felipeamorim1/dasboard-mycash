/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'md': '768px',   // Tablet base
            'lg': '1280px',  // Desktop base (Sidebar appears)
            'xl': '1920px',  // Wide / 4K
        },
        extend: {
            colors: {
                // --- PRIMITIVES (Base Palette) ---
                'lime-brand': '#CCFF00', // Core brand color
                'black-brand': '#000000',
                'white': '#FFFFFF',

                // Gray Scale (Tailwind-inspired)
                'gray-50': '#F9FAFB',
                'gray-100': '#F3F4F6',
                'gray-200': '#E5E7EB',
                'gray-300': '#D1D5DB',
                'gray-400': '#9CA3AF',
                'gray-500': '#6B7280',
                'gray-600': '#4B5563',
                'gray-700': '#374151',
                'gray-800': '#1F2937',
                'gray-900': '#111827',
                'gray-950': '#0F172A', // Slate-950 for maximum contrast

                // Status Colors (WCAG compliant)
                'green-success': '#22C55E',   // Green-500
                'green-success-dark': '#15803D', // Green-700 (AA on white)
                'red-danger': '#EF4444',      // Red-500
                'red-danger-dark': '#B91C1C',    // Red-700 (AA on white)

                // --- SEMANTICS (Contextual Usage - ANTIGRAVITY) ---
                'brand-lime': '#CCFF00',
                'brand-lime-dark': '#A3CC00', // Darker lime for better contrast (NEW)
                'brand-black': '#000000',

                // Brand Gray Scale (keep for backwards compatibility)
                'brand-gray-50': '#F9FAFB',
                'brand-gray-100': '#F3F4F6',
                'brand-gray-200': '#E5E7EB',
                'brand-gray-300': '#D1D5DB',
                'brand-gray-400': '#9CA3AF',
                'brand-gray-500': '#6B7280',
                'brand-gray-600': '#4B5563',
                'brand-gray-700': '#374151',
                'brand-gray-800': '#1F2937',
                'brand-gray-900': '#111827',
                'brand-gray-950': '#0F172A', // NEW - enhanced contrast

                // UI Semantics (WCAG AA Enhanced)
                'ui-bg': '#F9FAFB',           // Main background
                'ui-card': '#FFFFFF',         // Card background
                'ui-border': '#E5E7EB',       // Borders
                'ui-border-dark': '#D1D5DB',  // Stronger borders (NEW)

                // Text Semantics (WCAG AA/AAA)
                'text-primary': '#0F172A',    // Slate-950 (AAA contrast - 16.38:1)
                'text-secondary': '#475569',  // Slate-600 (AA - 7.55:1)
                'text-tertiary': '#64748B',   // Slate-500 (AA for large text - 4.85:1)
                'text-inverse': '#FFFFFF',    // Text on dark backgrounds
                'text-lime-accessible': '#5F7300', // Lime variant for AA on white (NEW)

                // Focus & Interactive States
                'focus-ring': '#3B82F6',      // Blue-500 (high visibility)
                'focus-ring-lime': '#84CC16', // Lime-500 (accessible lime)

                // Status Semantics (WCAG AA)
                'status-success': '#22C55E',
                'status-success-text': '#15803D', // For text on white (NEW)
                'status-danger': '#EF4444',
                'status-danger-text': '#B91C1C',  // For text on white (NEW)
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            fontSize: {
                // Enhanced scale (Perfect Fourth - 1.333)
                'xs': ['0.75rem', { lineHeight: '1.4' }],      // 12px
                'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px
                'base': ['1rem', { lineHeight: '1.5' }],       // 16px
                'lg': ['1.125rem', { lineHeight: '1.5' }],     // 18px
                'xl': ['1.5rem', { lineHeight: '1.3' }],       // 24px
                '2xl': ['2rem', { lineHeight: '1.2' }],        // 32px
                '3xl': ['2.625rem', { lineHeight: '1.1' }],    // 42px
                '4xl': ['3.5rem', { lineHeight: '1' }],        // 56px
            },
            borderRadius: {
                'card': '1.5rem',    // rounded-3xl for widgets
                'pill': '9999px',    // rounded-full for buttons
            },
            spacing: {
                // 8pt grid additions
                '4.5': '1.125rem',   // 18px
                '18': '4.5rem',      // 72px
                '22': '5.5rem',      // 88px
            },
            maxWidth: {
                'desktop': '1400px',
                'wide': '1600px',
            },
            minHeight: {
                'touch': '44px',     // WCAG minimum touch target
            },
            minWidth: {
                'touch': '44px',     // WCAG minimum touch target  
            },
            boxShadow: {
                // Refined shadows
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [],
}
