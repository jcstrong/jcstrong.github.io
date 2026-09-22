import { defineConfig, presetUno, presetTypography, presetWebFonts, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      css: {
        'code::before': { content: '""' },
        'code::after': { content: '""' },
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter:400,500', 'Noto Sans SC:400,500'],
        mono: ['JetBrains Mono:400,500', 'Noto Sans Mono CJK SC:400,500'],
      },
    }),
    presetIcons({
      scale: 1.2,
      cdn: 'https://cdn.jsdelivr.net/npm/',
    }),
  ],
  theme: {
    colors: {
      // 严肃风格: 黑白灰 + 单一墨蓝强调色
      ink: {
        50: '#FAFAFA',
        100: '#F1F1F1',
        200: '#E5E5E5',
        300: '#C9C9C9',
        400: '#A0A0A0',
        500: '#6E6E6E',
        600: '#4A4A4A',
        700: '#2C2C2C',
        800: '#1A1A1A',
        900: '#0D0D0D',
      },
      // 单一强调色: 墨蓝
      accent: {
        50: '#EEF2F8',
        100: '#D5DEF0',
        200: '#AEBFE0',
        300: '#7F95C9',
        400: '#4F6BB1',
        500: '#2F4A8C',
        600: '#1F3568',
        700: '#15264B',
        800: '#0E1A35',
        900: '#081120',
      },
    },
    fontFamily: {
      sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Noto Sans Mono CJK SC', 'Menlo', 'monospace'],
      serif: ['Georgia', 'serif'],
    },
    fontSize: {
      '2xs': '0.6875rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  shortcuts: {
    'btn-cta': 'inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-ink-300 bg-ink-50 hover:bg-ink-100 hover:border-ink-400 transition-colors',
    'tag': 'inline-flex items-center px-2 py-0.5 text-xs rounded bg-ink-100 text-ink-600',
    'tag-featured': 'inline-flex items-center px-2 py-0.5 text-xs rounded bg-accent-50 text-accent-600',
  },
});
