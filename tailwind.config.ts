
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				nova: {
					red: '#8a0303',             // Rojo intenso como en la imagen
					brightRed: '#c41212',       // Rojo brillante para acentos
					darkRed: '#4A0808',         // Rojo más oscuro para fondos
					gold: '#d4af37',            // Dorado para detalles
					black: '#0a0a0a',           // Negro profundo para fondos
					darkGray: '#1a1a1a',        // Gris oscuro para elementos secundarios
					gray: '#333333',            // Gris para bordes
					lightGray: '#666666',       // Gris claro para textos secundarios
				}
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				gothic: ['Poppins', 'sans-serif'],   // Cambiado de Cinzel a Poppins para estilo más family-friendly
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				nova: '0px',                  // Bordes rectos como en la imagen
			},
			boxShadow: {
				nova: '0 8px 24px rgba(138, 3, 3, 0.4)', // Sombra roja
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' },
				},
				'confetti': {
					'0%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
				},
				'wave': {
					'0%, 100%': { 
						backgroundPosition: '0% 50%',
					},
					'50%': { 
						backgroundPosition: '100% 50%',
					}
				},
				'particle': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translate(var(--tx), var(--ty)) rotate(var(--r))', opacity: '0' },
				},
				'glowing': {
					'0%': { boxShadow: '0 0 5px #8a0303' },
					'50%': { boxShadow: '0 0 20px #8a0303' },
					'100%': { boxShadow: '0 0 5px #8a0303' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'confetti': 'confetti 2s forwards',
				'wave': 'wave 8s ease infinite',
				'particle': 'particle 1.5s forwards',
				'glowing': 'glowing 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
