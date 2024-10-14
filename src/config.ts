export type ConfigProps = {
  sidebarDrawer: boolean;
  customizerDrawer: boolean;
  miniSidebar: boolean;
  isHorizontalLayout: boolean;
  actTheme: string;
  fontTheme: string;
  inputBg: boolean;
  themeContrast: boolean;
  boxed: boolean;
  isRtl: boolean;
};

const config: ConfigProps = {
  sidebarDrawer: true,
  customizerDrawer: false,
  miniSidebar: false,
  isHorizontalLayout: false, // Horizontal layout
  actTheme: 'dark',
  fontTheme: 'Inter-var',
  inputBg: false,
  themeContrast: false,
  boxed: false,
  isRtl: false
};

export default config;
