import { defineConfig } from '@pandacss/dev'

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,ts,tsx,svelte}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			keyframes: {
				toLeft: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				fadein: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				fadeout: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				slideFromRight: {
					'0%': { transform: 'translateX(30px)' },
					'100%': { transform: 'translateX(0)' }
				},
				slideToLeft: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-30px)' }
				}
			},
			tokens: {
				fonts: {
					basic: { value: 'Shippori Mincho B1' }
				},
				colors: {
					brand: { value: '#DE9726' },
					danger: {
						value: '#E61E12',
						description: 'Color for errors'
					}
				},
				animations: {
					slide: {
						value: 'toLeft 22s linear infinite'
					},
					fadeIn: {
						value: 'fadeIn 210ms cubic-bezier(0, 0, 0.2, 1) both'
					},
					fadeOut: {
						value: 'fadeOut 90ms cubic-bezier(0.4, 0, 1, 1) both'
					},
					slideFromRight: {
						value: 'slideFromRight 300ms cubic-bezier(0.4, 0, 0.2, 1) both'
					},
					slideToLeft: {
						value: 'slideToLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) both'
					}
				}
			}
		}
	},

	// The output directory for your css system
	outdir: 'styled-system'
})
