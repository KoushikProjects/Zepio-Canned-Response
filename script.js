/* =========================================================
   ZEPIO CANNED RESPONSES — DASHBOARD SCRIPT v2.1
   Fixes: sidebar collapse, font size, advanced save,
   mega menu with categories + multi-URL + add buttons,
   test/live toggle, responsive, shortcut keys.
   ========================================================= */
(function () {
  'use strict';

  const LS = {
    data: 'zepio_data_v2',
    settings: 'zepio_settings_v2',
    selection: 'zepio_selection_v2',
    history: 'zepio_history_v2',
    megaMenu: 'zepio_megamenu_v2'
  };

  const DEFAULT_SETTINGS = {
    theme: 'dark',
    accent: '#f59e0b',
    font: 'inter',
    fontSize: 14,
    density: 'comfortable',
    radius: 12,
    animations: true,
    glass: true,
    view: 'grid',
    sort: 'az',
    testMode: false,
    currentLang: 'en',
    searchScope: 'local',
    features: {
      'mega-menu': true,
      'breadcrumb': true,
      'search': true,
      'filters': true,
      'tag-filter': true,
      'date-filter': true,
      'fav-toggle': true,
      'lang-switcher': true,
      'view-toggle': true,
      'add-btn': true
    }
  };

  const FALLBACK_DATA = {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    languages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
      { code: 'hng', name: 'Hinglish' },
      { code: 'bn', name: 'Bengali' }
    ],
    categories: [
      { id: 'cat-support', name: 'Customer Support', icon: 'headset', color: '#f59e0b' }
    ],
    subcategories: [
      { id: 'sub-greet', name: 'Greetings', categoryId: 'cat-support' }
    ],
    responses: [{
      id: 'fb-1', title: 'Welcome Message',
      category: 'Customer Support', subcategory: 'Greetings',
      translations: {
        en: 'Hi {customer_name}, welcome to {store_name}! Use code WELCOME10 for 10% off.',
        hi: 'नमस्ते {customer_name}, {store_name} में आपका स्वागत है!',
        hng: 'Hi {customer_name}, {store_name} mein swagat hai!',
        bn: 'নমস্কার {customer_name}, {store_name}-এ স্বাগতম!'
      },
      tags: ['welcome'], favorite: true,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      usageCount: 0
    }]
  };

  // ============================================================
  // MEGA MENU — with categories, multi-URL links, add buttons
  // ============================================================
  const DEFAULT_MEGA_MENU = [
    {
      id: 'store',
      title: 'Store Links',
      icon: 'shopping-bag',
      categories: [
        {
          id: 'cat-main',
          name: 'Main',
          links: [
            { title: 'Zepio Main Site', sub: 'zepio.io — official website', urls: ['https://zepio.io/'], icon: 'globe' },
            { title: 'Pricing Plans', sub: 'Startup, Scale, Multivendor', urls: ['https://zepio.io/pricing'], icon: 'tag' },
            { title: 'Store Demos', sub: 'Restaurant, Grocery, Clothing & more', urls: ['https://zepio.io/#demos'], icon: 'eye' },
            { title: 'Plugins Marketplace', sub: '20+ official plugins', urls: ['https://zepio.io/plugins'], icon: 'puzzle' }
          ]
        },
        {
          id: 'cat-account',
          name: 'Account',
          links: [
            { title: 'Sign Up Free', sub: '5-day free trial', urls: ['https://zepio.io/signup'], icon: 'user-plus' },
            { title: 'Login', sub: 'Customer login portal', urls: ['https://zepio.io/login'], icon: 'log-in' },
            { title: 'Affiliate Program', sub: 'Earn referring Zepio', urls: ['https://zepio.io/affiliate-program'], icon: 'users' },
            { title: 'Feature Request', sub: 'Submit ideas to product team', urls: ['https://zepio.io/feature-request'], icon: 'lightbulb' }
          ]
        }
      ]
    },
    {
      id: 'competitors',
      title: 'Competitors',
      icon: 'briefcase',
      categories: [
        {
          id: 'cat-india',
          name: 'India',
          links: [
            { title: 'Dukaan', sub: 'Indian D2C store builder', urls: ['https://dukaan.io/'], icon: 'store' },
            { title: 'Instamojo', sub: 'Payments + online store', urls: ['https://www.instamojo.com/'], icon: 'credit-card' },
            { title: 'Razorpay Store', sub: 'Razorpay-backed storefronts', urls: ['https://razorpay.com/'], icon: 'zap' },
            { title: 'Magicpin', sub: 'Local commerce marketplace', urls: ['https://www.magicpin.in/'], icon: 'map-pin' }
          ]
        },
        {
          id: 'cat-global',
          name: 'Global',
          links: [
            { title: 'Shopify India', sub: 'Global e-commerce platform', urls: ['https://www.shopify.in/'], icon: 'shopping-bag' },
            { title: 'WooCommerce', sub: 'WordPress e-commerce plugin', urls: ['https://woocommerce.com/'], icon: 'package' },
            { title: 'Ecwid', sub: 'Global store builder', urls: ['https://www.ecwid.com/'], icon: 'globe' },
            { title: 'BigCommerce', sub: 'Enterprise e-commerce', urls: ['https://www.bigcommerce.com/'], icon: 'briefcase' },
            { title: 'Squarespace', sub: 'Website + commerce', urls: ['https://www.squarespace.com/'], icon: 'layout' },
            { title: 'Wix Stores', sub: 'Drag-and-drop commerce', urls: ['https://www.wix.com/'], icon: 'layout' }
          ]
        }
      ]
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      icon: 'book',
      categories: [
        {
          id: 'cat-support-kb',
          name: 'Support',
          links: [
            { title: 'Help Center', sub: 'Self-serve support articles', urls: ['https://zepio.io/support'], icon: 'help-circle' },
            { title: 'Help Videos', sub: 'Video walkthroughs', urls: ['https://zepio.io/help-videos'], icon: 'play' },
            { title: 'API Documentation', sub: 'Build on Zepio API', urls: ['https://zepio.io/api-status'], icon: 'code' },
            { title: 'API Status', sub: 'Live system status', urls: ['https://zepio.io/api-status'], icon: 'activity' }
          ]
        },
        {
          id: 'cat-resources',
          name: 'Resources',
          links: [
            { title: 'Roadmap', sub: 'What we are building next', urls: ['https://zepio.io/roadmap'], icon: 'map' },
            { title: "What's New", sub: 'Latest features & updates', urls: ["https://zepio.io/whats-new"], icon: 'sparkles' },
            { title: 'Addon Services', sub: 'Professional services', urls: ['https://zepio.io/addon-services'], icon: 'wrench' },
            { title: 'D2C E-commerce Guide', sub: 'Direct-to-consumer playbook', urls: ['https://zepio.io/blog'], icon: 'book' }
          ]
        },
        {
          id: 'cat-best-practices',
          name: 'Best Practices',
          links: [
            { title: 'Mobile Optimization', sub: '98% orders are mobile — best practices', urls: ['https://zepio.io/features'], icon: 'smartphone' },
            { title: 'Hyperlocal Delivery', sub: 'Local delivery fleet setup', urls: ['https://zepio.io/features'], icon: 'truck' },
            { title: 'Abandoned Cart Guide', sub: 'Recover lost sales', urls: ['https://zepio.io/features'], icon: 'shopping-cart' },
            { title: 'GST & Invoicing', sub: 'Indian tax compliance', urls: ['https://zepio.io/support'], icon: 'file-text' }
          ]
        }
      ]
    }
  ];

  // ICONS map (same as before, plus new ones)
  const ICONS = {
    headset: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    truck: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    package: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'credit-card': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    'life-buoy': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
    megaphone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    'user-cog': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',
    'shopping-cart': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'rotate-ccw': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    'message-circle': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    store: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7L3 4h18l1 3"/><path d="M4 7v13h16V7"/><path d="M9 22V12h6v10"/></svg>',
    // Mega menu icons
    globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    tag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    puzzle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.149-.802-.523-.802-1.005V13h-3v3h2.005c.472 0 .856.332 1.005.802.049.322-.059.648-.276.837l-1.611 1.611c-.47.47-1.087.706-1.704.706s-1.233-.235-1.704-.706l-1.568-1.568a1.001 1.001 0 0 0-.878-.289c-.322.049-.648.059-.878.289l-1.568 1.568c-.47.47-1.087.706-1.704.706s-1.233-.235-1.704-.706l-1.611-1.611a.98.98 0 0 1-.276-.837c.149-.47.523-.802 1.005-.802H6V10H3v2.005c0 .472-.332.856-.802 1.005-.322.049-.648-.059-.837-.276l-1.611-1.611A2.404 2.404 0 0 1-1 9.5s.235-1.233.706-1.704L1.274 6.13c.19-.19.467-.289.837-.276.47.149.802.523.802 1.005V9h3V6H3.995c-.472 0-.856-.332-1.005-.802-.049-.322.059-.648.276-.837L4.877 2.75c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.568 1.568c.19.19.467.289.837.276.322-.049.648-.059.878-.289l1.568-1.568c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.611 1.611c.19.19.289.467.276.837z"/></svg>',
    users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'user-plus': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    'log-in': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
    lightbulb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
    'shopping-bag': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>',
    zap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'map-pin': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    briefcase: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    layout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    'help-circle': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    play: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    activity: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    sparkles: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.91 5.91L20 10.5l-5.91 1.91L12 18l-1.91-5.91L4 10.5l5.91-1.91L12 3z"/></svg>',
    wrench: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.7 5.7L3 18l3 3 6-6a4 4 0 0 0 5.7-5.7l-2.4 2.4-2-2 2.4-2.4z"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    smartphone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    'file-text': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>',
    'external-link': '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
  };

  // ============================================================
  // STATE
  // ============================================================
  const state = {
    data: null,
    settings: { ...DEFAULT_SETTINGS },
    activeCategory: 'all',
    activeSub: null,
    sectionSearch: '',
    globalSearch: '',
    selectedTags: new Set(),
    dateFilter: 'all',
    favOnly: false,
    sort: 'az',
    view: 'grid',
    selectedIds: new Set(),
    selectMode: false,
    editingId: null,
    openCategories: new Set(),
    megaMenu: null,
    megaViewModes: {}, // per-panel view mode
    pendingMegaContext: null // for add link/category modals
  };

  // ============================================================
  // UTILS
  // ============================================================
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const uuid = () => 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
  const escapeHtml = (s = '') =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const debounce = (fn, w = 200) => {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), w); };
  };
  const relTime = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days/7)}w ago`;
    if (days < 365) return `${Math.floor(days/30)}mo ago`;
    return `${Math.floor(days/365)}y ago`;
  };
  function hexToRgb(hex) {
    const m = hex.replace('#', '').match(/.{2}/g);
    if (!m || m.length < 3) return '245, 158, 11';
    return `${parseInt(m[0],16)}, ${parseInt(m[1],16)}, ${parseInt(m[2],16)}`;
  }
  function shade(hex, p) {
    const m = hex.replace('#','').match(/.{2}/g);
    if (!m || m.length < 3) return hex;
    const [r,g,b] = m.map(h => parseInt(h,16));
    const a = Math.round(2.55 * p);
    const toHex = n => {
      const v = Math.max(0, Math.min(255, n));
      return v.toString(16).padStart(2, '0');
    };
    return '#' + toHex(r+a) + toHex(g+a) + toHex(b+a);
  }
  function csvEscape(v) {
    const s = String(v ?? '');
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }
  function parseCSVLine(line) {
    const out = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"' && line[i+1] === '"') { cur += '"'; i++; }
        else if (c === '"') inQ = false;
        else cur += c;
      } else {
        if (c === ',') { out.push(cur); cur = ''; }
        else if (c === '"') inQ = true;
        else cur += c;
      }
    }
    out.push(cur);
    return out;
  }
  function langNameLookup(code) {
    const l = (state.data?.languages || []).find(x => x.code === code);
    return l ? l.name : code;
  }

  // ============================================================
  // DATA LAYER
  // ============================================================
  async function loadData() {
    const cached = localStorage.getItem(LS.data);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    try {
      const res = await fetch('data.json', { cache: 'no-store' });
      if (res.ok) {
        const j = await res.json();
        saveData(j);
        return j;
      }
    } catch {}
    const fb = JSON.parse(JSON.stringify(FALLBACK_DATA));
    saveData(fb);
    return fb;
  }
  function saveData(d) {
    localStorage.setItem(LS.data, JSON.stringify(d));
    state.data = d;
  }
  function loadSettings() {
    const c = localStorage.getItem(LS.settings);
    if (c) {
      try {
        const p = JSON.parse(c);
        return {
          ...DEFAULT_SETTINGS,
          ...p,
          features: { ...DEFAULT_SETTINGS.features, ...(p.features || {}) }
        };
      } catch {}
    }
    return { ...DEFAULT_SETTINGS };
  }
  function saveSettings() { localStorage.setItem(LS.settings, JSON.stringify(state.settings)); }
  function loadSelection() {
    try {
      const c = localStorage.getItem(LS.selection);
      if (c) {
        const p = JSON.parse(c);
        state.activeCategory = p.activeCategory || 'all';
        state.activeSub = p.activeSub || null;
        state.view = p.view || 'grid';
        state.sort = p.sort || 'az';
        if (Array.isArray(p.openCategories)) state.openCategories = new Set(p.openCategories);
      }
    } catch {}
  }
  function saveSelection() {
    localStorage.setItem(LS.selection, JSON.stringify({
      activeCategory: state.activeCategory,
      activeSub: state.activeSub,
      view: state.view,
      sort: state.sort,
      openCategories: Array.from(state.openCategories)
    }));
  }
  function loadHistory() {
    try {
      const c = localStorage.getItem(LS.history);
      return c ? JSON.parse(c) : [];
    } catch { return []; }
  }
  function saveHistory(h) { localStorage.setItem(LS.history, JSON.stringify(h)); }
  function addHistoryEntry(r, lang) {
    if (state.settings.testMode) return;
    const h = loadHistory();
    h.push({
      id: uuid(),
      responseId: r.id,
      title: r.title,
      category: r.category,
      subcategory: r.subcategory,
      language: lang,
      timestamp: new Date().toISOString()
    });
    if (h.length > 5000) h.splice(0, h.length - 5000);
    saveHistory(h);
  }
  function loadMegaMenu() {
    const c = localStorage.getItem(LS.megaMenu);
    if (c) {
      try { return JSON.parse(c); } catch {}
    }
    return JSON.parse(JSON.stringify(DEFAULT_MEGA_MENU));
  }
  function saveMegaMenu() {
    localStorage.setItem(LS.megaMenu, JSON.stringify(state.megaMenu));
  }

  // ============================================================
  // APPLY SETTINGS — ensures font size visibly affects text
  // ============================================================
  function applySettings() {
    const root = document.documentElement;
    const body = document.body;
    let theme = state.settings.theme;
    if (theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', theme);

    const accent = state.settings.accent;
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-2', shade(accent, 15));
    root.style.setProperty('--accent-rgb', hexToRgb(accent));
    root.style.setProperty('--accent-soft', `rgba(${hexToRgb(accent)}, 0.12)`);

    root.setAttribute('data-font', state.settings.font);
    root.setAttribute('data-density', state.settings.density);

    // Font size — set on root so em units cascade through body
    root.style.setProperty('--font-size', state.settings.fontSize + 'px');
    body.style.fontSize = state.settings.fontSize + 'px';

    root.style.setProperty('--radius', state.settings.radius + 'px');
    root.style.setProperty('--radius-sm', Math.max(4, state.settings.radius - 4) + 'px');
    root.style.setProperty('--radius-lg', Math.max(12, state.settings.radius + 6) + 'px');

    body.classList.toggle('no-anim', !state.settings.animations);
    body.classList.toggle('no-glass', !state.settings.glass);

    // View
    const r = $('#responses');
    if (r) r.setAttribute('data-view', state.view);
    $$('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));

    // Mode toggle in topbar
    const modeWrap = $('#modeToggleWrap');
    if (modeWrap) {
      modeWrap.classList.toggle('test', state.settings.testMode);
      modeWrap.classList.toggle('live', !state.settings.testMode);
      const lbl = $('#modeLabel');
      if (lbl) lbl.textContent = state.settings.testMode ? 'TEST' : 'LIVE';
    }

    // Apply feature toggles
    Object.entries(state.settings.features).forEach(([key, on]) => {
      $$(`[data-feature="${key}"]`).forEach(el => {
        el.style.display = on ? '' : 'none';
      });
    });

    // Search scope
    const scope = $('#scopeToggle');
    if (scope) scope.classList.toggle('active', state.settings.searchScope === 'global');

    syncSettingsPanel();
    renderFeatureToggles();
  }

  function syncSettingsPanel() {
    $$('.theme-toggle button[data-theme]').forEach(b =>
      b.classList.toggle('active', b.dataset.theme === state.settings.theme));
    $$('.swatch[data-accent]').forEach(s =>
      s.classList.toggle('active', s.dataset.accent === state.settings.accent));
    $('#customAccent').value = state.settings.accent;
    $('#fontSelect').value = state.settings.font;
    $$('.theme-toggle button[data-density]').forEach(b =>
      b.classList.toggle('active', b.dataset.density === state.settings.density));
    $('#radiusSlider').value = state.settings.radius;
    $('#radiusValue').textContent = state.settings.radius + 'px';
    $('#fontSizeSlider').value = state.settings.fontSize;
    $('#fontSizeValue').textContent = state.settings.fontSize + 'px';
    $('#animToggle').checked = state.settings.animations;
    $('#glassToggle').checked = state.settings.glass;
    $('#testModeToggle').checked = state.settings.testMode;
  }

  // ============================================================
  // SIDEBAR
  // ============================================================
  function renderSidebar() {
    const list = $('#categoryList');
    const data = state.data;
    list.innerHTML = '';

    const gq = state.globalSearch.trim().toLowerCase();
    const matchCat = (name) => !gq || name.toLowerCase().includes(gq);
    const matchSub = (name) => !gq || name.toLowerCase().includes(gq);

    data.categories.forEach(cat => {
      if (gq && !matchCat(cat.name)) {
        const subs = data.subcategories.filter(s => s.categoryId === cat.id && matchSub(s.name));
        if (!subs.length) return;
      }
      const subs = data.subcategories.filter(s => s.categoryId === cat.id);
      const count = data.responses.filter(r => r.category === cat.name).length;
      const isOpen = state.openCategories.has(cat.id) || !!gq;
      const isActive = state.activeCategory === cat.id && !state.activeSub;

      const wrap = document.createElement('div');
      wrap.className = 'cat-item' + (isOpen ? ' open' : '') + (isActive ? ' active' : '');
      wrap.innerHTML = `
        <button class="cat-head" data-cat="${cat.id}">
          <span class="cat-icon">${ICONS[cat.icon] || ICONS.package}</span>
          <span class="cat-name">${escapeHtml(cat.name)}</span>
          <span class="cat-count">${count}</span>
          <svg class="cat-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="sub-list">
          ${subs.map(sub => {
            if (gq && !matchSub(sub.name) && !matchCat(cat.name)) return '';
            const subCount = data.responses.filter(r => r.category === cat.name && r.subcategory === sub.name).length;
            const subActive = state.activeCategory === cat.id && state.activeSub === sub.id;
            return `<button class="sub-item ${subActive ? 'active' : ''}" data-cat="${cat.id}" data-sub="${sub.id}">
              <span class="sub-name">${escapeHtml(sub.name)}</span>
              <span class="sub-count">${subCount}</span>
            </button>`;
          }).join('')}
        </div>`;
      list.appendChild(wrap);
    });

    $('#countAll').textContent = data.responses.length;
    $('#countFav').textContent = data.responses.filter(r => r.favorite).length;
    $('#statTotal').textContent = data.responses.length;
    $('#statUsage').textContent = data.responses.reduce((s, r) => s + (r.usageCount || 0), 0);
  }

  // ============================================================
  // BREADCRUMB
  // ============================================================
  function renderBreadcrumb() {
    const bar = $('#breadcrumbBar');
    bar.innerHTML = '';

    const home = document.createElement('button');
    home.className = 'crumb' + (state.activeCategory === 'all' ? ' current' : '');
    home.textContent = 'All';
    home.addEventListener('click', () => selectCategory('all'));
    bar.appendChild(home);

    if (state.activeCategory === 'favorites') {
      bar.insertAdjacentHTML('beforeend', '<span class="crumb-sep">/</span>');
      const c = document.createElement('span');
      c.className = 'crumb current';
      c.textContent = 'Favorites';
      bar.appendChild(c);
    } else if (state.activeCategory !== 'all') {
      const cat = state.data.categories.find(c => c.id === state.activeCategory);
      if (cat) {
        bar.insertAdjacentHTML('beforeend', '<span class="crumb-sep">/</span>');
        const cb = document.createElement('button');
        cb.className = 'crumb' + (state.activeSub ? '' : ' current');
        cb.textContent = cat.name;
        cb.addEventListener('click', () => selectCategory(cat.id));
        bar.appendChild(cb);

        if (state.activeSub) {
          const sub = state.data.subcategories.find(s => s.id === state.activeSub);
          if (sub) {
            bar.insertAdjacentHTML('beforeend', '<span class="crumb-sep">/</span>');
            const sb = document.createElement('span');
            sb.className = 'crumb current';
            sb.textContent = sub.name;
            bar.appendChild(sb);
          }
        }
      }
    }

    // Results count chip at the end
    const list = getFilteredResponses();
    const chip = document.createElement('span');
    chip.className = 'result-count-chip';
    chip.textContent = `${list.length} ${list.length === 1 ? 'result' : 'results'}`;
    bar.appendChild(chip);
  }

  function selectCategory(catId, subId = null) {
    state.activeCategory = catId;
    state.activeSub = subId;
    state.globalSearch = '';
    $('#globalSearch').value = '';
    if (catId !== 'all' && catId !== 'favorites') {
      state.openCategories.add(catId);
    }
    saveSelection();
    renderSidebar();
    renderBreadcrumb();
    renderResponses();
  }

  // ============================================================
  // FILTER + RENDER
  // ============================================================
  function getFilteredResponses() {
    let r = [...state.data.responses];

    if (state.activeCategory === 'favorites') {
      r = r.filter(x => x.favorite);
    } else if (state.activeCategory === 'all') {
      // no filter
    } else {
      const cat = state.data.categories.find(c => c.id === state.activeCategory);
      if (cat) {
        r = r.filter(x => x.category === cat.name);
        if (state.activeSub) {
          const sub = state.data.subcategories.find(s => s.id === state.activeSub);
          if (sub) r = r.filter(x => x.subcategory === sub.name);
        }
      }
    }

    const scope = state.settings.searchScope;
    if (scope === 'global' && state.sectionSearch.trim()) {
      r = [...state.data.responses];
      const sq = state.sectionSearch.trim().toLowerCase();
      r = r.filter(x =>
        x.title.toLowerCase().includes(sq) ||
        (x.translations?.en || '').toLowerCase().includes(sq) ||
        Object.values(x.translations || {}).some(t => t.toLowerCase().includes(sq)) ||
        (x.tags || []).some(t => t.toLowerCase().includes(sq))
      );
    } else if (state.sectionSearch.trim()) {
      const sq = state.sectionSearch.trim().toLowerCase();
      r = r.filter(x =>
        x.title.toLowerCase().includes(sq) ||
        (x.translations?.en || '').toLowerCase().includes(sq) ||
        Object.values(x.translations || {}).some(t => t.toLowerCase().includes(sq)) ||
        (x.tags || []).some(t => t.toLowerCase().includes(sq))
      );
    }

    if (state.selectedTags.size) {
      r = r.filter(x => (x.tags || []).some(t => state.selectedTags.has(t)));
    }

    if (state.dateFilter !== 'all') {
      const ranges = { today: 1, week: 7, month: 30, quarter: 90, year: 365 };
      const days = ranges[state.dateFilter];
      if (days) {
        const cutoff = new Date(Date.now() - days * 86400000);
        r = r.filter(x => new Date(x.updatedAt || x.createdAt) >= cutoff);
      }
    }

    if (state.favOnly) r = r.filter(x => x.favorite);

    r = sortResponses(r, state.sort);
    return r;
  }

  function sortResponses(arr, s) {
    const a = [...arr];
    switch (s) {
      case 'az': return a.sort((x, y) => x.title.localeCompare(y.title));
      case 'za': return a.sort((x, y) => y.title.localeCompare(x.title));
      case 'recent': return a.sort((x, y) => new Date(y.updatedAt || y.createdAt) - new Date(x.updatedAt || x.createdAt));
      case 'oldest': return a.sort((x, y) => new Date(x.updatedAt || x.createdAt) - new Date(y.updatedAt || y.createdAt));
      case 'used': return a.sort((x, y) => (y.usageCount || 0) - (x.usageCount || 0));
      case 'least': return a.sort((x, y) => (x.usageCount || 0) - (y.usageCount || 0));
      case 'fav': return a.sort((x, y) => (y.favorite === true) - (x.favorite === true) || x.title.localeCompare(y.title));
      default: return a;
    }
  }

  function renderResponses() {
    const wrap = $('#responses');
    const empty = $('#emptyState');
    const list = getFilteredResponses();
    renderBreadcrumb();
    renderActiveFilters();

    if (!list.length) {
      wrap.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    wrap.innerHTML = list.map((r, i) => responseCard(r, i)).join('');
    $$('.resp-card', wrap).forEach(card => attachCardEvents(card));
    updateBulkBar();
  }

  function responseCard(r, i) {
    const isFav = r.favorite ? 'active' : '';
    const cat = state.data.categories.find(c => c.name === r.category);
    const catColor = cat?.color || state.settings.accent;
    const selected = state.selectedIds.has(r.id) ? 'selected' : '';
    const delay = Math.min(i * 25, 400);
    const lang = state.settings.currentLang;
    const langName = langNameLookup(lang);
    const content = r.translations?.[lang] || r.translations?.en || '';
    return `
    <div class="resp-card ${selected}" data-id="${r.id}" style="animation-delay:${delay}ms">
      <div class="resp-check ${state.selectedIds.has(r.id) ? 'checked' : ''}" data-check>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="resp-head">
        <div class="resp-title-wrap">
          <h3 class="resp-title">${escapeHtml(r.title)}</h3>
          <div class="resp-meta">
            <span class="cat-pill"><span class="cat-dot" style="background:${catColor}"></span>${escapeHtml(r.category)}${r.subcategory ? ' · ' + escapeHtml(r.subcategory) : ''}</span>
            <span class="lang-pill">${escapeHtml(langName)}</span>
          </div>
        </div>
        <div class="resp-actions">
          <button class="icon-btn fav-btn ${isFav}" data-act="fav" title="Toggle favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </button>
          <button class="icon-btn" data-act="edit" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="icon-btn" data-act="delete" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
          <button class="icon-btn copy-btn" data-act="copy" title="Copy ${escapeHtml(langName)} version">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      </div>
      <div class="resp-body">${escapeHtml(content)}</div>
      ${(r.tags && r.tags.length) ? `
        <div class="resp-tags">
          ${r.tags.slice(0, 5).map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('')}
        </div>` : ''}
      <div class="resp-footer">
        <div class="resp-stats">
          <span class="resp-stat" title="Times copied"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>${r.usageCount || 0}</span>
          <span class="resp-stat" title="Last updated"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${relTime(r.updatedAt || r.createdAt)}</span>
        </div>
      </div>
    </div>`;
  }

  function attachCardEvents(card) {
    const id = card.dataset.id;
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-act]') || e.target.closest('[data-check]')) return;
      if (state.selectMode) toggleSelect(id);
    });
    card.querySelectorAll('[data-act]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = btn.dataset.act;
        if (act === 'copy') copyResponse(id, btn);
        else if (act === 'fav') toggleFavorite(id);
        else if (act === 'edit') openModal(id);
        else if (act === 'delete') deleteResponse(id);
      });
    });
    card.querySelector('[data-check]').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSelect(id);
    });
    card.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, id);
    });
  }

  function renderActiveFilters() {
    const wrap = $('#activeFilters');
    const inner = $('#activeFiltersInner');
    const chips = [];
    if (state.sectionSearch.trim()) {
      chips.push(makeChip('Search: ' + state.sectionSearch.trim(), () => {
        state.sectionSearch = '';
        $('#sectionSearch').value = '';
        $('#clearSectionSearch').hidden = true;
        renderResponses();
      }));
    }
    state.selectedTags.forEach(t => chips.push(makeChip('#' + t, () => {
      state.selectedTags.delete(t);
      renderTagMenu();
      renderResponses();
    })));
    if (state.dateFilter !== 'all') {
      chips.push(makeChip('Date: ' + state.dateFilter, () => {
        state.dateFilter = 'all';
        $$('#dateMenu button').forEach(b => b.classList.toggle('active', b.dataset.date === 'all'));
        renderResponses();
      }));
    }
    if (state.favOnly) {
      chips.push(makeChip('Favorites only', () => {
        state.favOnly = false;
        $('#favOnlyToggle').classList.remove('active');
        renderResponses();
      }));
    }
    if (!chips.length) {
      wrap.hidden = true;
      $('#filterBadge').hidden = true;
      return;
    }
    wrap.hidden = false;
    inner.innerHTML = '';
    chips.forEach(c => inner.appendChild(c));
    $('#filterBadge').hidden = false;
    $('#filterBadge').textContent = chips.length;
  }

  function makeChip(label, onClose) {
    const el = document.createElement('div');
    el.className = 'filter-chip';
    el.innerHTML = `<span>${escapeHtml(label)}</span><button title="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
    el.querySelector('button').addEventListener('click', onClose);
    return el;
  }

  function clearAllFilters() {
    state.sectionSearch = '';
    state.selectedTags.clear();
    state.dateFilter = 'all';
    state.favOnly = false;
    $('#sectionSearch').value = '';
    $('#clearSectionSearch').hidden = true;
    $('#favOnlyToggle').classList.remove('active');
    $$('#dateMenu button').forEach(b => b.classList.toggle('active', b.dataset.date === 'all'));
    renderTagMenu();
    renderResponses();
    toast('success', 'Filters cleared', 'Showing all responses in this view.');
  }

  // ============================================================
  // TAG MENU
  // ============================================================
  function renderTagMenu() {
    const menu = $('#tagMenu');
    const allTags = new Set();
    state.data.responses.forEach(r => (r.tags || []).forEach(t => allTags.add(t)));
    const sorted = [...allTags].sort();
    menu.innerHTML = sorted.length ? sorted.map(t => `
      <button data-tag="${escapeHtml(t)}" class="${state.selectedTags.has(t) ? 'active' : ''}">
        <span class="tag-check">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span>#${escapeHtml(t)}</span>
      </button>`).join('') : '<div style="padding:8px;color:var(--text-faint);font-size:11px;">No tags yet</div>';
    $$('button[data-tag]', menu).forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.tag;
        if (state.selectedTags.has(t)) state.selectedTags.delete(t);
        else state.selectedTags.add(t);
        renderTagMenu();
        renderResponses();
      });
    });
  }

  // ============================================================
  // ACTIONS
  // ============================================================
  async function copyResponse(id, btn) {
    const r = state.data.responses.find(x => x.id === id);
    if (!r) return;
    const lang = state.settings.currentLang;
    const content = r.translations?.[lang] || r.translations?.en || '';
    if (!content) {
      toast('warning', 'No translation', `No ${langNameLookup(lang)} content for this response.`);
    }
    try { await navigator.clipboard.writeText(content); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = content;
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }

    if (!state.settings.testMode) {
      r.usageCount = (r.usageCount || 0) + 1;
      saveData(state.data);
      addHistoryEntry(r, lang);
      refreshHistoryCount();
    }

    const card = btn.closest('.resp-card');
    card.classList.add('copied');
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    setTimeout(() => {
      card.classList.remove('copied');
      btn.classList.remove('copied');
      btn.innerHTML = orig;
    }, 1200);

    toast('success', 'Copied', `"${r.title}" copied in ${langNameLookup(lang)}.`);
    if (!state.settings.testMode) renderSidebar();
  }

  function toggleFavorite(id) {
    const r = state.data.responses.find(x => x.id === id);
    if (!r) return;
    r.favorite = !r.favorite;
    r.updatedAt = new Date().toISOString();
    saveData(state.data);
    renderResponses();
    renderSidebar();
    toast(r.favorite ? 'success' : 'warning',
      r.favorite ? 'Added to favorites' : 'Removed from favorites', r.title);
  }

  function deleteResponse(id) {
    const r = state.data.responses.find(x => x.id === id);
    if (!r) return;
    if (!confirm(`Delete "${r.title}"? This cannot be undone.`)) return;
    state.data.responses = state.data.responses.filter(x => x.id !== id);
    saveData(state.data);
    state.selectedIds.delete(id);
    renderResponses();
    renderSidebar();
    toast('error', 'Deleted', `"${r.title}" removed.`);
  }

  function toggleSelect(id) {
    if (state.selectedIds.has(id)) state.selectedIds.delete(id);
    else state.selectedIds.add(id);
    state.selectMode = state.selectedIds.size > 0;
    document.body.classList.toggle('select-mode', state.selectMode);
    renderResponses();
  }

  function updateBulkBar() {
    const bar = $('#bulkActions');
    if (!state.selectedIds.size) { bar.hidden = true; return; }
    bar.hidden = false;
    $('#bulkCount').textContent = `${state.selectedIds.size} selected`;
  }

  function clearSelection() {
    state.selectedIds.clear();
    state.selectMode = false;
    document.body.classList.remove('select-mode');
    renderResponses();
  }

  // ============================================================
  // MODAL — Add / Edit
  // ============================================================
  function openModal(id = null) {
    state.editingId = id;
    const modal = $('#responseModal');
    const titleEl = $('#modalTitle');
    const catSel = $('#fCategory');
    const subSel = $('#fSubcategory');

    catSel.innerHTML = state.data.categories.map(c =>
      `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');

    function refreshSubs(catName) {
      const cat = state.data.categories.find(c => c.name === catName);
      const subs = state.data.subcategories.filter(s => s.categoryId === cat?.id);
      subSel.innerHTML = subs.length
        ? subs.map(s => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.name)}</option>`).join('')
        : `<option value="">—</option>`;
    }

    if (id) {
      const r = state.data.responses.find(x => x.id === id);
      if (!r) return;
      titleEl.textContent = 'Edit Response';
      $('#fTitle').value = r.title;
      catSel.value = r.category;
      refreshSubs(r.category);
      subSel.value = r.subcategory;
      $('#fTags').value = (r.tags || []).join(', ');
      $('#fFavorite').checked = !!r.favorite;
      renderLangTabs(r.translations || {});
    } else {
      titleEl.textContent = 'New Response';
      $('#responseForm').reset();
      refreshSubs(state.data.categories[0]?.name);
      renderLangTabs({});
    }

    catSel.onchange = () => refreshSubs(catSel.value);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#fTitle').focus(), 50);
  }

  function renderLangTabs(translations) {
    const tabs = $('#langTabs');
    const fields = $('#langFields');
    const langs = state.data.languages;

    const addTabHTML = `<button type="button" class="lang-tab add-lang-tab" id="addLangTab" title="Add a new language">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>Add Language</span>
    </button>`;

    tabs.innerHTML = langs.map((l, i) => {
      const isActive = i === 0;
      return `<button type="button" class="lang-tab ${isActive ? 'active' : ''}" data-lang="${escapeHtml(l.code)}">${escapeHtml(l.name)}</button>`;
    }).join('') + addTabHTML;

    fields.innerHTML = langs.map((l, i) => {
      const isActive = i === 0;
      const content = translations[l.code] || '';
      return `<div class="lang-field ${isActive ? 'active' : ''}" data-lang="${escapeHtml(l.code)}">
        <div class="lang-field-label">Content in ${escapeHtml(l.name)}</div>
        <textarea data-lang="${escapeHtml(l.code)}" placeholder="Write ${escapeHtml(l.name)} version here..." rows="6">${escapeHtml(content)}</textarea>
      </div>`;
    }).join('');

    $$('.lang-tab[data-lang]', tabs).forEach(tab => {
      tab.addEventListener('click', () => {
        const code = tab.dataset.lang;
        $$('.lang-tab', tabs).forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        $$('.lang-field', fields).forEach(f => f.classList.toggle('active', f.dataset.lang === code));
      });
    });
    $('#addLangTab').addEventListener('click', () => openAddLangModal());
  }

  function closeModal() {
    $('#responseModal').classList.remove('open');
    $('#responseModal').setAttribute('aria-hidden', 'true');
    state.editingId = null;
  }

  function saveResponse(e) {
    e.preventDefault();
    const title = $('#fTitle').value.trim();
    const category = $('#fCategory').value;
    const subcategory = $('#fSubcategory').value;
    const tagsRaw = $('#fTags').value.trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    const favorite = $('#fFavorite').checked;
    if (!title || !category) {
      toast('error', 'Missing fields', 'Title and category are required.');
      return;
    }
    const translations = {};
    $$('#langFields textarea').forEach(ta => {
      translations[ta.dataset.lang] = ta.value;
    });

    if (state.editingId) {
      const r = state.data.responses.find(x => x.id === state.editingId);
      if (r) {
        Object.assign(r, { title, category, subcategory, tags, favorite, translations, updatedAt: new Date().toISOString() });
      }
      toast('success', 'Saved', `"${title}" updated.`);
    } else {
      state.data.responses.push({
        id: uuid(), title, category, subcategory, tags, favorite, translations,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        usageCount: 0
      });
      toast('success', 'Created', `"${title}" added.`);
    }
    saveData(state.data);
    closeModal();
    renderResponses();
    renderSidebar();
  }

  // ============================================================
  // ADD LANGUAGE
  // ============================================================
  function openAddLangModal() {
    $('#addLangModal').classList.add('open');
    $('#addLangModal').setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#newLangName').focus(), 50);
  }
  function closeAddLangModal() {
    $('#addLangModal').classList.remove('open');
    $('#addLangModal').setAttribute('aria-hidden', 'true');
    $('#addLangForm').reset();
  }
  function addLanguage(e) {
    e.preventDefault();
    const name = $('#newLangName').value.trim();
    let code = $('#newLangCode').value.trim().toLowerCase();
    if (!name) { toast('error', 'Required', 'Language name required.'); return; }
    if (!code) code = name.slice(0, 3).toLowerCase();
    if (state.data.languages.some(l => l.code === code)) {
      toast('error', 'Exists', `Language code "${code}" already exists.`);
      return;
    }
    state.data.languages.push({ code, name });
    saveData(state.data);
    renderLangSwitcher();
    renderLangTabs(state.editingId
      ? (state.data.responses.find(r => r.id === state.editingId)?.translations || {})
      : {});
    closeAddLangModal();
    toast('success', 'Language added', `${name} added — fill translations in each response.`);
  }

  // ============================================================
  // LANGUAGE SWITCHER
  // ============================================================
  function renderLangSwitcher() {
    const menu = $('#langMenu');
    const langs = state.data.languages;
    menu.innerHTML = langs.map(l => `
      <button data-lang="${escapeHtml(l.code)}" class="${state.settings.currentLang === l.code ? 'active' : ''}">
        ${escapeHtml(l.name)} <span style="margin-left:auto;color:var(--text-faint);font-size:10px;">${escapeHtml(l.code.toUpperCase())}</span>
      </button>`).join('');
    $$('button[data-lang]', menu).forEach(b => {
      b.addEventListener('click', () => {
        state.settings.currentLang = b.dataset.lang;
        saveSettings();
        $('#langLabel').textContent = b.dataset.lang.toUpperCase();
        $$('#langMenu button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        $$('#inlineLang option').forEach(o => o.selected = o.value === b.dataset.lang);
        renderResponses();
        toast('success', 'Language', `Showing ${langNameLookup(b.dataset.lang)} translations.`);
      });
    });
    $('#langLabel').textContent = state.settings.currentLang.toUpperCase();
    const il = $('#inlineLang');
    if (il) {
      il.innerHTML = langs.map(l => `<option value="${escapeHtml(l.code)}">${escapeHtml(l.name)}</option>`).join('');
      il.value = state.settings.currentLang;
    }
  }

  // ============================================================
  // MEGA MENU — with categories, multi-URL, add buttons
  // ============================================================
  function buildMegaMenu() {
    const nav = $('#megaNav');
    nav.innerHTML = state.megaMenu.map(menu => `
      <div class="mega-item" data-mega-id="${escapeHtml(menu.id)}">
        <button class="mega-trigger" data-mega-trigger="${escapeHtml(menu.id)}">
          ${ICONS[menu.icon] || ICONS.globe}
          <span>${escapeHtml(menu.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="mega-panel" data-panel="${escapeHtml(menu.id)}"></div>
      </div>
    `).join('') + `
      <button class="mega-add-menu-btn" id="addMegaMenuBtn" title="Add new menu">
        ${ICONS.plus}
        <span>Add Menu</span>
      </button>
    `;

    // Render each panel
    state.megaMenu.forEach(menu => renderMegaPanel(menu));

    // Wire triggers
    $$('.mega-trigger').forEach(t => {
      t.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = t.closest('.mega-item');
        const id = t.dataset.megaTrigger;
        $$('.mega-item').forEach(m => { if (m !== item) m.classList.remove('open'); });
        item.classList.toggle('open');
      });
    });

    // Add menu button
    const addMenuBtn = $('#addMegaMenuBtn');
    if (addMenuBtn) addMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAddMegaMenuModal();
    });
  }

  function renderMegaPanel(menu) {
    const panel = $(`[data-panel="${menu.id}"]`);
    if (!panel) return;
    const viewMode = state.megaViewModes[menu.id] || 'grid';

    panel.innerHTML = `
      <div class="mega-panel-header">
        <h4>${escapeHtml(menu.title)}</h4>
        <input type="text" class="mega-panel-search" placeholder="Search ${escapeHtml(menu.title)}..." data-mega-search="${escapeHtml(menu.id)}">
        <div class="mega-panel-controls">
          <button class="view-mini ${viewMode === 'grid' ? 'active' : ''}" data-mega-view="grid" title="Grid view">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button class="view-mini ${viewMode === 'list' ? 'active' : ''}" data-mega-view="list" title="List view">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
        </div>
      </div>
      ${menu.categories.map(cat => `
        <div class="mega-category" data-mega-cat="${escapeHtml(cat.id)}">
          <div class="mega-category-header">
            <span class="mega-category-title">${escapeHtml(cat.name)}</span>
            <div class="mega-category-actions">
              <button class="mega-mini-btn" data-add-link="${escapeHtml(menu.id)}" data-cat-id="${escapeHtml(cat.id)}" title="Add link to this category">
                ${ICONS.plus} Add Link
              </button>
              <button class="mega-mini-btn" data-del-cat="${escapeHtml(menu.id)}" data-cat-id="${escapeHtml(cat.id)}" title="Delete this category">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <div class="mega-grid ${viewMode === 'list' ? 'list-view' : ''}" data-mega-grid="${escapeHtml(menu.id)}" data-mega-cat-grid="${escapeHtml(cat.id)}">
            ${cat.links.map(link => renderMegaLink(link)).join('')}
          </div>
        </div>
      `).join('')}
      <div class="mega-panel-footer">
        <button class="mega-add-cat-btn" data-add-cat="${escapeHtml(menu.id)}">
          ${ICONS.plus} Add Category
        </button>
        <button class="mega-add-link-btn" data-add-link="${escapeHtml(menu.id)}" data-cat-id="">
          ${ICONS.plus} Quick Add Link
        </button>
      </div>
    `;

    // Wire search
    const search = panel.querySelector('.mega-panel-search');
    search.addEventListener('input', debounce(() => {
      const q = search.value.trim().toLowerCase();
      $$('.mega-link', panel).forEach(link => {
        const t = (link.dataset.title + ' ' + link.dataset.sub).toLowerCase();
        link.style.display = t.includes(q) ? '' : 'none';
      });
    }, 150));

    // Wire view toggles
    $$('.view-mini', panel).forEach(b => {
      b.addEventListener('click', () => {
        const mode = b.dataset.megaView;
        state.megaViewModes[menu.id] = mode;
        $$('.view-mini', panel).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        $$('.mega-grid', panel).forEach(g => g.classList.toggle('list-view', mode === 'list'));
      });
    });

    // Wire add link buttons
    $$('[data-add-link]', panel).forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        openAddMegaLinkModal(b.dataset.addLink, b.dataset.catId || (menu.categories[0]?.id || ''));
      });
    });

    // Wire add category
    $$('[data-add-cat]', panel).forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        openAddMegaCategoryModal(b.dataset.addCat);
      });
    });

    // Wire delete category
    $$('[data-del-cat]', panel).forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuId = b.dataset.delCat;
        const catId = b.dataset.catId;
        if (!confirm('Delete this category and all its links?')) return;
        const m = state.megaMenu.find(x => x.id === menuId);
        if (m) {
          m.categories = m.categories.filter(c => c.id !== catId);
          saveMegaMenu();
          renderMegaPanel(m);
          toast('warning', 'Category deleted', 'Category removed.');
        }
      });
    });

    // Wire link clicks — opens ALL urls in new tabs
    $$('.mega-link', panel).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urls = JSON.parse(link.dataset.urls || '[]');
        urls.forEach((url, i) => {
          // Slight delay to avoid popup blocking
          setTimeout(() => window.open(url, '_blank', 'noopener'), i * 100);
        });
        toast('success', 'Opened', `${urls.length} ${urls.length === 1 ? 'link' : 'links'} opened in new tab${urls.length > 1 ? 's' : ''}.`);
      });
    });
  }

  function renderMegaLink(link) {
    const urls = link.urls || [];
    const badge = urls.length > 1 ? `<span class="mega-link-badge">${urls.length}</span>` : '';
    return `
      <a class="mega-link" href="${escapeHtml(urls[0] || '#')}"
         data-title="${escapeHtml(link.title)}" data-sub="${escapeHtml(link.sub || '')}"
         data-urls="${escapeHtml(JSON.stringify(urls))}">
        <div class="mega-link-icon">${ICONS[link.icon] || ICONS.globe}</div>
        <div class="mega-link-text">
          <div class="mega-link-title">${escapeHtml(link.title)} ${badge}</div>
          <div class="mega-link-sub">${escapeHtml(link.sub || '')}</div>
        </div>
        <div class="mega-link-ext">${ICONS['external-link']}</div>
      </a>
    `;
  }

  // ============================================================
  // ADD MEGA LINK / CATEGORY / MENU MODALS
  // ============================================================
  function openAddMegaLinkModal(menuId, catId) {
    state.pendingMegaContext = { type: 'link', menuId, catId };
    $('#addMegaLinkTitle').textContent = 'Add Link';
    $('#megaLinkTitle').value = '';
    $('#megaLinkSub').value = '';
    $('#megaLinkUrls').value = '';
    $('#megaLinkIcon').value = 'globe';
    $('#addMegaLinkModal').classList.add('open');
    setTimeout(() => $('#megaLinkTitle').focus(), 50);
  }
  function closeAddMegaLinkModal() {
    $('#addMegaLinkModal').classList.remove('open');
    state.pendingMegaContext = null;
  }
  function submitAddMegaLink(e) {
    e.preventDefault();
    const ctx = state.pendingMegaContext;
    if (!ctx) return;
    const title = $('#megaLinkTitle').value.trim();
    const sub = $('#megaLinkSub').value.trim();
    const urlsRaw = $('#megaLinkUrls').value.trim();
    const icon = $('#megaLinkIcon').value;
    if (!title || !urlsRaw) { toast('error', 'Required', 'Title and at least one URL required.'); return; }
    const urls = urlsRaw.split('\n').map(u => u.trim()).filter(u => u);
    const menu = state.megaMenu.find(m => m.id === ctx.menuId);
    if (!menu) return;
    let cat = menu.categories.find(c => c.id === ctx.catId);
    if (!cat) {
      // Create a default category if none exists
      cat = { id: uuid(), name: 'General', links: [] };
      menu.categories.push(cat);
    }
    cat.links.push({ title, sub, urls, icon });
    saveMegaMenu();
    renderMegaPanel(menu);
    closeAddMegaLinkModal();
    toast('success', 'Link added', `"${title}" added to ${menu.title} → ${cat.name}.`);
  }

  function openAddMegaCategoryModal(menuId) {
    state.pendingMegaContext = { type: 'category', menuId };
    $('#megaCatName').value = '';
    $('#addMegaCategoryModal').classList.add('open');
    setTimeout(() => $('#megaCatName').focus(), 50);
  }
  function closeAddMegaCategoryModal() {
    $('#addMegaCategoryModal').classList.remove('open');
    state.pendingMegaContext = null;
  }
  function submitAddMegaCategory(e) {
    e.preventDefault();
    const ctx = state.pendingMegaContext;
    if (!ctx) return;
    const name = $('#megaCatName').value.trim();
    if (!name) { toast('error', 'Required', 'Category name required.'); return; }
    const menu = state.megaMenu.find(m => m.id === ctx.menuId);
    if (!menu) return;
    menu.categories.push({ id: uuid(), name, links: [] });
    saveMegaMenu();
    renderMegaPanel(menu);
    closeAddMegaCategoryModal();
    toast('success', 'Category added', `"${name}" added to ${menu.title}.`);
  }

  function openAddMegaMenuModal() {
    $('#megaMenuName').value = '';
    $('#addMegaMenuModal').classList.add('open');
    setTimeout(() => $('#megaMenuName').focus(), 50);
  }
  function closeAddMegaMenuModal() {
    $('#addMegaMenuModal').classList.remove('open');
  }
  function submitAddMegaMenu(e) {
    e.preventDefault();
    const name = $('#megaMenuName').value.trim();
    if (!name) { toast('error', 'Required', 'Menu name required.'); return; }
    state.megaMenu.push({
      id: uuid(),
      title: name,
      icon: 'globe',
      categories: [{ id: uuid(), name: 'General', links: [] }]
    });
    saveMegaMenu();
    buildMegaMenu();
    closeAddMegaMenuModal();
    toast('success', 'Menu added', `"${name}" menu created.`);
  }

  // ============================================================
  // CONTEXT MENU
  // ============================================================
  function showContextMenu(x, y, id) {
    const menu = $('#contextMenu');
    menu.innerHTML = `
      <button data-act="copy"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</button>
      <button data-act="fav"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Toggle favorite</button>
      <button data-act="edit"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit</button>
      <button data-act="duplicate"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Duplicate</button>
      <div class="divider"></div>
      <button data-act="delete" class="danger"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete</button>`;
    menu.style.left = Math.min(x, window.innerWidth - 220) + 'px';
    menu.style.top = Math.min(y, window.innerHeight - 240) + 'px';
    menu.hidden = false;
    $$('button', menu).forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.act;
        const card = $$('.resp-card').find(c => c.dataset.id === id);
        const copyBtn = card?.querySelector('[data-act="copy"]');
        if (act === 'copy') copyResponse(id, copyBtn);
        else if (act === 'fav') toggleFavorite(id);
        else if (act === 'edit') openModal(id);
        else if (act === 'duplicate') duplicateResponse(id);
        else if (act === 'delete') deleteResponse(id);
        menu.hidden = true;
      });
    });
  }
  function duplicateResponse(id) {
    const r = state.data.responses.find(x => x.id === id);
    if (!r) return;
    const copy = { ...r, id: uuid(), title: r.title + ' (copy)', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), usageCount: 0 };
    state.data.responses.push(copy);
    saveData(state.data);
    renderResponses();
    renderSidebar();
    toast('success', 'Duplicated', `Created copy of "${r.title}".`);
  }

  // ============================================================
  // BACKUP / RESTORE / EXPORT / IMPORT
  // ============================================================
  function exportJSON() {
    const data = { ...state.data, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    download(blob, `zepio-responses-${dateStr()}.json`);
    toast('success', 'Backup complete', 'JSON file downloaded.');
  }
  function exportCSV() {
    const langs = state.data.languages;
    const headers = ['id','title','category','subcategory',
      ...langs.map(l => `content_${l.code}`),
      'tags','favorite','usageCount','createdAt','updatedAt'];
    const rows = state.data.responses.map(r => [
      r.id, r.title, r.category, r.subcategory,
      ...langs.map(l => r.translations?.[l.code] || ''),
      (r.tags || []).join('|'),
      r.favorite ? 'true' : 'false',
      r.usageCount || 0,
      r.createdAt, r.updatedAt
    ]);
    const csv = [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    download(blob, `zepio-responses-${dateStr()}.csv`);
    toast('success', 'Export complete', 'CSV file downloaded.');
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function dateStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function importFile(file) {
    const reader = new FileReader();
    const isCSV = file.name.toLowerCase().endsWith('.csv');
    reader.onload = (e) => {
      try {
        let imported;
        if (isCSV) {
          const text = e.target.result;
          const lines = text.split(/\r?\n/).filter(Boolean);
          const headers = parseCSVLine(lines[0]);
          const responses = lines.slice(1).map(line => {
            const cells = parseCSVLine(line);
            const obj = {};
            headers.forEach((h, i) => obj[h] = cells[i] || '');
            const translations = {};
            Object.keys(obj).forEach(k => {
              if (k.startsWith('content_')) translations[k.replace('content_', '')] = obj[k];
            });
            return {
              id: obj.id || uuid(),
              title: obj.title || 'Untitled',
              category: obj.category || 'Uncategorized',
              subcategory: obj.subcategory || '',
              translations,
              tags: (obj.tags || '').split('|').filter(Boolean),
              favorite: obj.favorite === 'true',
              usageCount: parseInt(obj.usageCount) || 0,
              createdAt: obj.createdAt || new Date().toISOString(),
              updatedAt: obj.updatedAt || new Date().toISOString()
            };
          });
          const langCodes = headers.filter(h => h.startsWith('content_')).map(h => h.replace('content_', ''));
          const langs = langCodes.length ? langCodes.map(c => {
            const existing = state.data.languages.find(l => l.code === c);
            return existing || { code: c, name: c.toUpperCase() };
          }) : state.data.languages;
          imported = {
            version: '2.0.0',
            exportedAt: new Date().toISOString(),
            languages: langs,
            categories: state.data.categories,
            subcategories: state.data.subcategories,
            responses
          };
        } else {
          imported = JSON.parse(e.target.result);
          if (!imported.responses || !Array.isArray(imported.responses)) throw new Error('Invalid JSON');
          if (!imported.languages) imported.languages = state.data.languages;
          if (!imported.categories) imported.categories = state.data.categories;
          if (!imported.subcategories) imported.subcategories = state.data.subcategories;
        }
        if (confirm(`Import ${imported.responses.length} responses? This will replace your current data.`)) {
          state.data = imported;
          saveData(state.data);
          renderSidebar();
          renderTagMenu();
          renderLangSwitcher();
          renderResponses();
          toast('success', 'Imported', `${imported.responses.length} responses loaded.`);
        }
      } catch (err) {
        toast('error', 'Import failed', err.message);
      }
    };
    reader.readAsText(file);
  }
  function resetData() {
    if (!confirm('Reset all responses to default? Settings & history are preserved.')) return;
    localStorage.removeItem(LS.data);
    state.data = JSON.parse(JSON.stringify(FALLBACK_DATA));
    fetch('data.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => { state.data = j; saveData(state.data); })
      .catch(() => {})
      .finally(() => {
        renderSidebar(); renderTagMenu(); renderLangSwitcher(); renderResponses();
        toast('success', 'Reset', 'Default responses restored.');
      });
  }
  function clearData() {
    if (!confirm('Delete ALL responses? This is permanent.')) return;
    state.data.responses = [];
    saveData(state.data);
    renderSidebar(); renderTagMenu(); renderResponses();
    toast('warning', 'Cleared', 'All responses removed.');
  }

  // ============================================================
  // JSON ↔ CSV CONVERTER
  // ============================================================
  function convertJsonToCsv() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const j = JSON.parse(ev.target.result);
          if (!j.responses) { toast('error', 'Invalid', 'No "responses" array found.'); return; }
          const langs = j.languages?.map(l => l.code) || ['en','hi','hng','bn'];
          const headers = ['id','title','category','subcategory',
            ...langs.map(c => `content_${c}`),
            'tags','favorite','usageCount','createdAt','updatedAt'];
          const rows = j.responses.map(r => [
            r.id, r.title, r.category, r.subcategory,
            ...langs.map(c => r.translations?.[c] || ''),
            (r.tags || []).join('|'),
            r.favorite ? 'true' : 'false',
            r.usageCount || 0,
            r.createdAt, r.updatedAt
          ]);
          const csv = [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\r\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          download(blob, f.name.replace(/\.json$/, '') + '.csv');
          toast('success', 'Converted', `${f.name} → CSV`);
        } catch (err) {
          toast('error', 'Convert failed', err.message);
        }
      };
      r.readAsText(f);
    };
    input.click();
  }
  function convertCsvToJson() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.csv';
    input.onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const text = ev.target.result;
          const lines = text.split(/\r?\n/).filter(Boolean);
          const headers = parseCSVLine(lines[0]);
          const responses = lines.slice(1).map(line => {
            const cells = parseCSVLine(line);
            const obj = {};
            headers.forEach((h, i) => obj[h] = cells[i] || '');
            const translations = {};
            Object.keys(obj).forEach(k => {
              if (k.startsWith('content_')) translations[k.replace('content_', '')] = obj[k];
            });
            return {
              id: obj.id || uuid(),
              title: obj.title || 'Untitled',
              category: obj.category || 'Uncategorized',
              subcategory: obj.subcategory || '',
              translations,
              tags: (obj.tags || '').split('|').filter(Boolean),
              favorite: obj.favorite === 'true',
              usageCount: parseInt(obj.usageCount) || 0,
              createdAt: obj.createdAt || new Date().toISOString(),
              updatedAt: obj.updatedAt || new Date().toISOString()
            };
          });
          const langCodes = headers.filter(h => h.startsWith('content_')).map(h => h.replace('content_', ''));
          const out = {
            version: '2.0.0',
            exportedAt: new Date().toISOString(),
            languages: langCodes.map(c => ({ code: c, name: c.toUpperCase() })),
            categories: state.data.categories,
            subcategories: state.data.subcategories,
            responses
          };
          const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
          download(blob, f.name.replace(/\.csv$/, '') + '.json');
          toast('success', 'Converted', `${f.name} → JSON`);
        } catch (err) {
          toast('error', 'Convert failed', err.message);
        }
      };
      r.readAsText(f);
    };
    input.click();
  }

  // ============================================================
  // SETTINGS EXPORT / IMPORT
  // ============================================================
  function exportSettings() {
    const blob = new Blob([JSON.stringify(state.settings, null, 2)], { type: 'application/json' });
    download(blob, `zepio-settings-${dateStr()}.json`);
    toast('success', 'Settings exported', 'Config saved as JSON.');
  }
  function importSettings(file) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const j = JSON.parse(e.target.result);
        state.settings = {
          ...DEFAULT_SETTINGS,
          ...j,
          features: { ...DEFAULT_SETTINGS.features, ...(j.features || {}) }
        };
        saveSettings(); applySettings(); renderFeatureToggles();
        toast('success', 'Settings imported', 'Configuration restored.');
      } catch (err) {
        toast('error', 'Import failed', err.message);
      }
    };
    r.readAsText(file);
  }

  // ============================================================
  // COPY HISTORY
  // ============================================================
  function refreshHistoryCount() {
    const h = loadHistory();
    const el = $('#historyCount');
    if (el) el.textContent = h.length;
  }
  function exportHistory(format) {
    const h = loadHistory();
    if (!h.length) { toast('warning', 'No history', 'Nothing to export.'); return; }
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(h, null, 2)], { type: 'application/json' });
      download(blob, `zepio-copy-history-${dateStr()}.json`);
    } else {
      const headers = ['id','responseId','title','category','subcategory','language','timestamp'];
      const rows = h.map(x => [x.id, x.responseId, x.title, x.category, x.subcategory, x.language, x.timestamp]);
      const csv = [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      download(blob, `zepio-copy-history-${dateStr()}.csv`);
    }
    toast('success', 'History exported', `${h.length} records (${format.toUpperCase()}).`);
  }
  function clearHistory() {
    if (!confirm('Clear all copy history? This cannot be undone.')) return;
    saveHistory([]);
    refreshHistoryCount();
    toast('warning', 'History cleared', 'Copy log reset.');
  }

  // ============================================================
  // FEATURE TOGGLES
  // ============================================================
  const FEATURE_DEFS = [
    { key: 'mega-menu', label: 'Top Mega Menu', desc: 'Store / Competitors / Knowledge base' },
    { key: 'breadcrumb', label: 'Breadcrumb Bar', desc: 'Category / subcategory trail' },
    { key: 'search', label: 'Response Search', desc: 'Search canned responses' },
    { key: 'filters', label: 'Filters Button', desc: 'Sort / date / favorites / language panel' },
    { key: 'tag-filter', label: 'Tag Filter', desc: 'Filter by tags dropdown' },
    { key: 'date-filter', label: 'Date Filter', desc: 'Quick date range dropdown' },
    { key: 'fav-toggle', label: 'Favorites Quick Toggle', desc: 'Star icon button' },
    { key: 'lang-switcher', label: 'Language Switcher', desc: 'Top-bar language selector' },
    { key: 'view-toggle', label: 'View Toggle', desc: 'Grid / list / compact switch' },
    { key: 'add-btn', label: 'Add New Button', desc: 'New response creation' }
  ];
  function renderFeatureToggles() {
    const wrap = $('#featureToggles');
    if (!wrap) return;
    wrap.innerHTML = FEATURE_DEFS.map(f => `
      <div class="feature-toggle-row">
        <div>
          <label>${escapeHtml(f.label)}</label>
          <div class="feature-desc">${escapeHtml(f.desc)}</div>
        </div>
        <label class="switch">
          <input type="checkbox" data-feature-toggle="${f.key}" ${state.settings.features[f.key] ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      </div>`).join('');
    $$('[data-feature-toggle]', wrap).forEach(cb => {
      cb.addEventListener('change', () => {
        state.settings.features[cb.dataset.featureToggle] = cb.checked;
        saveSettings(); applySettings();
        toast('success', 'Feature toggled', `${cb.dataset.featureToggle}: ${cb.checked ? 'ON' : 'OFF'}`);
      });
    });
  }

  // ============================================================
  // ADVANCED SETTINGS MODAL — with working Save & Apply
  // ============================================================
  let advSettingsBackup = null;
  function openAdvanced() {
    // Take a backup so Cancel can restore
    advSettingsBackup = JSON.parse(JSON.stringify(state.settings));

    const body = $('#advancedBody');
    body.innerHTML = `
      <div class="advanced-section">
        <h4>Appearance</h4>
        <div class="setting-row"><label>Theme</label>
          <div class="theme-toggle" id="advTheme">
            <button data-theme="light">Light</button>
            <button data-theme="dark" class="active">Dark</button>
            <button data-theme="auto">Auto</button>
          </div>
        </div>
        <div class="setting-row"><label>Accent</label>
          <div class="accent-swatches" id="advAccent"></div>
        </div>
        <div class="setting-row"><label>Font</label>
          <select id="advFont" class="select-input">
            <option value="inter">Inter</option>
            <option value="poppins">Poppins</option>
            <option value="manrope">Manrope</option>
            <option value="space-grotesk">Space Grotesk</option>
            <option value="roboto">Roboto</option>
            <option value="lora">Lora (Serif)</option>
            <option value="playfair">Playfair (Serif)</option>
            <option value="jetbrains">JetBrains Mono</option>
            <option value="source-code">Source Code Pro</option>
            <option value="system">System UI</option>
          </select>
        </div>
        <div class="setting-row"><label>Font Size</label>
          <div class="slider-row">
            <input type="range" id="advFontSize" min="12" max="20" value="${state.settings.fontSize}">
            <span class="slider-value" id="advFontSizeValue">${state.settings.fontSize}px</span>
          </div>
        </div>
        <div class="setting-row"><label>Radius</label>
          <div class="slider-row">
            <input type="range" id="advRadius" min="0" max="24" value="${state.settings.radius}">
            <span class="slider-value" id="advRadiusValue">${state.settings.radius}px</span>
          </div>
        </div>
      </div>
      <div class="advanced-section">
        <h4>Mode & Features</h4>
        <div class="setting-row"><label>Test Mode (no copy tracking)</label>
          <label class="switch"><input type="checkbox" id="advTestMode" ${state.settings.testMode?'checked':''}><span class="slider"></span></label>
        </div>
        <div class="setting-row"><label>Animations</label>
          <label class="switch"><input type="checkbox" id="advAnim" ${state.settings.animations?'checked':''}><span class="slider"></span></label>
        </div>
        <div class="setting-row"><label>Glassmorphism</label>
          <label class="switch"><input type="checkbox" id="advGlass" ${state.settings.glass?'checked':''}><span class="slider"></span></label>
        </div>
        <div class="setting-row"><label>Density</label>
          <div class="theme-toggle" id="advDensity">
            <button data-density="compact">Compact</button>
            <button data-density="comfortable" class="active">Comfortable</button>
            <button data-density="spacious">Spacious</button>
          </div>
        </div>
        <h4 style="margin-top:16px;">Data Tools</h4>
        <button class="setting-btn" id="advExportJson"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export responses JSON</button>
        <button class="setting-btn" id="advExportCsv" style="margin-top:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export responses CSV</button>
      </div>
      <div class="advanced-section">
        <h4>Feature Visibility</h4>
        <div id="advFeatureList"></div>
      </div>
      <div class="advanced-section">
        <h4>Settings Management</h4>
        <button class="setting-btn" id="advExportSettings"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export settings JSON</button>
        <button class="setting-btn" id="advImportSettings" style="margin-top:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>Import settings JSON</button>
        <h4 style="margin-top:16px;">JSON ↔ CSV</h4>
        <div class="converter-grid">
          <button class="setting-btn" id="advJsonCsv">JSON → CSV</button>
          <button class="setting-btn" id="advCsvJson">CSV → JSON</button>
        </div>
      </div>
    `;

    // Build accent swatches
    const advAccent = $('#advAccent');
    ['#f59e0b','#6366f1','#8b5cf6','#ec4899','#f43f5e','#10b981','#06b6d4','#3b82f6','#84cc16','#14b8a6'].forEach(c => {
      const s = document.createElement('button');
      s.className = 'swatch' + (state.settings.accent === c ? ' active' : '');
      s.style.setProperty('--c', c);
      s.dataset.accent = c;
      advAccent.appendChild(s);
    });

    // Sync current settings state
    $$('#advTheme button[data-theme]').forEach(b =>
      b.classList.toggle('active', b.dataset.theme === state.settings.theme));
    $$('#advDensity button[data-density]').forEach(b =>
      b.classList.toggle('active', b.dataset.density === state.settings.density));

    // Wire advanced controls — these update state.settings directly (live preview)
    $$('#advTheme button[data-theme]').forEach(b => b.addEventListener('click', () => {
      state.settings.theme = b.dataset.theme;
      $$('#advTheme button[data-theme]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    }));
    $$('#advDensity button[data-density]').forEach(b => b.addEventListener('click', () => {
      state.settings.density = b.dataset.density;
      $$('#advDensity button[data-density]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    }));
    $$('.swatch', advAccent).forEach(s => s.addEventListener('click', () => {
      state.settings.accent = s.dataset.accent;
      $$('.swatch', advAccent).forEach(x => x.classList.remove('active'));
      s.classList.add('active');
    }));
    $('#advFont').value = state.settings.font;
    $('#advFont').addEventListener('change', e => { state.settings.font = e.target.value; });
    $('#advFontSize').addEventListener('input', e => {
      state.settings.fontSize = parseInt(e.target.value);
      $('#advFontSizeValue').textContent = state.settings.fontSize + 'px';
    });
    $('#advRadius').addEventListener('input', e => {
      state.settings.radius = parseInt(e.target.value);
      $('#advRadiusValue').textContent = state.settings.radius + 'px';
    });
    $('#advTestMode').addEventListener('change', e => { state.settings.testMode = e.target.checked; });
    $('#advAnim').addEventListener('change', e => { state.settings.animations = e.target.checked; });
    $('#advGlass').addEventListener('change', e => { state.settings.glass = e.target.checked; });

    // Feature toggles
    const advList = $('#advFeatureList');
    advList.innerHTML = FEATURE_DEFS.map(f => `
      <div class="feature-toggle-row" style="margin-bottom:6px;">
        <div><label>${escapeHtml(f.label)}</label><div class="feature-desc">${escapeHtml(f.desc)}</div></div>
        <label class="switch"><input type="checkbox" data-feature-toggle="${f.key}" ${state.settings.features[f.key]?'checked':''}><span class="slider"></span></label>
      </div>`).join('');
    $$('[data-feature-toggle]', advList).forEach(cb => cb.addEventListener('change', () => {
      state.settings.features[cb.dataset.featureToggle] = cb.checked;
    }));

    // Data tool buttons
    $('#advExportJson').addEventListener('click', exportJSON);
    $('#advExportCsv').addEventListener('click', exportCSV);
    $('#advExportSettings').addEventListener('click', exportSettings);
    $('#advImportSettings').addEventListener('click', () => $('#settingsFile').click());
    $('#advJsonCsv').addEventListener('click', convertJsonToCsv);
    $('#advCsvJson').addEventListener('click', convertCsvToJson);

    $('#advancedModal').classList.add('open');
    $('#advancedModal').setAttribute('aria-hidden', 'false');
  }

  function applyAdvancedAndClose() {
    // Apply all settings
    saveSettings();
    applySettings();
    closeAdvanced();
    toast('success', 'Settings applied', 'All changes saved and applied.');
  }

  function cancelAdvanced() {
    // Restore backup
    if (advSettingsBackup) {
      state.settings = JSON.parse(JSON.stringify(advSettingsBackup));
      applySettings();
    }
    closeAdvanced();
  }

  function closeAdvanced() {
    $('#advancedModal').classList.remove('open');
    $('#advancedModal').setAttribute('aria-hidden', 'true');
  }

  // ============================================================
  // TOAST
  // ============================================================
  function toast(type = 'success', title = '', msg = '', timeout = 3000) {
    const wrap = $('#toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = {
      success: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      warning: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>'
    };
    t.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.success}</div>
      <div class="toast-text">
        <div class="toast-title">${escapeHtml(title)}</div>
        ${msg ? `<div class="toast-msg">${escapeHtml(msg)}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Close">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    wrap.appendChild(t);
    const remove = () => { t.classList.add('exit'); setTimeout(() => t.remove(), 250); };
    t.querySelector('.toast-close').addEventListener('click', remove);
    if (timeout) setTimeout(remove, timeout);
  }

  // ============================================================
  // SIDEBAR RESIZE + COLLAPSE FIX
  // ============================================================
  function bindSidebarResize() {
    const handle = $('#resizeHandle');
    const shell = $('#appShell');
    let dragging = false, startX = 0, startW = 0;
    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      startW = $('#sidebar').offsetWidth;
      handle.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const newW = Math.max(220, Math.min(600, startW + (e.clientX - startX)));
      // Don't set inline style if collapsed
      if (!shell.classList.contains('sidebar-collapsed')) {
        shell.style.gridTemplateColumns = `${newW}px 1fr`;
        document.documentElement.style.setProperty('--sidebar-w', newW + 'px');
      }
    });
    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      const w = $('#sidebar').offsetWidth;
      if (!shell.classList.contains('sidebar-collapsed')) {
        localStorage.setItem('zepio_sidebar_w', String(w));
      }
    });
    // Restore persisted width
    const savedW = parseInt(localStorage.getItem('zepio_sidebar_w'));
    if (savedW && savedW >= 220 && savedW <= 600 && !shell.classList.contains('sidebar-collapsed')) {
      shell.style.gridTemplateColumns = `${savedW}px 1fr`;
      document.documentElement.style.setProperty('--sidebar-w', savedW + 'px');
    }
  }

  function toggleSidebarCollapse() {
    const shell = $('#appShell');
    shell.classList.toggle('sidebar-collapsed');
    if (shell.classList.contains('sidebar-collapsed')) {
      // Clear inline style so CSS !important class takes over
      shell.style.gridTemplateColumns = '';
    } else {
      // Restore saved width
      const savedW = parseInt(localStorage.getItem('zepio_sidebar_w'));
      if (savedW && savedW >= 220 && savedW <= 600) {
        shell.style.gridTemplateColumns = `${savedW}px 1fr`;
        document.documentElement.style.setProperty('--sidebar-w', savedW + 'px');
      }
    }
    saveSelection();
  }

  // ============================================================
  // SETTINGS PANEL OPEN/CLOSE
  // ============================================================
  function openSettings() {
    $('#settingsPanel').classList.add('open');
    $('#settingsPanel').setAttribute('aria-hidden', 'false');
    $('#overlay').hidden = false;
    requestAnimationFrame(() => $('#overlay').classList.add('show'));
  }
  function closeSettings() {
    $('#settingsPanel').classList.remove('open');
    $('#settingsPanel').setAttribute('aria-hidden', 'true');
    $('#overlay').classList.remove('show');
    setTimeout(() => { $('#overlay').hidden = true; }, 300);
  }

  // ============================================================
  // EVENT BINDINGS
  // ============================================================
  function bindEvents() {
    // Sidebar collapse — FIXED
    $('#collapseBtn').addEventListener('click', toggleSidebarCollapse);

    // Mobile menu
    $('#mobileMenuBtn').addEventListener('click', () => {
      $('#appShell').classList.toggle('sidebar-mobile-open');
    });

    // Mode toggle in topbar
    $('#modeSwitch').addEventListener('click', () => {
      state.settings.testMode = !state.settings.testMode;
      $('#testModeToggle').checked = state.settings.testMode;
      saveSettings();
      applySettings();
      toast('success', 'Mode',
        state.settings.testMode ? 'TEST MODE — copies not tracked' : 'LIVE MODE — copies logged');
    });

    // Global search (categories only)
    const gs = $('#globalSearch');
    gs.addEventListener('input', debounce(() => {
      state.globalSearch = gs.value;
      renderSidebar();
    }, 150));

    // Section search (responses)
    const ss = $('#sectionSearch');
    ss.addEventListener('input', debounce(() => {
      state.sectionSearch = ss.value;
      $('#clearSectionSearch').hidden = !ss.value;
      renderResponses();
    }, 150));
    $('#clearSectionSearch').addEventListener('click', () => {
      ss.value = '';
      state.sectionSearch = '';
      $('#clearSectionSearch').hidden = true;
      renderResponses();
    });

    // Search scope toggle
    $('#scopeToggle').addEventListener('click', () => {
      state.settings.searchScope = state.settings.searchScope === 'local' ? 'global' : 'local';
      saveSettings();
      applySettings();
      renderResponses();
      toast('success', 'Search scope',
        state.settings.searchScope === 'global' ? 'Now searching ALL responses' : 'Now searching current section only');
    });

    // Category nav
    $('#categoryNav').addEventListener('click', (e) => {
      const item = e.target.closest('.nav-item');
      const catHead = e.target.closest('.cat-head');
      const subItem = e.target.closest('.sub-item');
      if (item) {
        const target = item.dataset.target;
        selectCategory(target);
        $$('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      } else if (subItem) {
        selectCategory(subItem.dataset.cat, subItem.dataset.sub);
      } else if (catHead) {
        const catId = catHead.dataset.cat;
        if (state.openCategories.has(catId)) state.openCategories.delete(catId);
        else state.openCategories.add(catId);
        saveSelection();
        renderSidebar();
      }
    });

    // View toggle
    $$('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.view = btn.dataset.view;
        $('#responses').setAttribute('data-view', state.view);
        $$('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveSelection();
      });
    });

    // Filter dropdown
    $('#filterToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = e.currentTarget.closest('.dropdown');
      $$('.dropdown').forEach(d => { if (d !== dd) d.classList.remove('open'); });
      dd.classList.toggle('open');
    });
    $('#applyFiltersBtn').addEventListener('click', () => {
      state.sort = $('#inlineSort').value;
      state.dateFilter = $('#inlineDate').value;
      state.favOnly = $('#inlineFav').checked;
      state.settings.currentLang = $('#inlineLang').value;
      saveSettings();
      $$('#dateMenu button').forEach(b => b.classList.toggle('active', b.dataset.date === state.dateFilter));
      $('#favOnlyToggle').classList.toggle('active', state.favOnly);
      $('#langLabel').textContent = state.settings.currentLang.toUpperCase();
      $$('#langMenu button').forEach(b => b.classList.toggle('active', b.dataset.lang === state.settings.currentLang));
      $('.dropdown[data-dropdown="filter"]').classList.remove('open');
      renderResponses();
      toast('success', 'Filters applied', 'Updated view.');
    });
    $('#resetFiltersBtn').addEventListener('click', () => {
      $('#inlineSort').value = 'az';
      $('#inlineDate').value = 'all';
      $('#inlineFav').checked = false;
      $('#inlineLang').value = state.settings.currentLang;
      clearAllFilters();
    });

    // Tag dropdown
    $('#tagToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = e.currentTarget.closest('.dropdown');
      $$('.dropdown').forEach(d => { if (d !== dd) d.classList.remove('open'); });
      dd.classList.toggle('open');
    });

    // Date dropdown
    $('#dateToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = e.currentTarget.closest('.dropdown');
      $$('.dropdown').forEach(d => { if (d !== dd) d.classList.remove('open'); });
      dd.classList.toggle('open');
    });
    $$('#dateMenu button').forEach(btn => {
      btn.addEventListener('click', () => {
        state.dateFilter = btn.dataset.date;
        $$('#dateMenu button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.closest('.dropdown').classList.remove('open');
        renderResponses();
      });
    });

    // Favorites quick toggle
    $('#favOnlyToggle').addEventListener('click', (e) => {
      state.favOnly = !state.favOnly;
      e.currentTarget.classList.toggle('active', state.favOnly);
      renderResponses();
    });

    // Clear all filters
    $('#clearAllBtn').addEventListener('click', clearAllFilters);

    // Language switcher
    $('#langToggle').addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = e.currentTarget.closest('.dropdown');
      $$('.dropdown').forEach(d => { if (d !== dd) d.classList.remove('open'); });
      dd.classList.toggle('open');
    });

    // Add new response
    $('#addBtn').addEventListener('click', () => openModal());

    // Settings
    $('#settingsBtn').addEventListener('click', openSettings);
    $('#closeSettings').addEventListener('click', closeSettings);

    // Theme / accent / font / density / radius / fontSize / anim / glass / testMode
    $$('.theme-toggle button[data-theme]').forEach(b => b.addEventListener('click', () => {
      state.settings.theme = b.dataset.theme; saveSettings(); applySettings();
    }));
    $$('.swatch[data-accent]').forEach(s => s.addEventListener('click', () => {
      state.settings.accent = s.dataset.accent; saveSettings(); applySettings();
    }));
    $('#customAccent').addEventListener('input', e => {
      state.settings.accent = e.target.value; saveSettings(); applySettings();
    });
    $('#fontSelect').addEventListener('change', e => {
      state.settings.font = e.target.value; saveSettings(); applySettings();
    });
    $$('.theme-toggle button[data-density]').forEach(b => b.addEventListener('click', () => {
      state.settings.density = b.dataset.density; saveSettings(); applySettings();
    }));
    $('#radiusSlider').addEventListener('input', e => {
      state.settings.radius = parseInt(e.target.value);
      $('#radiusValue').textContent = state.settings.radius + 'px';
      saveSettings(); applySettings();
    });
    // Font size slider — ALSO set body fontSize directly for immediate effect
    $('#fontSizeSlider').addEventListener('input', e => {
      state.settings.fontSize = parseInt(e.target.value);
      $('#fontSizeValue').textContent = state.settings.fontSize + 'px';
      saveSettings();
      applySettings();
    });
    $('#animToggle').addEventListener('change', e => {
      state.settings.animations = e.target.checked; saveSettings(); applySettings();
    });
    $('#glassToggle').addEventListener('change', e => {
      state.settings.glass = e.target.checked; saveSettings(); applySettings();
    });
    $('#testModeToggle').addEventListener('change', e => {
      state.settings.testMode = e.target.checked; saveSettings(); applySettings();
      toast('success', 'Mode',
        state.settings.testMode ? 'TEST MODE — copies not tracked' : 'LIVE MODE — copies logged');
    });

    // Data buttons
    $('#exportJsonBtn').addEventListener('click', exportJSON);
    $('#exportCsvBtn').addEventListener('click', exportCSV);
    $('#importBtn').addEventListener('click', () => $('#restoreFile').click());
    $('#resetDataBtn').addEventListener('click', resetData);
    $('#clearDataBtn').addEventListener('click', clearData);
    $('#backupBtn').addEventListener('click', exportJSON);
    $('#restoreBtn').addEventListener('click', () => $('#restoreFile').click());
    $('#restoreFile').addEventListener('change', e => {
      const f = e.target.files[0]; if (f) importFile(f); e.target.value = '';
    });

    // History
    $('#exportHistoryJsonBtn').addEventListener('click', () => exportHistory('json'));
    $('#exportHistoryCsvBtn').addEventListener('click', () => exportHistory('csv'));
    $('#clearHistoryBtn').addEventListener('click', clearHistory);

    // JSON ↔ CSV
    $('#convertJsonToCsvBtn').addEventListener('click', convertJsonToCsv);
    $('#convertCsvToJsonBtn').addEventListener('click', convertCsvToJson);

    // Settings export/import
    $('#exportSettingsBtn').addEventListener('click', exportSettings);
    $('#importSettingsBtn').addEventListener('click', () => $('#settingsFile').click());
    $('#settingsFile').addEventListener('change', e => {
      const f = e.target.files[0]; if (f) importSettings(f); e.target.value = '';
    });

    // Advanced
    $('#openAdvancedBtn').addEventListener('click', openAdvanced);
    // Save & Apply button
    $('#saveAdvancedBtn').addEventListener('click', applyAdvancedAndClose);
    // Cancel buttons restore state
    $$('[data-close-advanced]').forEach(el => el.addEventListener('click', cancelAdvanced));

    // Response modal
    $('#responseForm').addEventListener('submit', saveResponse);
    $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));

    // Add language modal
    $('#addLangForm').addEventListener('submit', addLanguage);
    $$('[data-close-addlang]').forEach(el => el.addEventListener('click', closeAddLangModal));

    // Add mega link modal
    $('#addMegaLinkForm').addEventListener('submit', submitAddMegaLink);
    $$('[data-close-mega-link]').forEach(el => el.addEventListener('click', closeAddMegaLinkModal));

    // Add mega category modal
    $('#addMegaCategoryForm').addEventListener('submit', submitAddMegaCategory);
    $$('[data-close-mega-cat]').forEach(el => el.addEventListener('click', closeAddMegaCategoryModal));

    // Add mega menu modal
    $('#addMegaMenuForm').addEventListener('submit', submitAddMegaMenu);
    $$('[data-close-mega-menu]').forEach(el => el.addEventListener('click', closeAddMegaMenuModal));

    // Bulk actions
    $('#bulkClear').addEventListener('click', clearSelection);
    $('#bulkFav').addEventListener('click', () => {
      state.selectedIds.forEach(id => {
        const r = state.data.responses.find(x => x.id === id);
        if (r) r.favorite = true;
      });
      saveData(state.data);
      clearSelection(); renderSidebar();
      toast('success', 'Updated', 'Marked as favorite.');
    });
    $('#bulkCopy').addEventListener('click', () => {
      const list = state.data.responses.filter(r => state.selectedIds.has(r.id));
      const text = list.map(r => `# ${r.title}\n\n${r.translations?.[state.settings.currentLang] || r.translations?.en || ''}`).join('\n\n---\n\n');
      navigator.clipboard.writeText(text).then(() => {
        toast('success', 'Copied', `${list.length} responses copied.`);
        clearSelection();
      });
    });
    $('#bulkExport').addEventListener('click', () => {
      const list = state.data.responses.filter(r => state.selectedIds.has(r.id));
      const blob = new Blob([JSON.stringify({ version:'2.0.0', responses: list }, null, 2)], { type: 'application/json' });
      download(blob, `zepio-selection-${dateStr()}.json`);
      clearSelection();
      toast('success', 'Exported', `${list.length} responses exported.`);
    });
    $('#bulkDelete').addEventListener('click', () => {
      if (!confirm(`Delete ${state.selectedIds.size} responses?`)) return;
      state.data.responses = state.data.responses.filter(r => !state.selectedIds.has(r.id));
      saveData(state.data);
      clearSelection(); renderSidebar();
      toast('warning', 'Deleted', 'Selected responses removed.');
    });

    // Click outside dropdowns / mega / context menu
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown') && !e.target.closest('.mega-item') && !e.target.closest('.mega-add-menu-btn')) {
        $$('.dropdown').forEach(d => d.classList.remove('open'));
        $$('.mega-item').forEach(m => m.classList.remove('open'));
      }
      if (!e.target.closest('.context-menu')) {
        $('#contextMenu').hidden = true;
      }
    });

    document.addEventListener('keydown', handleShortcuts);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (state.settings.theme === 'auto') applySettings();
    });

    // Sidebar resize
    bindSidebarResize();

    // Close mobile sidebar on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        const shell = $('#appShell');
        if (shell.classList.contains('sidebar-mobile-open') &&
            !e.target.closest('.sidebar') &&
            !e.target.closest('#mobileMenuBtn')) {
          shell.classList.remove('sidebar-mobile-open');
        }
      }
    });
  }

  // ============================================================
  // KEYBOARD SHORTCUTS
  // ============================================================
  function handleShortcuts(e) {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'k') { e.preventDefault(); $('#globalSearch').focus(); $('#globalSearch').select(); }
    else if (mod && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      state.settings.searchScope = state.settings.searchScope === 'local' ? 'global' : 'local';
      saveSettings(); applySettings(); renderResponses();
      toast('success', 'Scope',
        state.settings.searchScope === 'global' ? 'Searching ALL responses' : 'Searching current section');
    }
    else if (mod && (e.key === 'f')) { e.preventDefault(); $('#sectionSearch').focus(); $('#sectionSearch').select(); }
    else if (mod && (e.key === 'n')) { e.preventDefault(); openModal(); }
    else if (mod && (e.key === 'b') && !e.shiftKey) { e.preventDefault(); toggleSidebarCollapse(); }
    else if (mod && e.key === ',') { e.preventDefault(); openSettings(); }
    else if (mod && e.shiftKey && (e.key === 'a' || e.key === 'A')) { e.preventDefault(); openAdvanced(); }
    else if (mod && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
      saveSettings(); applySettings();
      toast('success', 'Theme', `Switched to ${state.settings.theme}`);
    }
    else if (mod && e.shiftKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      state.settings.testMode = !state.settings.testMode;
      $('#testModeToggle').checked = state.settings.testMode;
      saveSettings(); applySettings();
      toast('success', 'Mode',
        state.settings.testMode ? 'TEST MODE ON' : 'LIVE MODE ON');
    }
    else if (mod && e.shiftKey && (e.key === 'g' || e.key === 'G')) {
      e.preventDefault();
      state.view = 'grid';
      applySettings(); saveSelection(); renderResponses();
    }
    else if (mod && e.shiftKey && (e.key === 'v' || e.key === 'V')) {
      e.preventDefault();
      state.view = 'list';
      applySettings(); saveSelection(); renderResponses();
    }
    else if (mod && e.shiftKey && (e.key === 'e' || e.key === 'E') && !e.altKey) {
      e.preventDefault(); exportJSON();
    }
    else if (mod && e.altKey && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault(); exportCSV();
    }
    else if (mod && e.shiftKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault(); exportJSON();
    }
    else if (mod && e.shiftKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault(); $('#restoreFile').click();
    }
    else if (mod && e.shiftKey && e.code === 'Space') {
      e.preventDefault();
      const langs = state.data.languages;
      const i = langs.findIndex(l => l.code === state.settings.currentLang);
      const next = langs[(i + 1) % langs.length];
      if (next) {
        state.settings.currentLang = next.code;
        saveSettings(); applySettings();
        $$('#langMenu button').forEach(b => b.classList.toggle('active', b.dataset.lang === next.code));
        $('#langLabel').textContent = next.code.toUpperCase();
        renderResponses();
        toast('success', 'Language', `Switched to ${next.name}`);
      }
    }
    else if (e.key === 'Escape') {
      const modal = $('#responseModal');
      const sp = $('#settingsPanel');
      const cm = $('#contextMenu');
      const am = $('#advancedModal');
      const alm = $('#addLangModal');
      const aml = $('#addMegaLinkModal');
      const amc = $('#addMegaCategoryModal');
      const amm = $('#addMegaMenuModal');
      if (modal.classList.contains('open')) closeModal();
      else if (aml.classList.contains('open')) closeAddMegaLinkModal();
      else if (amc.classList.contains('open')) closeAddMegaCategoryModal();
      else if (amm.classList.contains('open')) closeAddMegaMenuModal();
      else if (alm.classList.contains('open')) closeAddLangModal();
      else if (am.classList.contains('open')) cancelAdvanced();
      else if (sp.classList.contains('open')) closeSettings();
      else if (!cm.hidden) cm.hidden = true;
      else if ($$('.dropdown.open').length) $$('.dropdown.open').forEach(d => d.classList.remove('open'));
      else if ($$('.mega-item.open').length) $$('.mega-item.open').forEach(m => m.classList.remove('open'));
      else if (state.selectMode) clearSelection();
      else clearAllFilters();
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  async function init() {
    state.settings = loadSettings();
    loadSelection();
    state.data = await loadData();
    state.megaMenu = loadMegaMenu();
    applySettings();
    renderSidebar();
    renderBreadcrumb();
    renderTagMenu();
    renderLangSwitcher();
    renderResponses();
    buildMegaMenu();
    refreshHistoryCount();
    bindEvents();

    if (!localStorage.getItem('zepio_welcomed_v21')) {
      setTimeout(() => {
        toast('success', 'Welcome to Zepio v2.1',
          'Ctrl+K categories, Ctrl+F responses, Ctrl+, settings, Ctrl+Shift+T test mode.', 5000);
        localStorage.setItem('zepio_welcomed_v21', '1');
      }, 500);
    }
  }

  window.addEventListener('DOMContentLoaded', init);
})();
