function invoiceCreatedMessage(i) {
  return `I${i.invoiceNumber}| ${targetCompanyName(i)}| ${toCurrency(total(i), i.currency)}`;
}

function quotationCreatedMessage (i) {
  return `Q${i.quotationNumber}| ${targetCompanyName(i)}| ${toCurrency(total(i), i.currency)}`;
}

function receiptCreatedMessage (i) {
  return `R${i.receiptNumber}| ${targetCompanyName(i)}| ${toCurrency(total(i), i.currency)}`;
}

function targetCompanyName(i) {
  return i.targetCompany? i.targetCompany.name: "";
}

function total(inv) {
  if(!inv.items) return 0
  let itemPrices = inv.items.map((i) => i.amount * i.price)
  return itemPrices.reduce((a, b) => a + b, 0)
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
  receiptCreatedMessage,
};
