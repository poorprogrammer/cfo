import axios from "axios";
import Invoice from "@/models/Invoice";

export default class {
  constructor() {
    this.root = process.env.VUE_APP_BASE_API;
  }

  allUrl(year) {
    return `${this.collectionUrl()}${year}`;
  }

  collectionUrl() {
    return `${this.root}/invoices/`;
  }

  itemUrl(invoiceNumber) {
    return `${this.root}/invoice/${invoiceNumber}`;
  }

  getAll(year) {
    return axios.get(this.allUrl(year)).then(this.parseAll);
  }

  get(invoiceNumber) {
    return axios.get(this.itemUrl(invoiceNumber)).then(this.parseItem);
  }

  save(invoice) {
    return axios
      .post(this.collectionUrl(), this.createDTO(invoice))
      .then(this.parseNumber);
  }

  delete(invoice) {
    invoice.markAsDeleted();
    return this.update(invoice);
  }

  update(invoice) {
    let url = this.itemUrl(invoice.number);
    return axios.put(url, this.createDTO(invoice)).then(this.parseItem);
  }

  parseAll = (response) => {
    let invoices = [];
    response.data.forEach((invoice) => {
      invoices.push(this.createItem(invoice));
    });
    return invoices;
  };

  parseItem = (response) => {
    return this.createItem(response.data);
  };

  parseNumber = (response) => {
    return response.data;
  };

  createItem = (item) => {
    return new Invoice(item);
  };

  createDTO = (invoice) => {
    let dto = {};
    Object.assign(dto, invoice);
    if (!dto.items) return dto;
    dto.items.forEach((item) => {
      delete item.item;
    });
    return dto;
  };
}
