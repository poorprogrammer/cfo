import InvoiceListPresenter from "@/presenters/InvoiceList";
import API from "@/services/InvoiceService";
import Invoice from "../../../src/models/Invoice";
import { describe, it, expect, vi } from "vitest";

describe("PaymentInfoList Presenter", () => {
    let invoiceListPresenter = new InvoiceListPresenter(undefined, new API());
    describe("invoices", () => {
        describe("when there no invoices", () => {
            it("should be empty list initally or the screen would not render", () => {
                expect([]).toEqual(invoiceListPresenter.items);
            });
        });
    });

    describe("headers", () => {
        it("should contains correct headers", () => {
            expectHeadersToBeCorrect(invoiceListPresenter.headers);
        });

        it("should keep amount out of invoice list page for privacy", () => {
            invoiceListPresenter.headers.forEach((header) => {
                expect(Object.values(header)).not.toContain("amount");
            });
        });

        let expectHeadersToBeCorrect = (headers) => {
            expect("Number").toEqual(headers[0].text);
            expect("Company").toEqual(headers[1].text);
            expect("Project").toEqual(headers[2].text);
            expect("Date").toEqual(headers[3].text);
        };

        it("should get invoices from API when init", () => {
            vi.spyOn(invoiceListPresenter.API, "getAll");
            invoiceListPresenter.init(2021);
            expect(invoiceListPresenter.API.getAll).toHaveBeenCalledWith(2021);
        });

        it("should sort by decending invoice number", () => {
            expect(invoiceListPresenter.sortBy()).toEqual("number");
            expect(invoiceListPresenter.sortDesc()).toEqual(true);
        });

        it("should remove deleted invoice after API complete", () => {
            invoiceListPresenter.items = [
                new Invoice({
                    invoiceNumber: "202101-003",
                    deleted: false,
                }),
                new Invoice({
                    invoiceNumber: "202101-004",
                    deleted: false,
                }),
                new Invoice({
                    invoiceNumber: "202101-005",
                    deleted: false,
                }),
            ];
            let deletedInvoice = new Invoice({
                invoiceNumber: "202101-004",
                deleted: true,
            });
            invoiceListPresenter.removeItemFromList(deletedInvoice);
            expect(invoiceListPresenter.items.length).toEqual(2);
            expect(invoiceListPresenter.items[0].invoiceNumber).toEqual("202101-003");
            expect(invoiceListPresenter.items[1].invoiceNumber).toEqual("202101-005");
        });
    });
});
