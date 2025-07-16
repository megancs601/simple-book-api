<script setup>
const title = defineModel("title");
const author = defineModel("author");

defineProps({
  addBookHandler: { type: Function },
});
</script>

<template>
  <form
    @submit.prevent="addBookHandler"
    class="grid grid-flow-row grid-cols-3 gap-2"
  >
    <input
      type="text"
      aria-label="Book Title"
      id="title"
      v-model="title"
      placeholder="Title"
      class="border-1 rounded-sm border-slate-400 p-1 placeholder:text-gray-400 bg-white placeholder:italic"
    />
    <input
      type="text"
      aria-label="Book Author"
      id="author"
      v-model="author"
      placeholder="Author"
      class="border-1 rounded-sm border-slate-400 p-1 placeholder:text-gray-400 bg-white placeholder:italic"
    />
    <button
      type="submit"
      class="w-20 cursor-pointer bg-amber-950 rounded-sm text-white font-semibold leading-[34px] col-auto hover:bg-sky-400"
    >
      Add
    </button>
  </form>
</template>
