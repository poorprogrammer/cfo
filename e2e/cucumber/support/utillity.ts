export function formatRate(rate: string): string {
  return parseFloat(rate).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
