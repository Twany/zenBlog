import typography from '@tailwindcss/typography';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        display: ['Oswald', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          cyan: '#2563EB',
          dark: '#0F172A',
          slate: '#1e293b',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.brand.cyan'),
              fontWeight: '700',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.brand.dark'),
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.brand.dark'),
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '700',
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '2px 4px',
              borderRadius: '4px',
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: theme('colors.brand.slate'),
              color: theme('colors.gray.100'),
              borderRadius: '8px',
            },
          },
        },
      }),
    },
  },
  plugins: [typography, lineClamp],
};
