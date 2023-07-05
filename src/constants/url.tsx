export default {
  isProduction: false,

  get base() {
    const prefix = this.isProduction
      ? 'https://embarrassed-gloves-colt.cyclic.app/'
      : 'http://192.168.0.141:8080';
    return prefix;
  },

  get API() {
    return this.base + '/api';
  },

  get termsAndConditions() {
    return this.base + '/docs/public/terms-of-use';
  },

  get privacyNotice() {
    return this.base + '/docs/public/privacy';
  },
};
