<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  id: { type: String },
  title: { type: String },
  author: { type: String },
  editHandler: { type: Function },
  deleteHandler: { type: Function },
});
</script>

<template>
  <div class="group flex space-x-2 items-center">
    <p class="font-mono text-xl">
      <span class="text-2xl mr-2">&#8226;</span>
      <i>{{ title }}</i> by {{ author }}
    </p>
    <span
      class="space-x-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
    >
      <button
        @click="editHandler({ id, title, author })"
        :aria-label="`Edit ${title} by ${author}`"
        class="text-slate-400 font-semibold cursor-pointer hover:underline leading-[37px] px-1 hover:text-sky-500 rounded-sm"
      >
        Edit
      </button>
      <button
        @click="deleteHandler(id)"
        :aria-label="`Delete ${title} by ${author}`"
        class="text-slate-400 font-semibold cursor-pointer hover:underline leading-[37px] px-1 hover:text-red-600 rounded-sm"
      >
        Delete
      </button>
    </span>
  </div>
</template>
