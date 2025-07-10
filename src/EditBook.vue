<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String },
  title: { type: String },
  author: { type: String },
  saveEdit: { type: Function },
  cancelEdit: { type: Function },
});

const editingId = ref(props.id);
const editingTitle = ref(props.title);
const editingAuthor = ref(props.author);
</script>

<template>
  <div class="space-x-4">
    <input
      v-model="editingTitle"
      class="border rounded px-1 py-0.5"
      aria-label="Edit book title"
    />
    <input
      v-model="editingAuthor"
      class="border rounded px-1 py-0.5"
      aria-label="Edit book author"
    />
    <button
      @click="saveEdit(id)"
      class="text-green-600 font-semibold cursor-pointer hover:underline"
    >
      Save
    </button>
    <button
      @click="cancelEdit"
      class="text-red-600 font-semibold cursor-pointer hover:underline"
    >
      Cancel
    </button>
  </div>
</template>
