const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.vue'],
        options: {
            keyframes: true,
        }
    },
    darkMode: false,
    corePlugins: {
        preflight: true,
    },
    theme: {
        extend: {
            colors: {
                blue: {
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
                // hover: 'inset  0 0 0px 4px rgba(59, 130, 246, .5);',
                // hoverSmall: 'inset  0 0 0px 2px rgba(59, 130, 246, .5);'
                hover: 'inset  0 0 0px 4px hsla(189, 100%, 55%,.5);',
                hoverSmall: 'inset  0 0 0px 2px hsla(189, 100%, 55%,.5);'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
