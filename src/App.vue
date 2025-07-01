<script setup>
import { onMounted, ref } from "vue";

const API_URL = "http://localhost:3000/books";
const books = ref([]);
const title = ref("");
const author = ref("");

const fetchBooks = async () => {
  const res = await fetch(API_URL);

  books.value = await res.json();
  console.log("Fetched books:", books.value);
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <form>
    <label for="title">Book title:</label>
    <input type="text" id="title" />

    <label for="author">Author:</label>
    <input type="text" id="author" />
  </form>
  <ol>
    <li v-for="(book, index) in books" :key="index">
      {{ book.title }} by {{ book.author }}
    </li>
  </ol>
</template>

<style scoped></style>
