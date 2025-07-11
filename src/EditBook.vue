<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String },
  author: { type: String },
  saveEdit: { type: Function },
  cancelEdit: { type: Function },
});

const editingTitle = ref(props.title);
const editingAuthor = ref(props.author);

const saveClickedHandler = () => {
  props.saveEdit({ title: editingTitle.value, author: editingAuthor.value });
};
</script>

<template>
  <div class="space-x-4">
    <span class="handwritten text-3xl mr-2">&#8226;</span>
    <input
      v-model="editingTitle"
      class="border rounded px-1 py-0.5 border-slate-300"
      placeholder="Title"
      aria-label="Edit book title"
    />
    <input
      v-model="editingAuthor"
      class="border rounded px-1 py-0.5 border-slate-300"
      placeholder="Author"
      aria-label="Edit book author"
    />
    <button
      @click="saveClickedHandler"
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
