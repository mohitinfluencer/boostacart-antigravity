// BoostACart Widget Loader v1.0
// This file enables Shopify stores to embed the BoostACart widget via iframe

;(() => {
  // Prevent multiple initializations
  if (window.BoostACart) {
    return
  }

  var BOOSTACART_DOMAIN = "https://boostacart-beta-v1.vercel.app"

  // Create the BoostACart global object
  window.BoostACart = {
    // Current iframe reference
    _iframe: null,
    _overlay: null,

    // Open the widget in a full-screen iframe
    open: function (options) {
      // Prevent opening multiple iframes
      if (this._iframe) {
        console.warn("[BoostACart] Widget is already open")
        return
      }

      // Validate options
      if (!options || !options.shop) {
        console.error("[BoostACart] Missing required parameter: shop")
        return
      }

      var shop = options.shop

      var product = options.product || {}
      var productTitle = product.title || options.product_title || options.productTitle || ""
      var productUrl = product.url || options.product_url || options.productUrl || ""
      var productHandle = product.handle || options.product_handle || options.productHandle || ""
      var productId = product.id || options.product_id || options.productId || ""
      var variantId = product.selected_or_first_available_variant?.id || product.variant_id || options.variant_id || ""

      // Build complete embed URL with all product parameters
      var embedUrl = BOOSTACART_DOMAIN + "/embed/" + encodeURIComponent(shop) + "?"

      if (productTitle) embedUrl += "product_title=" + encodeURIComponent(productTitle) + "&"
      if (productUrl) embedUrl += "product_url=" + encodeURIComponent(productUrl) + "&"
      if (productHandle) embedUrl += "product_handle=" + encodeURIComponent(productHandle) + "&"
      if (productId) embedUrl += "product_id=" + encodeURIComponent(productId) + "&"
      if (variantId) embedUrl += "variant_id=" + encodeURIComponent(variantId) + "&"

      // Remove trailing & if present
      embedUrl = embedUrl.replace(/&$/, "")

      console.log("[BoostACart] Opening widget with product data:", {
        title: productTitle,
        url: productUrl,
        handle: productHandle,
        id: productId,
        variant: variantId,
      })

      // Create overlay backdrop
      var overlay = document.createElement("div")
      overlay.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "background: rgba(0, 0, 0, 0.5);" +
        "z-index: 999999;" +
        "backdrop-filter: blur(4px);"

      // Create iframe
      var iframe = document.createElement("iframe")
      iframe.src = embedUrl
      iframe.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "border: none;" +
        "z-index: 1000000;"
      iframe.allow = "clipboard-write"

      // Store references
      this._iframe = iframe
      this._overlay = overlay

      // Append to body
      document.body.appendChild(overlay)
      document.body.appendChild(iframe)

      // Prevent body scroll
      document.body.style.overflow = "hidden"

      console.log("[BoostACart] Widget opened for shop:", shop)
    },

    // Close the widget iframe
    close: function () {
      if (this._iframe) {
        this._iframe.remove()
        this._iframe = null
      }

      if (this._overlay) {
        this._overlay.remove()
        this._overlay = null
      }

      // Restore body scroll
      document.body.style.overflow = ""

      console.log("[BoostACart] Widget closed")
    },
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== BOOSTACART_DOMAIN) {
      return
    }

    if (event.data && event.data.type === "BOOSTACART_CLOSE") {
      window.BoostACart.close()
    }

    if (event.data && event.data.type === "BOOSTACART_GO_TO_CART") {
      console.log("[BoostACart] Navigating to cart:", event.data.cartUrl || "/cart")

      // Close the widget first
      window.BoostACart.close()

      // Navigate to cart using the relative URL from the message
      var cartUrl = event.data.cartUrl || "/cart"
      window.location.href = cartUrl
    }
  })

  console.log("[BoostACart] Loader initialized")
})()
