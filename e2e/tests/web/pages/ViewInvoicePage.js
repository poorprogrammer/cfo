exports.ViewInvoicePage = class ViewInvoicePage {

  constructor(page) {
    this.page = page;
  }

  static async create(page) {
    let viewInvoicePage = new ViewInvoicePage(page);
    await viewInvoicePage.ready();
    return viewInvoicePage;
  }

  async ready() {
    await this.page.waitForSelector("text=Invoice (original)");
  }
}
