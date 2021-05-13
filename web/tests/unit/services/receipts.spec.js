import API from '@/services/receipts'
import { Factory } from '../factory';

describe('receipts API', () => {
  let api;

  beforeEach(() => { api = new API() })

  describe('save', () => {
    describe('Data Transfer Object', () => {
      it('remove circular dependencies to avoid save fail', async () => {
        let dto = api.createDTO(Factory.createReceipt())
        expect(dto._wht.item).toEqual(undefined)
      })
    })
  })
});