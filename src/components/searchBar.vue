<template>
  <input
    type="text"
    placeholder="Поиск по имени..."
    v-model="query"
    @input="search"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(_, { emit }) {
    const query = ref("");

    const search = () => {
      emit("search", query.value);
    };

    return {
      query,
      search,
    };
  },
});
</script>

<style>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
