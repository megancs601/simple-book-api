<script setup>
const messages = [
  "There are no books to display.",
  "Please enter a book title and author.",
];
</script>

<template>
  <ul
    class="border-[1px] border-stone-600/10 shadow-lg shadow-stone-900/15 rounded-sm bg-white grid grid-flow-row mt-4"
  >
    <li
      v-for="(msg, index) in messages"
      :key="index"
      class="border-b-[1px] border-sky-600/40 px-4 py-2 last:border-none last:pb-5 first:pt-4"
    >
      <p class="font-mono text-xl">
        <span class="text-2xl mr-2">&#8226;</span>
        {{ msg }}
      </p>
    </li>
  </ul>
</template>
