const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = 8080;
const add_to_cart_data = {
  product: {
    title: "A2",
    vendor: "Burton",
    product_type: "Snowboard",
    status: "active",
  },
};

app.post("/", async (req, res) => {
  // res.send("welcome to web");
  console.log("body is here", req.body);
  res.send({ "Test ": "Ok" });
  const response = await fetch(
    "https://ekartbook.myshopify.com/admin/api/2023-01/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "_shopify_y=a8cd7c12-cf1d-4017-b630-a35366b87981; _y=a8cd7c12-cf1d-4017-b630-a35366b87981; secure_customer_sig=",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify(req.body),
    }
  );
  const addedData = await response.json();
  console.log(addedData.product.variants[0].id);
  console.log(addedData.product.variant_id);
  // app.get("/", async (request, res) => {
  //   await fetch(
  //     "https://ekartbook.myshopify.com/admin/api/2023-01/products.json",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Cookie:
  //           "_shopify_y=a8cd7c12-cf1d-4017-b630-a35366b87981; _y=a8cd7c12-cf1d-4017-b630-a35366b87981; secure_customer_sig=",
  //         "X-Shopify-Access-Token": "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",
  //       },
  //       body: JSON.stringify(add_to_cart_data),
  //     }
  //   );
  // console.log("======><<<", add_to_cart_data.product.variants.id);
  await fetch("https://ekartbook.myshopify.com/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "_ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=/?_ab=0&_fd=0&_sc=1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1;_s=69fe8cf0-2437-4207-9b70-20f4c4a95906; _shopify_s=69fe8cf0-2437-4207-9b70-20f4c4a95906; _shopify_sa_p=; cart=c465e57728cbe4931b8dc23e40983988; cart_ts=1678531247; cart_sig=4b654c005784c8fede54fce5457f08d9; cart_ver=gcp-us-east1:1; _shopify_sa_t=2023-03-11T10:47:26.522Z; keep_alive=1feac86f-4e45-4ab8-a6e8-0b810c194a46identity-state%3DBAhbAA%253D%253D--db43e3715865ca03e3123219ec91e34189be9380%3B%20_ab%3D1%3B%20__ssid%3D9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99%3B%20secure_customer_sig%3D%3B%20localization%3DIN%3B%20_orig_referrer%3D%3B%20_landing_page%3D%252F%253F_ab%253D0%2526_fd%253D0%2526_sc%253D1%3B%20_y%3D2c66f8db-3806-4014-ae91-84b77ba09a27%3B%20_shopify_y%3D2c66f8db-3806-4014-ae91-84b77ba09a27%3B%20cart%3D73054294073339d565aa1769c4fdfa5c%3B%20_abv%3D0%3B%20storefront_digest%3D34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1%3B%20cart_ts%3D1678453915%3B%20cart_sig%3Dcfc197930dace485078f58a500ee769c%3B%20cart_ver%3Dgcp-us-east1%253A3%3B%20ProductInventory--selected-location%3D%255B%257B%2522name%2522%253A%2522pune%2522%252C%2522id%2522%253A%2522gid%253A%252F%252Fshopify%252FLocation%252F78958952740%2522%257D%255D%3B%20_s%3D28165b10-5328-4790-a0f9-b8793593be59%3B%20_shopify_s%3D28165b10-5328-4790-a0f9-b8793593be59%3B%20_shopify_sa_p%3D%3B%20Order--selected-location%3D%255B%257B%2522id%2522%253A%2522MULTILOCATION_ALL_LOCATIONS_KEY%2522%252C%2522name%2522%253A%2522All%2520locations%2522%252C%2522fulfillmentServiceType%2522%253Anull%257D%255D%3B%20_shopify_sa_t%3D2023-03-10T18%253A21%253A14.974Z%3B%20keep_alive%3Ddc602bd6-6ab0-4358-840a-fa1dc5086785",
      "X-Shopify-Access-Token": "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",
    },
    body: JSON.stringify({
      id: addedData.product.variants[0].id,
      quantity: 10,
    }),
  }).then((res) =>
    res.json().then((result) => console.log("Result is here", result))
  );
  //   const result = await fetch("https://ekartbook.myshopify.com/cart/add.json", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: "44805664342308",
  //       quantity: 1,
  //     }),
  //   });
  //   await fetch("https://ekartbook.myshopify.com/cart.json", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie:
  //         "_cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _s=1ffb9963-b7af-4c44-8f39-f97a6e1084cc; _shopify_s=1ffb9963-b7af-4c44-8f39-f97a6e1084cc; _shopify_y=a8cd7c12-cf1d-4017-b630-a35366b87981; _y=a8cd7c12-cf1d-4017-b630-a35366b87981; cart=bfb0b3947f50a724db51c5ac4838e17c; cart_currency=INR; cart_sig=f2c451151e2818f2db8d3adb6e62b60a; cart_ts=1678175473; cart_ver=gcp-us-east1%3A1; secure_customer_sig=",
  //     },
  //     body: JSON.stringify(add_to_cart_data),
  //   }).catch((error) => {
  //     console.log("post error", error);
  //   });
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
