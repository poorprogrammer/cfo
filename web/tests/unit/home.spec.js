import { shallowMount } from '@vue/test-utils'
import InvoiceList from '@/components/InvoiceList.vue'

describe('InvoiceList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(InvoiceList, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
