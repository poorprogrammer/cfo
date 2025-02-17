import API from "@/services/InvoiceService";
import axios from "axios";
import { Factory } from "../factory";
describe("invoices API", () => {
  let api;

  beforeEach(() => {
    api = new API();
  });

  describe("getAll", () => {
    describe("before call", () => {
      it("should call with correct url", () => {
        jest.spyOn(axios, "get");

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
        jest.spyOn(axios, "get").mockResolvedValue(response);
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
        jest.spyOn(axios, "get").mockResolvedValue(response);
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
        let dto = api.createDTO(Factory.createInvoice());
        expect(dto.items[0].item).toEqual(undefined);
      });
    });
    describe("after call", () => {
      it("should parse response into invoiceNumber", async () => {
        let invoiceNumber = api.parseNumber({ data: "202001-001" });
        expect(invoiceNumber).toEqual("202001-001");
      });
    });
  });
});
