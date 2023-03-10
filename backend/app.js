const express = require("express");

const app = express();
const PORT = 8000;
app.get("/", async (request, res) => {
  res.send("Welcome to root URL of Server");
  const add_to_cart_data = {
    product: {
      id: 8195593535780,
      title: "Scrum product",
      body_html: "<strong>Good snowboard!</strong>",
      vendor: "Burton",
      product_type: "Snowboard",
      created_at: "2023-03-10T19:13:54+05:30",
      handle: "scrum-product",
      updated_at: "2023-03-10T19:13:54+05:30",
      published_at: "2023-03-10T19:13:54+05:30",
      template_suffix: null,
      status: "active",
      published_scope: "web",
      tags: "",
      admin_graphql_api_id: "gid://shopify/Product/8195593535780",
      variants: [
        {
          id: 44805664342308,
          product_id: 8195593535780,
          title: "Default Title",
          price: "0.00",
          sku: "",
          position: 1,
          inventory_policy: "deny",
          compare_at_price: null,
          fulfillment_service: "manual",
          inventory_management: null,
          option1: "Default Title",
          option2: null,
          option3: null,
          created_at: "2023-03-10T19:13:54+05:30",
          updated_at: "2023-03-10T19:13:54+05:30",
          taxable: true,
          barcode: null,
          grams: 0,
          image_id: null,
          weight: 0.0,
          weight_unit: "kg",
          inventory_item_id: 46854688702756,
          inventory_quantity: 0,
          old_inventory_quantity: 0,
          requires_shipping: true,
          admin_graphql_api_id: "gid://shopify/ProductVariant/44805664342308",
        },
      ],
      options: [
        {
          id: 10400045662500,
          product_id: 8195593535780,
          name: "Title",
          position: 1,
          values: ["Default Title"],
        },
      ],
      images: [],
      image: null,
    },
  };
  await fetch("https://ekartbook.myshopify.com/cart.json", {
    header: {
      Cookie:
        "identity-state=BAhbAA%3D%3D--db43e3715865ca03e3123219ec91e34189be9380; _ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=%2F%3F_ab%3D0%26_fd%3D0%26_sc%3D1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; cart=73054294073339d565aa1769c4fdfa5c; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1; cart_ts=1678453915; cart_sig=cfc197930dace485078f58a500ee769c; cart_ver=gcp-us-east1%3A3; ProductInventory--selected-location=%5B%7B%22name%22%3A%22pune%22%2C%22id%22%3A%22gid%3A%2F%2Fshopify%2FLocation%2F78958952740%22%7D%5D; _s=28165b10-5328-4790-a0f9-b8793593be59; _shopify_s=28165b10-5328-4790-a0f9-b8793593be59; _shopify_sa_p=; Order--selected-location=%5B%7B%22id%22%3A%22MULTILOCATION_ALL_LOCATIONS_KEY%22%2C%22name%22%3A%22All%20locations%22%2C%22fulfillmentServiceType%22%3Anull%7D%5D; _shopify_sa_t=2023-03-10T18%3A21%3A14.974Z; keep_alive=dc602bd6-6ab0-4358-840a-fa1dc5086785",
      "X-Shopify-Access-Token": "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",
    },
  }).then((res) => res.json().then((data) => console.log(data)));
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
