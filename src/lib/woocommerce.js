import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({

  url: process.env.WC_URL,

  consumerKey:
    process.env.WC_CONSUMER_KEY,

  consumerSecret:
    process.env.WC_CONSUMER_SECRET,

  version: "wc/v3",

  timeout: 15000,

});

export default api;