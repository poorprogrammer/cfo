function invoiceCreatedMessage(i) {
  return `I${i.invoiceNumber}| ${i.targetCompany.name}| ${toCurrency(total(i), i.currency)}`;
}

function quotationCreatedMessage (i) {
  return `Q${i.quotationNumber}| ${i.targetCompany.name}| ${toCurrency(total(i), i.currency)}`;
}

function total(inv) {
  if(!inv.items) return 0
  let itemPrices = inv.items.map((i) => i.amount * i.price)
  return itemPrices.reduce((a, b) => a + b)
}

function toCurrency(amount, currency='THB') {
  currencies = {
    "THB": new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', currencyDisplay: 'code' }),
    "USD": new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }),
  }
  return currencies[currency].format(amount)

}

module.exports = {
  invoiceCreatedMessage,
  quotationCreatedMessage,
};
