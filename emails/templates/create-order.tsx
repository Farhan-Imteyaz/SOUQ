export type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
};

export type CreateOrderEmailProps = {
  name: string;
  orderId: string;
  items: OrderEmailItem[];
  currency: string;
};

export default function CreateOrderEmail({
  name,
  orderId,
  items,
  currency,
}: CreateOrderEmailProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f6f6f6",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
        }}
      >
        {/* Header */}
        <h2 style={{ margin: 0, color: "#111" }}>Order Confirmed 🎉</h2>

        <p style={{ marginTop: 12 }}>
          Hi <strong>{name}</strong>,
        </p>

        <p>
          Thanks for placing your order with <strong>Souqza</strong>. We’ve
          received your request and will process it shortly.
        </p>

        {/* Order ID */}
        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            background: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          <strong>Order ID:</strong> {orderId}
        </div>

        {/* Items Table */}
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{
            marginTop: 24,
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              <th
                align="left"
                style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}
              >
                Item
              </th>
              <th
                align="center"
                style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}
              >
                Qty
              </th>
              <th
                align="right"
                style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}
              >
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "12px 0" }}>{item.name}</td>
                <td align="center">{item.quantity}</td>
                <td align="right">
                  {currency}
                  {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div
          style={{
            marginTop: 16,
            textAlign: "right",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Total: {currency}
          {total.toFixed(2)}
        </div>

        {/* Footer */}
        <p style={{ marginTop: 32, fontSize: "14px", color: "#555" }}>
          You can track your order anytime from your dashboard.
        </p>

        <p style={{ marginTop: 24 }}>
          — <strong>Team Souqza</strong>
        </p>
      </div>
    </div>
  );
}
