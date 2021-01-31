function invoiceCreatedMessage(i) {
  return `${i.invoiceNumber}, ${i.targetCompany.name}, ${i.amount}`;
}

module.exports = invoiceCreatedMessage;
