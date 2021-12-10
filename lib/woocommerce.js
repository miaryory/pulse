import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wooClient = new WooCommerceRestApi({
    url: "https://miaryory.com/pulse/",
    consumerKey: process.env.WP_CONSUMER_KEY,
    consumerSecret: process.env.WP_CONSUMER_SECRET,
    version: "wc/v3"
});


export default wooClient;