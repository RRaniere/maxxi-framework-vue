import { defineStore } from 'pinia';
import config from '@/config';
import { DirAttrSet } from '@/utils/utils';

export const useCustomizerStore = defineStore({
  id: 'customizer',
  state: () => ({
    sidebarDrawer: config.sidebarDrawer,
    customizerDrawer: config.customizerDrawer,
    miniSidebar: config.miniSidebar,
    isHorizontalLayout: config.isHorizontalLayout, // Horizontal layout
    actTheme: config.actTheme,
    fontTheme: config.fontTheme,
    inputBg: config.inputBg,
    themeContrast: config.themeContrast,
    boxed: config.boxed,
    isRtl: config.isRtl
  }),

  getters: {},
  actions: {
    SET_SIDEBAR_DRAWER() {
      this.sidebarDrawer = !this.sidebarDrawer;
    },
    SET_MINI_SIDEBAR(payload: boolean) {
      this.miniSidebar = payload;
    },
    SET_CUSTOMIZER_DRAWER(payload: boolean) {
      this.customizerDrawer = payload;
    },

    SET_LAYOUT(payload: boolean) {
      this.isHorizontalLayout = payload;
    },
    SET_THEME(payload: string) {
      this.actTheme = payload;
    },
    SET_FONT(payload: string) {
      this.fontTheme = payload;
    },
    SET_DIRECTION(dir: 'ltr' | 'rtl') {
      this.isRtl = dir === 'rtl';
      DirAttrSet(dir); // Call _setDirAttr to set the direction attribute
    }
  }
});
