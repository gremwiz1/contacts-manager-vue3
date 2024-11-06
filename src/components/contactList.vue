<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @edit="editContact"
        @delete="deleteContact"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactItem from "./contactItem.vue";
import { Contact } from "../types/contact";

export default defineComponent({
  components: {
    ContactItem,
  },
  props: {
    contacts: {
      type: Array as () => Contact[],
      required: true,
    },
  },
  methods: {
    editContact(contact: Contact) {
      this.$emit("edit", contact);
    },
    deleteContact(id: number) {
      this.$emit("delete", id);
    },
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
