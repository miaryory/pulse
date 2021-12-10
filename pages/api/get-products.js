const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: "https://miaryory.com/pulse/",
	consumerKey: "ck_5cf4431c368c435e78af69db4420aee290953554",
	consumerSecret: "cs_8187b3569cf2ed1899a0eb7d261c77a7db21f8c4",
	version: "wc/v3"
});


export default async function handler(req, res) {
    api.get("products")
	.then((response) => {
		res.json(response.data);
	})
	.catch((error) => {
		res.json(error.response.data);
	});
}
