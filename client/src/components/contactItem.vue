<template>
  <li @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <span class="contact-info" :title="contact.name">{{ contact.name }}</span>
    <span class="contact-info" :title="contact.phone">{{ contact.phone }}</span>
    <span class="contact-info" :title="contact.email">{{ contact.email }}</span>
    <button @click="edit">Редактировать</button>
    <button @click="remove">Удалить</button>
    <div v-if="showTooltip" class="tooltip">
      <div>{{ contact.name }}</div>
      <div>{{ contact.phone }}</div>
      <div>{{ contact.email }}</div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Contact } from "../types/contact";

export default defineComponent({
  props: {
    contact: {
      type: Object as () => Contact,
      required: true,
    },
  },
  setup() {
    const showTooltip = ref(false);
    return { showTooltip };
  },
  methods: {
    edit() {
      this.$emit("edit", this.contact);
    },
    remove() {
      this.$emit("delete", this.contact.id);
    },
  },
});
</script>

<style>
li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
  position: relative;
  align-items: center;
}

li:hover {
  background-color: #f0f0f0;
}

.contact-info {
  flex: 1;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 5px;
}

button {
  margin-left: 5px;
}

.tooltip {
  position: absolute;
  left: 0;
  top: 100%; /* Показываем ниже элемента */
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
}
</style>
