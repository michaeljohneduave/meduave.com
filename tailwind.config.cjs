/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'dark-bg': '#13151a',
			},
			screens: {
				'xxs': '320px',
				'xs': '430px',
			},
		},
	},
	plugins: [],
	future: {
		// Disable transitions on dark mode toggling
		disableColorOpacityUtilitiesTransition: true,
	}
}
