interface iAppProps {
  amount: number;
  currency: "USD" | "EUR" | "INR";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  if (currency === "INR") {
    return `INR ${amount.toFixed(2)}`; // ✅ Avoid ₹ symbol
  }

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

