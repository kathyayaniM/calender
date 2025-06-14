
// src/lib/themeConfig.ts

export interface MonthlyTheme {
  name: string;
  primary: string; // HSL format string e.g., "210 40% 96.1%"
  accent: string;  // HSL format string
  primary_dark?: string; // HSL format string for dark mode (optional, falls back to light if not set)
  accent_dark?: string;  // HSL format string for dark mode (optional)
  primary_foreground?: string; // HSL format string for text on primary
  accent_foreground?: string; // HSL format string for text on accent
}

export interface MonthlyThemeColors {
  primary: string; // Full HSL string for CSS e.g. "hsl(210 40% 96.1%)"
  accent: string;  // Full HSL string
  primary_foreground: string; // Full HSL string
  accent_foreground: string; // Full HSL string
}

// Zoho-inspired theme: Colors are now fixed to match the Zoho aesthetic.
// Monthly variations are disabled by making all months use the same base.
const ZOHO_THEME_BASE: MonthlyTheme = {
  name: "DefaultZoho",
  primary: "210 90% 50%",    // Zoho Blue (light mode main content)
  accent: "210 90% 65%",     // Lighter Blue (light mode main content)
  primary_dark: "210 95% 55%", // Zoho Blue (dark mode main content)
  accent_dark: "210 90% 70%",  // Lighter Blue (dark mode main content)
  primary_foreground: "0 0% 100%", // White text on primary blue
  accent_foreground: "225 10% 20%",  // Dark text on lighter blue accent (light mode)
};


export const MONTH_THEMES: MonthlyTheme[] = Array(12).fill(ZOHO_THEME_BASE).map((theme, index) => ({
  ...theme,
  name: new Date(0, index).toLocaleString('default', { month: 'long' }),
}));

export const getMonthlyTheme = (monthIndex: number, isDarkMode: boolean): MonthlyThemeColors => {
  const themeSet = MONTH_THEMES[monthIndex % MONTH_THEMES.length];
  
  const effectivePrimary = isDarkMode && themeSet.primary_dark ? themeSet.primary_dark : themeSet.primary;
  const effectiveAccent = isDarkMode && themeSet.accent_dark ? themeSet.accent_dark : themeSet.accent;
  
  // Determine foregrounds. Default to base if not specified for dark mode.
  // For Zoho, primary foreground is consistent. Accent foreground might change.
  const effectivePrimaryForeground = themeSet.primary_foreground || "0 0% 100%"; // Default white
  
  let effectiveAccentForeground = themeSet.accent_foreground || (isDarkMode ? "0 0% 100%" : "225 10% 20%");
  if (isDarkMode && effectiveAccent === themeSet.accent_dark) { // If dark mode accent is used
      effectiveAccentForeground = themeSet.accent_foreground_base_dark || "225 10% 15%"; // Example for dark mode accent fg
  }


  return {
    primary: `hsl(${effectivePrimary})`,
    accent: `hsl(${effectiveAccent})`,
    primary_foreground: `hsl(${effectivePrimaryForeground})`,
    accent_foreground: `hsl(${effectiveAccentForeground})`,
  };
};

// Add a type for accent_foreground_base_dark if you want to specify it in ZOHO_THEME_BASE
// interface MonthlyTheme { ... accent_foreground_base_dark?: string; }
// Then in ZOHO_THEME_BASE: accent_foreground_base_dark: "225 10% 15%",

