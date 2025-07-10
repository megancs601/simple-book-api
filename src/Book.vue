<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: { type: String },
  title: { type: String },
  author: { type: String },
  editHandler: { type: Function },
  deleteHandler: { type: Function },
});
</script>

<template>
  <div class="flex space-x-2">
    <p>
      <i class="font-bold">{{ title }}</i> by {{ author }}
    </p>
    <button
      @click="editHandler({ id, title, author })"
      :aria-label="`Edit ${title} by ${author}`"
      class="text-slate-400 font-semibold cursor-pointer hover:underline hover:text-sky-500"
    >
      Edit
    </button>
    <button
      @click="deleteHandler(id)"
      :aria-label="`Delete ${title} by ${author}`"
      class="text-slate-400 font-semibold cursor-pointer hover:underline hover:text-red-600"
    >
      Delete
    </button>
  </div>
</template>
