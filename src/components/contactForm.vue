<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ contact?.id ? "Редактировать контакт" : "Добавить контакт" }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="name" type="text" placeholder="Имя" required />
        <input v-model="phone" type="tel" placeholder="Телефон" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <button type="submit">Сохранить</button>
        <button type="button" @click="close">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Contact } from "../types/contact";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  props: {
    contact: {
      type: Object as () => Contact | null,
      default: null,
    },
  },
  setup(props, { emit }) {
    const name = ref("");
    const phone = ref("");
    const email = ref("");

    // Используйте watch для обновления полей при изменении props.contact
    watch(
      () => props.contact,
      (newContact) => {
        if (newContact) {
          name.value = newContact.name;
          phone.value = newContact.phone;
          email.value = newContact.email;
        } else {
          // Сброс значений, если contact равен null
          name.value = "";
          phone.value = "";
          email.value = "";
        }
      },
      { immediate: true } // Выполнить немедленно, чтобы заполнить форму при открытии
    );

    const submitForm = () => {
      const contactData: Contact = {
        id: props.contact?.id || uuidv4(),
        name: name.value,
        phone: phone.value,
        email: email.value,
      };
      emit("save", contactData);
    };

    const close = () => {
      emit("close");
    };

    return {
      name,
      phone,
      email,
      submitForm,
      close,
    };
  },
});
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
