const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 8080;
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

app.get("/", async (request, res) => {
  res.send("Welcome to root URL of Server");

  await fetch("https://ekartbook.myshopify.com/cart/add.json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: 44643284582692,
          properties: {
            No_of_pages: 100,
            binding_type: "spiral",
            lines: 1,
            cover_type: "soft",
          },
          quantity: 1,
          variant_id: 44643284582692,
        },
      ],
    }),
  });

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
