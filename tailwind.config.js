/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Business Blue-White Design System - Light Mode (Default)
        // 保留 cyber-* 命名以兼容现有组件，但实际颜色已替换为蓝白风格
        cyber: {
          background: 'var(--cyber-background)',
          foreground: 'var(--cyber-foreground)',
          card: 'var(--cyber-card)',
          muted: 'var(--cyber-muted)',
          'muted-foreground': 'var(--cyber-muted-foreground)',
          border: 'var(--cyber-border)',
          input: 'var(--cyber-input)',
          ring: 'var(--cyber-ring)',
          destructive: 'var(--cyber-destructive)',
        },
        // 品牌色 token - 保留 neon-* 命名以兼容现有组件
        // 实际映射：green→主色蓝, cyan→主色中蓝, magenta→紫色强调, yellow→警告色, red→危险色
        neon: {
          green: '#185FA5',   // Primary 哥飞蓝
          magenta: '#534AB7', // Accent 紫色（用于对比页）
          cyan: '#378ADD',    // Primary 中
          yellow: '#BA7517',  // Warning 警告色
          red: '#D85A30',     // Danger 危险色
        },
        // 商业配色扩展 token
        brand: {
          primary: '#185FA5',
          'primary-light': '#E6F1FB',
          'primary-mid': '#378ADD',
          accent: '#534AB7',
          'accent-light': '#EEEDFE',
          success: '#0F6E56',
          'success-light': '#E1F5EE',
          warning: '#BA7517',
          'warning-light': '#FAEEDA',
          danger: '#D85A30',
          'danger-light': '#FAECE7',
          'bg-secondary': '#F7F8FA',
          'text-strong': '#1A1A2E',
          'text-muted': '#5F5E5A',
          'text-weak': '#888780',
        },
        // Legacy primary (keep for compatibility)
        primary: {
          50: '#E6F1FB',
          100: '#c8e0f5',
          500: '#378ADD',
          600: '#185FA5',
          700: '#134a82',
          900: '#0d3155',
        },
      },
      fontFamily: {
        // 改用系统字体栈，去掉赛博朋克字体
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        // 保留 orbitron/tech token 名以兼容，但实际指向系统字体
        orbitron: ['system-ui', '-apple-system', 'sans-serif'],
        tech: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        // 替换霓虹发光为柔和商业阴影
        'neon': '0 1px 3px rgba(24, 95, 165, 0.08), 0 1px 2px rgba(24, 95, 165, 0.04)',
        'neon-sm': '0 1px 2px rgba(24, 95, 165, 0.06)',
        'neon-lg': '0 4px 12px rgba(24, 95, 165, 0.10), 0 2px 4px rgba(24, 95, 165, 0.06)',
        'neon-secondary': '0 1px 3px rgba(83, 74, 183, 0.10), 0 1px 2px rgba(83, 74, 183, 0.06)',
        'neon-tertiary': '0 1px 3px rgba(55, 138, 221, 0.10), 0 1px 2px rgba(55, 138, 221, 0.06)',
        'neon-red': '0 1px 3px rgba(216, 90, 48, 0.10), 0 1px 2px rgba(216, 90, 48, 0.06)',
        'neon-yellow': '0 1px 3px rgba(186, 117, 23, 0.10), 0 1px 2px rgba(186, 117, 23, 0.06)',
        // 卡片悬停阴影
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 16px rgba(24, 95, 165, 0.10), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
      textShadow: {
        // 移除霓虹和 glitch 文字阴影
        'neon': 'none',
        'neon-lg': 'none',
        'glitch': 'none',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        // 保留类名但移除动画效果（避免破坏现有 className）
        'glitch': 'none',
        'scanline': 'none',
        'rgb-shift': 'none',
        'pulse-neon': 'none',
        'flicker': 'none',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        // 保留空 keyframes 以避免构建错误
        glitch: {},
        scanline: {},
        rgbShift: {},
        pulseNeon: {},
        flicker: {},
      },
      // 移除 clip-path 切角效果（保留空对象以避免破坏引用）
      clipPath: {
        'chamfer': 'none',
        'chamfer-sm': 'none',
        'chamfer-lg': 'none',
      },
      borderRadius: {
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '12px': '12px',
      },
    },
  },
  plugins: [
    // 把霓虹工具类替换为商业风格的无效果版本
    function({ addUtilities }) {
      addUtilities({
        // clip-chamfer 不再切角，改用圆角
        '.clip-chamfer': {
          borderRadius: '6px',
          clipPath: 'none',
        },
        '.clip-chamfer-sm': {
          borderRadius: '4px',
          clipPath: 'none',
        },
        '.clip-chamfer-lg': {
          borderRadius: '12px',
          clipPath: 'none',
        },
        // 移除霓虹文字阴影
        '.text-shadow-neon': {
          textShadow: 'none',
        },
        '.text-shadow-neon-lg': {
          textShadow: 'none',
        },
        '.text-shadow-glitch': {
          textShadow: 'none',
        },
      })
    },
  ],
}
