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
      timeStyle: "medium"
    });
  }

  function appendLog(text) {
    if (!logEl) return;
    const line = document.createElement("div");
    line.textContent = `[${new Date().toLocaleTimeString("id-ID")}] ${text}`;
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

  function setStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    saveOrders(orders);

    if (channel) {
      channel.postMessage({
        type: "QRIS_STATUS_UPDATED",
        orderId: order.id,
        status: status
      });
    }

    appendLog(`Invoice ${order.id} (${order.customer.nama}) -> ${status}`);
    render();
  }

  function render() {
    const orders = getOrders();
    if (!orders.length) {
      root.innerHTML = `
        <div class="panel" style="text-align:center;padding:30px;">
          <p style="color:var(--text-muted);margin-bottom:14px;">Belum ada invoice QRIS yang masuk.</p>
          <a href="index.html" class="btn btn-primary">Kembali ke Katalog</a>
        </div>`;
      return;
    }

    const sorted = [...orders].sort((a, b) => {
      if (a.id === focusOrderId) return -1;
      if (b.id === focusOrderId) return 1;
      return 0;
    });

    root.innerHTML = sorted.map((order) => {
      const isFocus = order.id === focusOrderId;
      let pillClass = "status-pending";
      let pillLabel = "&bull; MENUNGGU BAYAR";
      if (order.status === "PAID") {
        pillClass = "status-paid";
        pillLabel = "&bull; PAID";
      } else if (order.status === "REJECTED") {
        pillClass = "status-rejected";
        pillLabel = "&bull; DITOLAK";
      }

      return `
        <div class="panel" style="margin-bottom:14px;${isFocus ? "border:2px solid var(--primary);" : ""}">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <div>
              <strong>${escapeHtml(order.id)}</strong>
              ${isFocus ? `<span style="font-size:0.72rem;background:var(--primary-light);color:var(--primary);padding:2px 8px;border-radius:6px;margin-left:6px;font-weight:700;">TARGET AKTIF</span>` : ""}
              <div style="font-size:0.8rem;color:var(--text-muted);">${formatTime(order.createdAt)}</div>
            </div>
            <span class="status-pill ${pillClass}">${pillLabel}</span>
          </div>

          <div style="font-size:0.9rem;margin-bottom:14px;">
            <div>Penerima: <strong>${escapeHtml(order.customer.nama)}</strong> (${escapeHtml(order.customer.kota || "-")})</div>
            <div>Total Tagihan: <strong style="color:var(--primary);font-size:1.05rem;">${formatRupiah(order.total)}</strong></div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            ${order.status === "PENDING" ? `
              <button class="btn btn-success" data-act="PAID" data-id="${escapeHtml(order.id)}">&#10003; Approve QRIS (PAID)</button>
              <button class="btn btn-danger" data-act="REJECTED" data-id="${escapeHtml(order.id)}">&#10005; Tolak Pembayaran</button>
            ` : `
              <button class="btn btn-outline" data-act="PENDING" data-id="${escapeHtml(order.id)}">Reset ke MENUNGGU BAYAR</button>
            `}
          </div>
        </div>
      `;
    }).join("");

    root.querySelectorAll("button[data-act]").forEach((btn) => {
      btn.addEventListener("click", function () {
        setStatus(this.dataset.id, this.dataset.act);
      });
    });
  }

  if (channel) {
    channel.onmessage = function (ev) {
      if (ev.data && ev.data.type === "ORDER_CREATED") {
        appendLog(`Invoice baru masuk: ${ev.data.orderId}`);
        render();
      }
    };
  }

  window.addEventListener("storage", function (ev) {
    if (ev.key === ORDERS_KEY) render();
  });

  appendLog("Simulator QRIS aktif.");
  render();
})();
