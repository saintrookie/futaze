/** i18n keys for the editorial panel shown per auth route — see auth.* in shared/i18n/locales. */
export const AUTH_PANELS = {
  login: {
    eyebrowKey: 'auth.loginPanelEyebrow',
    headlineKey: 'auth.loginPanelHeadline',
    descriptionKey: 'auth.loginPanelDescription',
    pointKeys: ['auth.loginPanelPoint1', 'auth.loginPanelPoint2', 'auth.loginPanelPoint3'],
    image: 'https://picsum.photos/seed/auth-login/1200/1600',
  },
  register: {
    eyebrowKey: 'auth.registerPanelEyebrow',
    headlineKey: 'auth.registerPanelHeadline',
    descriptionKey: 'auth.registerPanelDescription',
    pointKeys: ['auth.registerPanelPoint1', 'auth.registerPanelPoint2', 'auth.registerPanelPoint3'],
    image: 'https://picsum.photos/seed/auth-register/1200/1600',
  },
  forgotPassword: {
    eyebrowKey: 'auth.forgotPanelEyebrow',
    headlineKey: 'auth.forgotPanelHeadline',
    descriptionKey: 'auth.forgotPanelDescription',
    pointKeys: ['auth.forgotPanelPoint1', 'auth.forgotPanelPoint2', 'auth.forgotPanelPoint3'],
    image: 'https://picsum.photos/seed/auth-recover/1200/1600',
  },
};
