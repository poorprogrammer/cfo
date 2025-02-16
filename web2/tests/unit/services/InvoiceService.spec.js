import API from "@/services/InvoiceService";
import axios from "axios";
import { Factory } from "../factory";
import PricedLineItem from "@/models/PricedLineItem";

describe("invoices API", () => {
  let api;

  beforeEach(() => {
    api = new API();
  });

  describe("getAll", () => {
    describe("before call", () => {
      it("should call with correct url", () => {
        vi.spyOn(axios, "get").mockResolvedValue({ data: [] });

        api.getAll(2020);

        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(
          "http://localhost:3000/invoices/2020"
        );
      });
    });

    describe("after call", () => {
      beforeEach(() => {
        let response = { data: [{ invoiceNumber: "202001-001" }] };
        vi.spyOn(axios, "get").mockResolvedValue(response);
      });

      it("should parse response into Invoice", async () => {
        let invoices = await api.getAll();
        expect(invoices[0].url()).toEqual("/invoice/202001-001");
      });
    });
  });
  describe("get", () => {
    describe("after call", () => {
      beforeEach(() => {
        let response = { data: { invoiceNumber: "202001-001" } };
        vi.spyOn(axios, "get").mockResolvedValue(response);
      });

      it("should parse response into Invoice", async () => {
        let invoice = await api.get("202001-001");
        expect(invoice.url()).toEqual("/invoice/202001-001");
      });
    });
  });
  describe("save", () => {
    describe("Data Transfer Object", () => {
      it("remove circular dependencies to avoid save fail", async () => {
        let dto = api.createNewInvoiceRequest(Factory.createInvoice());
        expect(dto.items[0].item).toEqual(undefined);
      });
      it("remove id and _id to create new invoice", async () => {
        let dto = api.createNewInvoiceRequest(Factory.createInvoice());
        expect(dto.id).toBeUndefined();
        expect(dto._id).toBeUndefined();
      });
      it("remove unused fields to avoid error when print invoice", async () => {
        let dto = api.createNewInvoiceRequest(Factory.createInvoice());
        expect(dto._currencies).toBeUndefined();
      });
    });
    describe("after call", () => {
      it("should parse response into invoiceNumber", async () => {
        let invoiceNumber = api.parseNumber({ data: "202001-001" });
        expect(invoiceNumber).toEqual("202001-001");
      });
    });
  });
  describe("edit", () => {
    describe("Data Transfer Object", () => {
      it("contains currency", async () => {
        let invoice = Factory.createInvoice();
        let dto = api.createDTO(invoice);
        expect(dto.currency).toEqual(invoice.currency);
      });
      it("contains item price and amount", async () => {
        let invoice = Factory.createInvoice();
        let dto = api.createDTO(invoice);
        expect(dto.items[0] instanceof PricedLineItem).toBeFalsy();
        expect(dto.items[0].price).toEqual(20000);
        expect(dto.items[0].amount).toEqual(20);
      });
      it("remove circular dependencies to avoid save fail", async () => {
        let dto = api.createDTO(Factory.createInvoice());
        expect(dto.items[0].item).toEqual(undefined);
        expect(dto.items[0].invoice).toEqual(undefined);
      });
      it("remove unused fields to avoid error when print invoice", async () => {
        let dto = api.createDTO(Factory.createInvoice());
        expect(dto._currencies).toBeUndefined();
      });
    });
  });
});
