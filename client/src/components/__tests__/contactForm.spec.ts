import { mount } from "@vue/test-utils";
import ContactForm from "../contactForm.vue";
import { Contact } from "../../types/contact";

describe("ContactForm.vue", () => {
  it("корректно рендерит поля формы", () => {
    const wrapper = mount(ContactForm);
    expect(wrapper.find('input[placeholder="Имя"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Телефон"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Email"]').exists()).toBe(true);
  });

  it("эмитирует событие save с корректным полезным нагрузкой", async () => {
    const wrapper = mount(ContactForm);
    await wrapper.find('input[placeholder="Имя"]').setValue("Иван Иванов");
    await wrapper.find('input[placeholder="Телефон"]').setValue("123-456-7890");
    await wrapper
      .find('input[placeholder="Email"]')
      .setValue("ivan@example.com");
    await wrapper.find("form").trigger("submit.prevent");

    const emitted = wrapper.emitted("save");
    expect(emitted).toBeTruthy(); // Проверка, что событие было эмитировано

    if (emitted && emitted.length > 0) {
      const emittedData = emitted[0][0] as Contact;

      expect(typeof emittedData.id).toBe("string");
      expect(emittedData.id).toBe("");
      expect(emittedData.name).toBe("Иван Иванов");
      expect(emittedData.phone).toBe("123-456-7890");
      expect(emittedData.email).toBe("ivan@example.com");
    } else {
      fail("Событие 'save' не было эмитировано.");
    }
  });
});
