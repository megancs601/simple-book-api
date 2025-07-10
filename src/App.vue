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

const deleteHandler = (bookId) => {
  console.log("delete ", bookId);
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="m-4">
    <form>
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="border-1 rounded-sm border-slate-400 ml-2"
      />
      <label for="author">Author:</label>
      <input
        type="text"
        id="author"
        v-model="author"
        class="border-1 rounded-sm border-slate-400 ml-2"
      />
      <button
        @click.prevent="addBookHandler"
        class="h-full cursor-pointer bg-sky-400 rounded-sm px-4 text-white font-semibold"
      >
        Add Book
      </button>
    </form>
    <p v-if="error != ''" class="mt-4 font-semibold text-red-400">
      {{ error }}
    </p>
    <ul class="list-disc mt-4 pl-4">
      <li v-for="book in books" :key="book.id">
        <div class="flex space-x-2">
          <p>
            <i class="font-bold">{{ book.title }}</i> by {{ book.author }}
          </p>
          <button
            @click="deleteHandler(book.id)"
            :aria-label="`Delete ${book.title} by ${book.author}`"
            class="text-slate-400 font-semibold hover:underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
