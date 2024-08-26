import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/Default/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Order',
    url: '/Default/order',
    iconComponent: { name: 'cil-contact' }
  },
  {
    title: true,
    name: 'Artisanry'
  },
  {
    name: 'Craftsperson',
    url: '/Default/artisanry/craftsperson',
    iconComponent: { name: 'cil-group' }
  },
  {
    name: 'Product',
    url: '/Default/artisanry/product',
    iconComponent: { name: 'cil-fingerprint' }
  },
  {
    name: 'Materials',
    url: '/Default/artisanry/materials',
    iconComponent: { name: 'cil-color-fill' }
  },
  {
    name: 'Customer',
    url: '/Default/artisanry/customer',
    iconComponent: { name: 'cil-contact' }
  }


  //template menu
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/Default/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/Default/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/Default/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/Default/base/accordion',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/Default/base/breadcrumbs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/Default/base/cards',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/Default/base/carousel',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/Default/base/collapse',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/Default/base/list-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/Default/base/navs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/Default/base/pagination',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/Default/base/placeholder',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/Default/base/popovers',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/Default/base/progress',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/Default/base/spinners',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/Default/base/tables',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/Default/base/tabs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/Default/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/Default/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/Default/buttons/buttons',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/Default/buttons/button-groups',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/Default/buttons/dropdowns',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/Default/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/Default/forms/form-control',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/Default/forms/select',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/Default/forms/checks-radios',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/Default/forms/range',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/Default/forms/input-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/Default/forms/floating-labels',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/Default/forms/layout',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/Default/forms/validation',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/Default/charts'
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/Default/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/Default/icons/coreui-icons',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/Default/icons/flags',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/Default/icons/brands',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/Default/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/Default/notifications/alerts',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/Default/notifications/badges',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/Default/notifications/modal',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/Default/notifications/toasts',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/Default/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/Default/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/5.x/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
