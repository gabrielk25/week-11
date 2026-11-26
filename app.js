(function () {
  "use strict";

  const CART_KEY = "ns_cart_v1";
  const ORDERS_KEY = "ns_orders_v1";
  const CHANNEL_NAME = "nails_studio_realtime_v1";

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function notifyRealtime(type, payload) {
    if (channel) {
      try {
        channel.postMessage({ type: type, payload: payload || {}, ts: Date.now() });
      } catch (_) {}
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function parseHarga(str) {
    return Number(String(str || "").replace(/[^\d]/g, "")) || 0;
  }

  function formatRupiah(amount) {
    return "Rp " + (Number(amount) || 0).toLocaleString("id-ID");
  }

  function formatWaktu(iso) {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  /* Cart Management */
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateTopbarBadge();
    notifyRealtime("CART_UPDATED");
  }

  function getCartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (Number(item.qty) || 0);
    }, 0);
  }

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(function (c) {
      return c.id === product.id;
    });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        nama: product.nama,
        bentuk: product.bentuk,
        satuan: "per set",
        hargaNum: product.hargaNum,
        gambar: product.gambar,
        qty: 1
      });
    }
    saveCart(cart);
  }

  function updateCartQty(id, qty) {
    const cart = getCart();
    const item = cart.find(function (c) {
      return c.id === id;
    });
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, Number(qty) || 1));
    saveCart(cart);
  }

  function removeFromCart(id) {
    const cart = getCart().filter(function (c) {
      return c.id !== id;
    });
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotals(ongkir) {
    const subtotal = getCart().reduce(function (sum, item) {
      return sum + item.hargaNum * item.qty;
    }, 0);
    const fee = Number(ongkir) || 0;
    return {
      subtotal: subtotal,
      ongkir: fee,
      grandTotal: subtotal + fee
    };
  }

  /* Orders Management */
  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    notifyRealtime("ORDERS_UPDATED");
  }

  function getOrderById(id) {
    return getOrders().find(function (o) {
      return o.id === id;
    }) || null;
  }

  function createOrder(customer, shippingCode) {
    const cart = getCart();
    if (cart.length === 0) return null;

    let ongkir = 15000;
    let shippingMethod = "Pengiriman Reguler (2–3 Hari)";
    if (shippingCode === "express") {
      ongkir = 28000;
      shippingMethod = "Pengiriman Express (1 Hari)";
    } else if (shippingCode === "pickup") {
      ongkir = 0;
      shippingMethod = "Ambil di Studio Nails";
    }

    const totals = getCartTotals(ongkir);
    const orderId =
      "NS-" + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 89);

    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: customer,
      shippingMethod: shippingMethod,
      ongkir: totals.ongkir,
      paymentMethod: "QRIS",
      qrisRef: "QRIS-NS-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      items: cart.map(function (it) {
        return {
          id: it.id,
          nama: it.nama,
          bentuk: it.bentuk,
          satuan: it.satuan || "per set",
          hargaNum: it.hargaNum,
          qty: it.qty,
          subtotal: it.hargaNum * it.qty
        };
      }),
      subtotal: totals.subtotal,
      grandTotal: totals.grandTotal,
      status: "PENDING",
      approvalRef: null,
      paidAt: null,
      rejectedAt: null
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCart();
    return order;
  }

  /* UI Helpers */
  function updateTopbarBadge() {
    const badge = document.getElementById("topbar-cart-badge");
    if (badge) badge.textContent = String(getCartCount());
  }

  function renderTopbar(activeKey) {
    const el = document.getElementById("site-topbar");
    if (!el) return;

    el.innerHTML =
      '<nav class="topbar">' +
      '  <div class="topbar-inner">' +
      '    <a href="index.html" class="topbar-brand">Nails Studio <span>Press-On Nails</span></a>' +
      '    <div class="topbar-nav">' +
      '      <a href="index.html" class="nav-link ' + (activeKey === "catalog" ? "active" : "") + '">Katalog</a>' +
      '      <a href="cart.html" class="nav-link ' + (activeKey === "cart" ? "active" : "") + '">Keranjang <span class="cart-badge" id="topbar-cart-badge">' + getCartCount() + '</span></a>' +
      '      <a href="history.html" class="nav-link ' + (activeKey === "history" ? "active" : "") + '">Riwayat</a>' +
      '      <a href="qris-approve.html" target="_blank" class="nav-link sim-link">Simulator QRIS</a>' +
      '    </div>' +
      '  </div>' +
      '</nav>';
  }

  function renderStatusBadge(status) {
    if (status === "PAID") {
      return '<span class="status-badge status-paid">&#10003; Paid</span>';
    }
    if (status === "REJECTED") {
      return '<span class="status-badge status-rejected">&#10005; Ditolak</span>';
    }
    return '<span class="status-badge status-pending"><span class="pulse-dot"></span> Menunggu Bayar</span>';
  }

  function showToast(msg) {
    let toast = document.getElementById("ns-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ns-toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(window.__nsToastTimer);
    window.__nsToastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2400);
  }

  function generateDummyQrisSvg(seedText) {
    const size = 21;
    let hash = 2166136261;
    for (let i = 0; i < seedText.length; i++) {
      hash ^= seedText.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    function isFinder(r, c) {
      const topLeft = r < 7 && c < 7;
      const topRight = r < 7 && c >= size - 7;
      const botLeft = r >= size - 7 && c < 7;
      if (!topLeft && !topRight && !botLeft) return null;
      const lr = r < 7 ? r : r - (size - 7);
      const lc = c < 7 ? c : c - (size - 7);
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
      if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
      return false;
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const finder = isFinder(r, c);
        let filled = false;
        if (finder !== null) {
          filled = finder;
        } else {
          hash ^= r * 31 + c * 17;
          hash = Math.imul(hash, 16777619);
          filled = (hash >>> 0) % 2 === 0;
        }
        if (filled) {
          rects += '<rect x="' + (c * 10) + '" y="' + (r * 10) + '" width="10" height="10" fill="#2d2325" />';
        }
      }
    }

    return '<svg viewBox="0 0 ' + (size * 10) + ' ' + (size * 10) + '" width="200" height="200" style="display:block; margin:0 auto;" aria-label="Kode QRIS">' + rects + '</svg>';
  }

  function onRealtimeUpdate(cb) {
    window.addEventListener("storage", function (e) {
      if (e.key === ORDERS_KEY || e.key === CART_KEY) {
        updateTopbarBadge();
        cb(e);
      }
    });
    if (channel) {
      channel.addEventListener("message", function (e) {
        updateTopbarBadge();
        cb(e);
      });
    }
  }

  window.NSStore = {
    escapeHtml: escapeHtml,
    parseHarga: parseHarga,
    formatRupiah: formatRupiah,
    formatWaktu: formatWaktu,
    getCart: getCart,
    getCartCount: getCartCount,
    addToCart: addToCart,
    updateCartQty: updateCartQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getCartTotals: getCartTotals,
    getOrders: getOrders,
    getOrderById: getOrderById,
    createOrder: createOrder,
    renderTopbar: renderTopbar,
    renderStatusBadge: renderStatusBadge,
    showToast: showToast,
    generateDummyQrisSvg: generateDummyQrisSvg,
    onRealtimeUpdate: onRealtimeUpdate
  };
})();
