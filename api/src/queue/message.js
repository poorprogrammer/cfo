function invoiceCreatedMessage(i) {
  return `${i.invoiceNumber}, ${i.targetCompany.name}`;
}

module.exports = invoiceCreatedMessage;
