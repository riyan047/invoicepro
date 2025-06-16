interface iAppProps {
  amount: number;
  currency: "USD" | "EUR" | "INR";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}
