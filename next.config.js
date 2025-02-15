const withNextIntl = require("next-intl/plugin")("./lib/lang/i18n.ts");

module.exports = withNextIntl({
  reactStrictMode: false,
});