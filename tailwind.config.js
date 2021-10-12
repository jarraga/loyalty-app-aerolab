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
                main: '300px 1fr',
            },
            gridTemplateRows: {

            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        // require('@tailwindcss/line-clamp'),
    ],
}
