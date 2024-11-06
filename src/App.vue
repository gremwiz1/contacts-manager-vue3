<template>
  <div id="app">
    <h1>Управление контактами</h1>
    <SearchBar @search="searchContacts" />
    <button @click="openModal">Добавить контакт</button>
    <ContactList
      :contacts="filteredContacts"
      @edit="openModal"
      @delete="deleteContact"
    />
    <ContactForm
      v-if="isModalOpen"
      :contact="currentContact"
      @close="closeModal"
      @save="saveContact"
    />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ContactList from "./components/contactList.vue";
import ContactForm from "./components/contactForm.vue";
import SearchBar from "./components/searchBar.vue";
import { Contact } from "./types/contact";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    ContactList,
    ContactForm,
    SearchBar,
  },
  setup() {
    const contacts = ref<Contact[]>(
      JSON.parse(localStorage.getItem("contacts") || "[]")
    );
    const filteredContacts = ref<Contact[]>(contacts.value);
    const isModalOpen = ref(false);
    const currentContact = ref<Contact | null>(null);

    const openModal = (contact: Contact | null = null) => {
      currentContact.value = contact;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentContact.value = null;
    };

    const saveContact = (contact: Contact) => {
      if (contact.id) {
        const index = contacts.value.findIndex((c) => c.id === contact.id);
        if (index !== -1) {
          contacts.value[index] = { ...contacts.value[index], ...contact };
        }
      } else {
        contact.id = uuidv4();
        contacts.value.push(contact);
      }
      // Обновляем localStorage
      localStorage.setItem("contacts", JSON.stringify(contacts.value));
      filteredContacts.value = [...contacts.value]; // Обновляем отображаемый список
      closeModal(); // Закрываем модальное окно
    };

    const deleteContact = (id: string) => {
      contacts.value = contacts.value.filter((contact) => contact.id !== id);
      localStorage.setItem("contacts", JSON.stringify(contacts.value));
      filteredContacts.value = contacts.value;
    };

    const searchContacts = (query: string) => {
      filteredContacts.value = contacts.value.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    return {
      filteredContacts,
      isModalOpen,
      currentContact,
      openModal,
      closeModal,
      saveContact,
      deleteContact,
      searchContacts,
    };
  },
};
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
button {
  margin: 10px;
}
</style>
