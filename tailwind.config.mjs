import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
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
            p: {
              fontSize: '1.0625rem',
              lineHeight: '1.85',
              marginTop: '1.05em',
              marginBottom: '1.05em',
            },
            li: {
              fontSize: '1.0625rem',
              lineHeight: '1.8',
            },
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
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '400',
              letterSpacing: '0',
            },
            h1: {
              fontSize: '2rem',
              lineHeight: '2.5rem',
              marginTop: '2.2rem',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.5rem',
              lineHeight: '2rem',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            h3: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            h4: {
              fontSize: '1.125rem',
              lineHeight: '1.5rem',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              fontSize: '1.0625rem',
              lineHeight: '1.8',
              fontStyle: 'normal',
              borderLeftColor: theme('colors.brand.cyan'),
            },
            code: {
              color: theme('colors.brand.dark'),
              backgroundColor: theme('colors.slate.100'),
              padding: '2px 4px',
              borderRadius: '2px',
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: theme('colors.brand.slate'),
              color: theme('colors.gray.100'),
              borderRadius: '2px',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
