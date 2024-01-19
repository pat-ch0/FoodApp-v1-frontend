import { mount } from '@vue/test-utils';
import BottomSheet from '@/components/BottomSheet.vue';

describe('BottomSheet', () => {
  it('renders when open', () => {
    const wrapper = mount(BottomSheet, {
      props: { isOpen: true }
    });
    expect(wrapper.find('.bottom-sheet').exists()).toBe(true);
  });


    it('renders when closed', () => {
        const wrapper = mount(BottomSheet, {
        props: { isOpen: false }
        });
        expect(wrapper.find('.bottom-sheet').exists()).toBe(false);
    });

    it('renders children', () => {
        const wrapper = mount(BottomSheet, {
        props: { isOpen: true },
        slots: {
            default: '<div class="test-child">Test</div>'
        }
        });
        expect(wrapper.find('.test-child').exists()).toBe(true);
    });
    // it('closes when isOpen changes to false', async () => {
    //     const wrapper = mount(BottomSheet, {
    //     props: { isOpen: true }
    //     });
    //     expect(wrapper.find('.bottom-sheet').exists()).toBe(true);
    //     await wrapper.setProps({ isOpen: false });
    //     expect(wrapper.find('.bottom-sheet').exists()).toBe(false);
    // });

});
