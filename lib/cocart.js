import CoCartAPI from "@cocart/cocart-rest-api";

const cocartClient = new CoCartAPI({
    url: "https://miaryory.com/pulse/",
    consumerKey: process.env.WP_CONSUMER_KEY,
    consumerSecret: process.env.WP_CONSUMER_SECRET,
    version: "cocart/v2",
    queryStringAuth: true
});

export default cocartClient;