module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.tsx', './src/**/*.html'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        foreground: 'var(--color-foreground)',
        'foreground-100': 'var(--color-foreground-100)',
        'foreground-200': 'var(--color-foreground-200)',
        'foreground-300': 'var(--color-foreground-300)',
        'foreground-400': 'var(--color-foreground-400)',
        'background-700': 'var(--color-background-700)',
        'background-800': 'var(--color-background-800)',
        'background-900': 'var(--color-background-900)',
        'primary-400': 'var(--color-primary-400)',
        'primary-500': 'var(--color-primary-500)',
        'primary-600': 'var(--color-primary-600)',
        'primary-700': 'var(--color-primary-700)',
        'primary-800': 'var(--color-primary-800)',
        gold: {
          400: '#daa520',
          500: '#b78846',
          600: '#a57a3f',
          700: '#6e522a',
          800: '#523d20',
          900: '#372915',
        },
      },
      spacing: {
        full: '100%',
        '1/24': '4.166666%',
      },
      width: {
        7.5: '1.875rem',
        88: '22rem',
      },
      minHeight: {
        52: '13rem',
      },
      inset: {
        '1/2': '50%',
      },
      borderWidth: {
        10: '10px',
      },
      fill: {
        transparent: 'rgba(0, 0, 0, 0)',
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark'],
      fontWeight: ['hover'],
      maxWidth: ['focus'],
      width: ['hover'],
      height: ['hover'],
      lineHeight: ['hover'],
      fill: ['hover'],
      stroke: ['hover'],
    },
  },
};
