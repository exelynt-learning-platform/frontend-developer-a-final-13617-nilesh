const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      outfit: ['Outfit', 'sans-serif'],
    },
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      custom1440: '1440px',
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        'title-2xl': ['72px', '90px'],
        'title-xl': ['60px', '72px'],
        'title-lg': ['48px', '60px'],
        'title-md': ['36px', '44px'],
        'title-sm': ['30px', '38px'],
        'theme-xl': ['20px', '30px'],
        'theme-sm': ['14px', '20px'],
        'theme-xs': ['12px', '18px'],

        // semantic tokens from your spec
        'value-2xl': ['24px', '32px'], // e.g. "4"
        'value-xl': ['20px', '30px'], // e.g. "25 Acres"
        'label-sm': ['14px', '20px'], // e.g. "Total Area"
        'label-xs': ['12px', '18px'], // e.g. "Cultivated Area"
        meta: ['10px', '14px'], // e.g. "May 14, 2025"
      },
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#101828',
        borderGrayCustom: '#8F8F8F',
        'brand-red': '#E5484D',

        'green-8': '#5BB98B',
        'cyan-8': '#00A2C7',
        'red-8': '#E5484D',

        //NEWLY ADDED BUTTON STROKE COLORS
        'Button-Stroke-Hover-background': '#F9FAFB',
        'Button-Stroke-Hover-text': '#1D2939',
        'Button-Stroke-Stroke': '#D0D5DD',

        bg: {
          slate: {
            '50-66': '#F1F5F966', // Custom translucent color
          },
        },
        brand: {
          25: '#F2F7FF',
          50: '#ECF3FF',
          100: '#DDE9FF',
          200: '#C2D6FF',
          300: '#9CB9FF',
          400: '#7592FF',
          500: '#465FFF',
          600: '#3641F5',
          700: '#2A31D8',
          800: '#252DAE',
          900: '#262E89',
          950: '#161950',
        },
        // card bg

        // === Used in your JSX ===
        'Theme-Color': '#FFFFFF', // card wrapper background
        'Background-Body': '#FFFFFF', // tooltip/bg
        'Border-Border': '#D0D5DD', // outline border

        'Colors-Success-400': '#32D583', // cultivated area bar
        'Colors-Error-700': '#B42318', // setup area bar
        'Colors-Indigo-600': '#444CE6', // bar chart (Farm Gate Price)

        // === Text Tokens ===
        'Text-Title-Color': '#0C111D', // headings, dates
        'Text-Secondary-Text-Color': '#1D2838', // labels like ":"
        'Text-Brand-Color': '#465FFF',
        'blue-light': {
          25: '#F5FBFF',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#B9E6FE',
          300: '#7CD4FD',
          400: '#36BFFA',
          500: '#0BA5EC',
          600: '#0086C9',
          700: '#026AA2',
          800: '#065986',
          900: '#0B4A6F',
          950: '#062C41',
        },
        gray: {
          dark: '#1A2231',
          11: '#F1F1F3',
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#E2E8F0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
          950: '#0C111D',
        },
        orange: {
          25: '#FFFAF5',
          50: '#FFF6ED',
          100: '#FFEAD5',
          200: '#FDDCAB',
          300: '#FEB273',
          400: '#FD853A',
          500: '#FB6514',
          600: '#EC4A0A',
          700: '#C4320A',
          800: '#9C2A10',
          900: '#7E2410',
          950: '#511C10',
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31',
          950: '#053321',
        },
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
          950: '#55160C',
        },
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
          950: '#4E1D09',
        },
        'theme-pink': {
          500: '#EE46BC',
        },
        'theme-purple': {
          500: '#7A5AF8',
        },
        // ✅ Custom AgriWealth colors
        'ag-green': {
          50: '#E6E8E8',
          100: '#E6E8E8',
          500: '#818E8B',
          600: '#687874',
          700: '#4F625D',
          800: '#354B45',
          900: '#031E17',
          950: '#011b14',
        },
        'ag-orange': {
          5: '#FFD19A',
        },

        'Text-Text-Color': '#344054',
        'Text-Neutral-Brand-Color': '#465FFF',
        'Border-Border-Tertiary': '#D0D5DD',
        'Input-Brand-focus-border-color': '#465FFF',
        'Colors-Error-600': '#D92D20',
        'Colors-Theme-Ag-Green-900': '#031E17',
        'Colors-White-100%': '#FFFFFF',
        'Checkbox-Background': '#FFFFFF',
        'Theme-Ag-Green-950': '#011b14',
        'Theme-Ag-Green-900': '#031E17',
        'Theme-Ag-Green-800': '#354B45',
        'Theme-Ag-Green-700': '#4F625D',
        'Theme-Ag-Green-600': '#687874',
        'Theme-Ag-Green-500': '#818E8B',
        'Theme-Ag-Green-100': '#A3B0AC',
        'Text-card-foreground': '#020617', // text color for card titles/labels
        'Text-card-background': '#FFFFFF',
        'text-success': '#32D583', // green values
        'text-error': '#F04438',
      },
      boxShadow: {
        'theme-md':
          '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        'theme-lg':
          '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',

        'theme-sm':
          '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
        'theme-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        'theme-xl':
          '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        datepicker: '-5px 0 0 #262d3c, 5px 0 0 #262d3c',
        'focus-ring': '0px 0px 0px 4px rgba(70, 95, 255, 0.12)',
        'slider-navigation':
          '0px 1px 2px 0px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        tooltip:
          '0px 4px 6px -2px rgba(16, 24, 40, 0.05), -8px 0px 20px 8px rgba(16, 24, 40, 0.05)',
      },
      dropShadow: {
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14.5: '3.625rem',
        15: '3.75rem',
        64: '16rem',
        72: '18rem',
      },
      borderWidth: {
        0.4: '0.4px',
      },
      outlineOffset: {
        '-0.2': '-0.2px',
        '-0.65': '-0.65px',
        '-1': '-1px',
      },
      backgroundImage: {
        'sidebar-active':
          'linear-gradient(to bottom right, rgba(248, 250, 252, 0.1), rgba(255, 255, 255, 0.2))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
