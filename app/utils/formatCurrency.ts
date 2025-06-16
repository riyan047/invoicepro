interface iAppProps {
  amount: number;
  currency: "USD" | "EUR" | "INR";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
