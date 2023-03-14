const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = 8080;
app.post("/", async (req, res) => {
  console.log("body is here", req.body);
  const response = await fetch(
    "https://ekartbook.myshopify.com/admin/api/2023-01/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "_s=c7aac837-18ca-4be8-a3d3-4346e92c7fc7; _shopify_s=c7aac837-18ca-4be8-a3d3-4346e92c7fc7; _shopify_y=53f69282-fd10-4c17-b1a4-e1f6e43a23f3; _y=53f69282-fd10-4c17-b1a4-e1f6e43a23f3; cart=c465e57728cbe4931b8dc23e40983988; cart_currency=INR; cart_sig=c7ed7f39eb28023fef015f2c1505d8a8; cart_ts=1678787103; cart_ver=gcp-us-east1%3A159; secure_customer_sig=",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify(req.body),
    }
  );
  const addedData = await response.json();
  await fetch("https://ekartbook.myshopify.com/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: "cart=c465e57728cbe4931b8dc23e40983988",
      "X-Shopify-Access-Token": "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",
    },
    body: JSON.stringify({
      id: addedData.product.variants[0].id,
      quantity: req.body.product.quantity,
    }),
  }).then((res) =>
    res.json().then((result) => {
      console.log("Result is here", result);
    })
  );
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
