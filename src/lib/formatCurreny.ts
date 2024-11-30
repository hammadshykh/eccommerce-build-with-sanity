export function formatCurrencyCustom(
 amount: number,
 currency: string = "USD",
 locale: string = "en-US",
 options: Intl.NumberFormatOptions = {}
): string {
 return new Intl.NumberFormat(locale, {
  style: "currency",
  currency,
  ...options,
 }).format(amount);
}

// Example with custom options
console.log(
 formatCurrencyCustom(123456.789, "USD", "en-US", { minimumFractionDigits: 0 })
); // "$123,457"
console.log(formatCurrencyCustom(123456.789, "JPY", "ja-JP")); // "￥123,457"
