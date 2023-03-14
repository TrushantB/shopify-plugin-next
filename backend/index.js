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
          "localization=IN; _orig_referrer=; _landing_page=/cart; _y=ffe8ef8a-a95e-4ad9-a92d-36abee3c885e; _shopify_y=ffe8ef8a-a95e-4ad9-a92d-36abee3c885e; _secure_session_id=20ad62ccbe3c62684a33e73321eab382; customer_auth_session_created_at=2023-03-13+13:25:40+UTC; customer_auth_provider=customer_identity;identity-state-e21096938c817d272f77cf773fdcb547=BAh7DEkiDnJldHVybi10bwY6BkVUSSI/L2NoZWNrb3V0cy9jL2JhYWU5YzBlM2UwYWNlNDJlYjQ5NmYxOTUzY2JmOGZjP2xvY2FsZT1lbi1JTgY7AFRJIhFyZWRpcmVjdC11cmkGOwBUSSI/aHR0cHM6Ly9la2FydGJvb2subXlzaG9waWZ5LmNvbS9jdXN0b21lcl9pZGVudGl0eS9jYWxsYmFjawY7AFRJIhBzZXNzaW9uLWtleQY7AFQ6DWN1c3RvbWVySSIPY3JlYXRlZC1hdAY7AFRmFzE2Nzg3MTgzNzMuMTA4NTY5NkkiCm5vbmNlBjsAVEkiJWJiYzZhYTVhNDI1NzM2ZmY1NmMxYzc4YWEwNDY5NGIzBjsARkkiCnNjb3BlBjsAVFsHSSILb3BlbmlkBjsAVEkiCmVtYWlsBjsAVEkiD2NvbmZpZy1rZXkGOwBUSSINY3VzdG9tZXIGOwBU--8fcb81fcf85c32de941f831623d7ff31b86fa5d3; identity-state=BAhbBkkiJWUyMTA5NjkzOGM4MTdkMjcyZjc3Y2Y3NzNmZGNiNTQ3BjoGRUY=--cf61fcffe89b60f604ef1679b740c18202b220f3; secure_customer_sig=515efb1e4e4e4e5c67b5655c53be8947; cart=c00485a3ea89a37df8e951cc002901a1; cart_ts=1678769651; cart_sig=24cc025ff4245f947c691e9c8e4a0c1b; cart_ver=gcp-us-east1:2; _s=b465f7af-6c04-4e62-86d7-95190fb4e485; _shopify_s=b465f7af-6c04-4e62-86d7-95190fb4e485; _shopify_sa_p=; _shopify_sa_t=2023-03-14T09:35:33.826Z; keep_alive=3e796084-86ea-4b00-9795-7a3f3d661ca0",
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
