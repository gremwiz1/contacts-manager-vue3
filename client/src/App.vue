<template>
  <div id="app">
    <h1>Управление контактами</h1>
    <SearchBar @search="searchContacts" />
    <button @click="openModal(null)">Добавить контакт</button>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import ContactList from "./components/contactList.vue";
import ContactForm from "./components/contactForm.vue";
import SearchBar from "./components/searchBar.vue";
import { Contact } from "./types/contact";
import { API_URL } from "./utils/const";

export default {
  components: {
    ContactList,
    ContactForm,
    SearchBar,
  },
  setup() {
    const contacts = ref<Contact[]>([]);
    const filteredContacts = ref<Contact[]>(contacts.value);
    const isModalOpen = ref(false);
    const currentContact = ref<Contact | null>(null);

    // Метод для получения контактов с API и localStorage
    const fetchContacts = async () => {
      try {
        const response = await axios.get(API_URL);
        contacts.value = response.data;
        filteredContacts.value = contacts.value;
        localStorage.setItem("contacts", JSON.stringify(contacts.value));
      } catch (error) {
        console.error(
          "Ошибка при получении данных с сервера, используем localStorage:",
          error
        );
        const storedContacts = localStorage.getItem("contacts");
        if (storedContacts) {
          contacts.value = JSON.parse(storedContacts);
          filteredContacts.value = contacts.value;
        }
      }
    };

    // Метод для сохранения контакта
    const saveContact = async (contact: Contact) => {
      try {
        if (contact.id) {
          // Обновление существующего контакта
          await axios.put(`${API_URL}/${contact.id}`, contact);
        } else {
          // Добавление нового контакта
          await axios.post(API_URL, contact);
        }
        await fetchContacts(); // Обновляем список контактов после изменения - это актуально если много пользователей у приложения
        closeModal();
      } catch (error) {
        console.error("Ошибка при сохранении контакта:", error);
      }
    };

    // Метод для удаления контакта
    const deleteContact = async (id: string) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchContacts();
      } catch (error) {
        console.error("Ошибка при удалении контакта:", error);
      }
    };

    // Метод для поиска контактов
    const searchContacts = (query: string) => {
      filteredContacts.value = contacts.value.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    // Метод для открытия модального окна
    const openModal = (contact: Contact | null) => {
      currentContact.value = contact;
      isModalOpen.value = true;
    };

    // Метод для закрытия модального окна
    const closeModal = () => {
      isModalOpen.value = false;
      currentContact.value = null;
    };

    onMounted(fetchContacts);

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
