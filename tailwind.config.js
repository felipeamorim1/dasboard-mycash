/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'md': '768px',   // Tablet base
            'lg': '1280px',  // Desktop base
            'xl': '1920px',  // Wide / 4K
        },
        extend: {
            colors: {
                // --- PRIMITIVES (Base Palette) ---
                'lime-brand': '#CCFF00', // The core brand color
                'black-brand': '#000000',
                'gray-900': '#111827',
                'gray-500': '#6B7280',
                'gray-200': '#E5E7EB',
                'gray-50': '#F9FAFB',
                'white': '#FFFFFF',
                'green-success': '#22C55E',
                'red-danger': '#EF4444',

                // --- SEMANTICS (Contextual Usage - ANTIGRAVITY) ---
                'brand-lime': '#CCFF00', // Primary brand color
                'brand-black': '#000000',

                // Brand Gray Scale (Complete spectrum for UI)
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

                // UI Semantics
                'ui-bg': '#F9FAFB',        // Main background
                'ui-card': '#FFFFFF',      // Card background
                'ui-border': '#E5E7EB',    // Borders

                // Text Semantics
                'text-primary': '#111827', // Main titles
                'text-secondary': '#6B7280', // Subtitles/Descriptions
                'text-inverse': '#FFFFFF',   // Text on dark backgrounds

                // Status Semantics
                'status-success': '#22C55E',
                'status-danger': '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'card': '1.5rem', // rounded-3xl for widgets
                'pill': '9999px', // rounded-full for buttons
            },
            maxWidth: {
                'desktop': '1400px',
                'wide': '1600px',
            }
        },
    },
    plugins: [],
}
