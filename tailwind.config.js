const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.vue'],
        options: {
            keyframes: true,
        },
        safelist: [
            'from-cyan-500',
            'from-blue-500',
            'from-purple-500',
            'from-green-500',
            'from-pink-500',
            'bg-cyan-500',
            'bg-blue-500',
            'bg-purple-500',
            'bg-green-500',
            'bg-pink-500',
            'ring-cyan-500',
            'ring-blue-500',
            'ring-purple-500',
            'ring-green-500',
            'ring-pink-500',
            'text-cyan-700',
            'text-blue-700',
            'text-purple-700',
            'text-green-700',
            'text-pink-700',
            'hover:shadow-cyan',
            'hover:shadow-blue',
            'hover:shadow-purple',
            'hover:shadow-green',
            'hover:shadow-pink',
        ]
    },
    darkMode: false,
    corePlugins: {
        preflight: true,
    },
    theme: {
        extend: {
            colors: {
                cyan: {
                    100: 'hsl(189, 100%, 95%)',
                    200: 'hsl(189, 100%, 85%)',
                    300: 'hsl(189, 100%, 75%)',
                    400: 'hsl(189, 100%, 65%)',
                    500: 'hsl(189, 100%, 55%)',
                    600: 'hsl(189, 100%, 45%)',
                    700: 'hsl(189, 100%, 35%)',
                    800: 'hsl(189, 100%, 25%)',
                    900: 'hsl(189, 100%, 15%)'
                }
            },
            spacing: {
                'half': '12px',
                'space': '24px',
            },
            gridTemplateColumns: {
                main: '300px 1fr'
            },
            gridTemplateRows: {
                results: '1fr auto'
            },
            borderRadius: {
                main: '1rem',
                half: '.5rem'
            },
            boxShadow: {
                cyan: 'inset 0 0 0 4px #1ADDFF80',
                blue: 'inset 0 0 0 4px #3B82F680',
                purple: 'inset 0 0 0 4px #8B5CF680',
                green: 'inset 0 0 0 4px #10B98180',
                pink: 'inset 0 0 0 4px #EC489980'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
