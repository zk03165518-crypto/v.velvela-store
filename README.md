# V.Velvela Beauty — GitHub Pages store

A responsive, static storefront for V.Velvela featuring your supplied product imagery, add-to-bag cart, product catalogue, checkout form and Cash on Delivery order requests.

## Publish for free on GitHub Pages
1. Create a GitHub account (if needed), then create a **public** repository, e.g. `velvela-store`.
2. Upload all files and the `assets` folder from this project. Keep the folder structure unchanged.
3. In the repository, open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for GitHub to publish your site. Your URL will look like `https://YOUR-USERNAME.github.io/velvela-store/`.

## Email notifications / orders
The checkout uses FormSubmit's AJAX endpoint to send the order details to **velvelabeauty@gmail.com**. On the first real submission, FormSubmit may send an activation/confirmation email to that inbox. Open it and confirm activation before relying on order notifications. Test an order after activation and check spam/junk too.

GitHub Pages is static hosting: it cannot run a private backend or guarantee email delivery by itself. FormSubmit is a third-party service, so its availability and anti-spam rules apply. For a production shop, consider a proper backend/order platform and protect customer information. Do not collect real customer orders until you've tested email delivery end-to-end.

## Add or edit products
Open `products.js`. Add another object inside `window.VELVELA_PRODUCTS`, for example:
```js
{
  id: "new-serum",
  name: "V.Velvela Radiance Serum",
  subtitle: "Daily Glow",
  description: "A concise product description.",
  price: 1999,
  compareAt: 2499,
  image: "assets/new-serum.jpg",
  tag: "New",
  category: "Serums"
}
```
Upload the new image to `assets/` and set `image` to its path. Use a unique `id`. Prices are in Pakistani rupees.

## Important before launch
- Prices are sample starting prices; edit `products.js` to your actual prices.
- Confirm product claims, ingredients, directions, size, delivery fees, return policy and shipping regions before publishing.
- The current form requests COD and emails the order request; it does not automatically dispatch parcels, calculate courier rates or sync inventory.
- Add your final privacy policy, shipping/returns policy, contact number and social links before launch.

## Newly added products
This version adds:
- Radiance Reveal Glutathione Cream (60g)
- Kojic Acid Anti-Pigmentation Cream (60g)
- V.Velvela Herbal Soap

Hover over the two cream product cards on desktop to see their supplied campaign artwork. On touch-screen devices, the main product image remains visible and the quick-add button is shown. All five newly supplied images are included in `assets/`.

**Please edit the sample prices in `products.js` before accepting customer orders.** Confirm the product labels, ingredients, directions and claims against your actual packaging before publishing.
