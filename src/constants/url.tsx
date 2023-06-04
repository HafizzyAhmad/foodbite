export default {
  isProduction: false,

  get base() {
    const prefix = this.isProduction
      ? 'robin.foodbite.com.my'
      : 'http://192.168.0.173:8080';
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
