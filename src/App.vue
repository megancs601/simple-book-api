<script setup>
import { onMounted, ref } from "vue";

const API_URL = "http://localhost:3000/books";
const books = ref([]);
const title = ref("");
const author = ref("");
const error = ref("");

const fetchBooks = async () => {
  // reset error message
  error.value = "";

  try {
    const res = await fetch(API_URL);
    books.value = await res.json();

    console.log("Fetched books:", books.value);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const addBookHandler = async () => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        author: author.value,
      }),
    });

    if (res.ok) {
      title.value = "";
      author.value = "";

      fetchBooks();
    } else if (res.status === 409 || res.status === 400) {
      const data = await res.json();
      error.value = data.error;
    }
  } catch (error) {
    error.value =
      "We could not add this book at this time. Please try again later.";
    console.error("❌ Network or server error:", error);
  }
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <form>
    <label for="title">Book title:</label>
    <input type="text" id="title" v-model="title" />
    <label for="author">Author:</label>
    <input type="text" id="author" v-model="author" />
    <button @click.prevent="addBookHandler">Add Book</button>
  </form>
  <p v-if="error != ''">{{ error }}</p>
  <ol>
    <li v-for="book in books" :key="book.id">
      {{ book.title }} by {{ book.author }}
    </li>
  </ol>
</template>

<style scoped></style>
