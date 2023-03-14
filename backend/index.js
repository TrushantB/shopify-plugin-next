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
          "_ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=/?_ab=0&_fd=0&_sc=1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1; cart=c465e57728cbe4931b8dc23e40983988; cart_ts=1678715859; cart_ver=gcp-us-east1:153; preview_theme=1; _secure_session_id=0a3fe3a0d736b99c024a7c828e6feb6d; _s=50d3a425-ee09-40f6-8485-0f6f03daee1f; _shopify_s=50d3a425-ee09-40f6-8485-0f6f03daee1f; _shopify_sa_p=; cart_sig=f782500a0e1cd2a53489dfd97faab88f; _shopify_sa_t=2023-03-14T09:39:46.246Z; keep_alive=cd5c3426-8f31-41f0-8571-74be99213df0",
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
      Cookie:
        "_ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=/?_ab=0&_fd=0&_sc=1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1; _orig_referrer=; _landing_page=/cart; _y=ffe8ef8a-a95e-4ad9-a92d-36abee3c885e; _s=86d867f0-316b-4df8-a6c1-0fd6d9ea7f67; _shopify_y=ffe8ef8a-a95e-4ad9-a92d-36abee3c885e; _shopify_s=86d867f0-316b-4df8-a6c1-0fd6d9ea7f67; _shopify_sa_p=; _secure_session_id=235a44ec7babfe1ee030c5a5cf4d53d4; identity-state=BAhbAA==--db43e3715865ca03e3123219ec91e34189be9380; customer_auth_session_created_at=2023-03-13+12:40:15+UTC; customer_auth_provider=customer_identity; secure_customer_sig=3a154268850dc591dadf7170d5fb7397; cart=baae9c0e3e0ace42eb496f1953cbf8fc; cart_ts=1678711226; cart_sig=c2383a5d6d1e30547eb11eae3de7c627; cart_ver=gcp-us-east1:2; _shopify_sa_t=2023-03-13T12:40:28.895Z; keep_alive=95455546-c669-499b-9783-e3dcc1401afa",
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
