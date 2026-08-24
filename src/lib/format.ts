export function formatPrice(amount: number, currency: string = "EUR") {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(amount);
}
