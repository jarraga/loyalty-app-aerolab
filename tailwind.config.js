const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.vue'],
        options: {
            keyframes: true,
        }
    },
    darkMode: false, // or 'media' or 'class'
    corePlugins: {
        // preflight: false,
    },
    theme: {
        extend: {
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
                hover: 'inset  0 0 0px 4px rgba(59, 130, 246, .5);',
                hoverSmall: 'inset  0 0 0px 2px rgba(59, 130, 246, .5);'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        // require('@tailwindcss/line-clamp'),
    ],
}
