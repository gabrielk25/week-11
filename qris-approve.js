(function () {
  "use strict";

  const ORDERS_KEY = "ns_orders_v1";
  const CHANNEL_NAME = "nails_studio_realtime_v1";

  const root = document.getElementById("sim-root");
  const logEl = document.getElementById("sim-log");
  const params = new URLSearchParams(window.location.search);
  const focusOrderId = params.get("order") || "";

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
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

  function formatRupiah(amount) {
    return "Rp " + (Number(amount) || 0).toLocaleString("id-ID");
  }

  function formatTime(iso) {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function appendLog(message) {
    if (!logEl) return;
    const now = new Date().toLocaleTimeString("id-ID");
    const line = document.createElement("div");
    line.textContent = `[${now}] ${message}`;
    logEl.prepend(line);
  }

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    saveOrders(orders);

    if (channel) {
      channel.postMessage({
        type: "QRIS_STATUS_UPDATED",
        orderId: order.id,
        status: newStatus
      });
    }

    appendLog(`Order #${order.id} (${order.customer.nama}) diubah menjadi ${newStatus}`);
    render();
  }

  function render() {
    const orders = getOrders().filter((o) => o.paymentMethod === "QRIS");

    if (!orders.length) {
      root.innerHTML = `
        <div class="panel" style="text-align:center;padding:30px;">
          <p style="color:var(--text-muted);margin-bottom:14px;">Belum ada transaksi QRIS yang masuk.</p>
          <a href="index.html" class="btn btn-primary">Buat Pesanan dari Katalog</a>
        </div>`;
      return;
    }

    // Urutkan agar order dari parameter ?order=... tampil paling atas
    const sorted = [...orders].sort((a, b) => {
      if (a.id === focusOrderId) return -1;
      if (b.id === focusOrderId) return 1;
      return 0;
    });

    root.innerHTML = sorted.map((order) => {
      const isFocused = order.id === focusOrderId;
      let statusClass = "status-pending";
      if (order.status === "PAID") statusClass = "status-paid";
      if (order.status === "REJECTED") statusClass = "status-rejected";

      return `
        <div class="panel" style="${isFocused ? "border:2px solid var(--primary);" : ""}">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
            <div>
              <strong>Order #${escapeHtml(order.id)}</strong>
              ${isFocused ? `<span style="font-size:0.75rem;background:var(--primary-light);color:var(--primary);padding:2px 8px;border-radius:6px;margin-left:6px;">Target Aktif</span>` : ""}
              <div style="font-size:0.83rem;color:var(--text-muted);">${formatTime(order.createdAt)}</div>
            </div>
            <span class="status-pill ${statusClass}">${escapeHtml(order.status)}</span>
          </div>

          <div style="font-size:0.9rem;margin-bottom:12px;">
            <div>Pembeli: <strong>${escapeHtml(order.customer.nama)}</strong> (${escapeHtml(order.customer.whatsapp)})</div>
            <div>Total Tagihan: <strong style="color:var(--primary);font-size:1.05rem;">${formatRupiah(order.total)}</strong></div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            ${order.status === "PENDING" ? `
              <button class="btn btn-success" data-action="PAID" data-id="${escapeHtml(order.id)}">&#10003; Approve Pembayaran</button>
              <button class="btn btn-danger" data-action="REJECTED" data-id="${escapeHtml(order.id)}">&#10005; Tolak Pembayaran</button>
            ` : `
              <button class="btn btn-outline" data-action="PENDING" data-id="${escapeHtml(order.id)}">Reset ke PENDING</button>
            `}
          </div>
        </div>
      `;
    }).join("");

    root.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateOrderStatus(this.dataset.id, this.dataset.action);
      });
    });
  }

  if (channel) {
    channel.onmessage = function (ev) {
      if (ev.data && ev.data.type === "ORDER_CREATED") {
        appendLog(`Pesanan QRIS baru masuk: #${ev.data.orderId}`);
        render();
      }
    };
  }

  window.addEventListener("storage", function (ev) {
    if (ev.key === ORDERS_KEY) {
      render();
    }
  });

  appendLog("Simulator QRIS siap digunakan.");
  render();
})();
