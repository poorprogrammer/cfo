import InvoiceService from "@/services/InvoiceService";
import axios from "axios";
import { Factory } from "../factory";
import { describe, beforeEach, it, vi, expect, afterEach } from "vitest";
describe("invoices API", () => {
  let invoiceService;

  beforeEach(() => {
    invoiceService = new InvoiceService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call with correct url", () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: [] });

    invoiceService.getAll(2020);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/invoices/2020"
    );
  });

  it("should parse response into Invoice", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: [{ invoiceNumber: "202001-001" }] });
    let invoices = await invoiceService.getAll(2020);
    expect(invoices[0].url()).toEqual("/invoice/202001-001");
  });

  it("should parse response into Invoice", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: { invoiceNumber: "202001-001" } });
    let invoice = await invoiceService.get("202001-001");
    expect(invoice.url()).toEqual("/invoice/202001-001");
  });

  describe("save", () => {
    describe("Data Transfer Object", () => {
      it("remove circular dependencies to avoid save fail", async () => {
        let dto = invoiceService.createDTO(Factory.createInvoice());
        expect(dto.items[0].item).toEqual(undefined);
      });
    });
    describe("after call", () => {
      it("should parse response into invoiceNumber", async () => {
        let invoiceNumber = invoiceService.parseNumber({ data: "202001-001" });
        expect(invoiceNumber).toEqual("202001-001");
      });
    });
  });
});
