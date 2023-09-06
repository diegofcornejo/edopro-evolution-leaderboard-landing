/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			...colors,
			transparent: 'transparent',
			current: 'currentColor',
			'white': '#ffffff',
			'black': '#000000',
			'offwhite': '#ECF2FF',
			'bluish': '#B4C7ED',
			'navyblue': '#13224f',
			'lightwhite': '#d0d3db',
			'darkblue': '#091945',
			'green': '#139277',
			'red': '#c92a8f',
			'lightblue': '#8A9BCA',
			'blue': '#0C1B44',
			'purple': '#BD24DF',
			'lightpurple': '#BFACBC',
			'darkpurple': '#291545',
			'buttonblue': '#2D6ADE',
		},
		fontSize: {
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.875rem', { lineHeight: '1.25rem' }],
			base: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '2rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '1.25' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '1.25' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1.25rem' }],
		},
		extend: {
			animation: {
				marquee: 'marquee var(--duration) linear infinite',
				meteor: 'meteor 5s linear infinite',
				'text-gradient': 'text-gradient 1.5s linear infinite',
				spin: 'spin calc(var(--speed) * 2) infinite linear',
				slide: 'slide var(--speed) ease-in-out infinite alternate'
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
				},
				'text-gradient': {
					to: {
						backgroundPosition: '200% center'
					}
				},
				spin: {
					'0%': {
						rotate: '0deg'
					},
					'15%, 35%': {
						rotate: '90deg'
					},
					'65%, 85%': {
						rotate: '270deg'
					},
					'100%': {
						rotate: '360deg'
					}
				},
				slide: {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				},
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
					'70%': { opacity: 1 },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: 0
					}
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: []
}
