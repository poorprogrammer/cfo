function invoiceCreatedMessage(i) {
  return `${i.invoiceNumber}, ${i.targetCompany.name}, ${total(i)}`;
}

function total(inv) {
  let itemPrices = inv.items.map((i) => i.amount * i.price)
  return itemPrices.reduce((a, b) => a + b)
}

module.exports = invoiceCreatedMessage;
