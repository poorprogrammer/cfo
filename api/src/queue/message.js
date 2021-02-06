function invoiceCreatedMessage(i) {
  return `${i.invoiceNumber}, ${i.targetCompany.name}, ${total(i)}`;
}

function total(inv) {
  if(!inv.items) return 0
  let itemPrices = inv.items.map((i) => i.amount * i.price)
  return itemPrices.reduce((a, b) => a + b)
}

module.exports = invoiceCreatedMessage;
