export interface menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  divider?: boolean;
  getURL?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: 'custom-home-trend',
    to: '/dashboard',
  },
  {
    title: 'Network',
    icon: 'custom-users',
    to: '/network',
  },
  {
    title: 'Shopping',
    icon: 'custom-dollar-square',
    to: '/shopping',
  },
  {
    title: 'Profile',
    icon: 'custom-user',
    to: '/profile',
  },
];

export default sidebarItem;
