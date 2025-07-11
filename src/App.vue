<script setup>
import { onMounted, ref } from "vue";
import EditBook from "./EditBook.vue";
import Book from "./Book.vue";
import TheGitLogo from "./TheGitLogo.vue";

const API_URL = "http://localhost:3000/books";
const books = ref([]);

const title = ref("");
const author = ref("");
const error = ref("");

const editingId = ref(null);
const editingTitle = ref("");
const editingAuthor = ref("");

const fetchBooks = async () => {
  // reset
  error.value = "";
  editingId.value = null;
  title.value = "";
  author.value = "";

  try {
    const res = await fetch(API_URL);
    books.value = await res.json();
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
      await fetchBooks();
    } else if (res.status === 409 || res.status === 400) {
      const data = await res.json();
      console.log(data);
      error.value = data.error;
    }
  } catch (error) {
    showNetworkError({ error, action: "add" });
  }
};

const deleteBookHandler = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/${bookId}`, { method: "DELETE" });

    if (res.ok) {
      await fetchBooks();
    }
  } catch (error) {
    showNetworkError({ error, action: "delete" });
  }
};

const editBookHandler = async ({ id, title, author }) => {
  editingId.value = id;
  editingTitle.value = title;
  editingAuthor.value = author;
};

const saveEditingHandler = async ({ title, author }) => {
  try {
    const res = await fetch(`${API_URL}/${editingId.value}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        author,
      }),
    });

    if (res.ok) {
      await fetchBooks();
    } else if (res.status === 409 || res.status === 400) {
      const data = await res.json();
      error.value = data.error;
    }
  } catch (error) {
    showNetworkError({ error, action: "edit" });
  }
};

const showNetworkError = ({ error, action }) => {
  error.value = `We could not ${action} this book at this time. Please try again later.`;
  console.error("❌ Network or server error:", error);
};

const cancelEditingHandler = () => {
  editingId.value = null;
  error.value = "";
};

onMounted(async () => {
  await fetchBooks();
});
</script>

<template>
  <TheGitLogo />
  <div class="m-auto mt-12 w-3xl">
    <h1 class="text-2xl font-medium text-amber-950 font-mono">Add Book:</h1>
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
    <p v-if="error != ''" class="mt-4 font-semibold text-red-400">
      {{ error }}
    </p>
    <ul
      class="shadow-lg shadow-stone-900/15 rounded-sm bg-white grid grid-flow-row mt-4"
    >
      <li
        v-for="book in books"
        :key="book.id"
        class="border-b-[1px] border-sky-600/40 px-4 py-2 last:border-none last:pb-5 first:pt-4"
      >
        <EditBook
          v-if="editingId === book.id"
          :title="editingTitle"
          :author="editingAuthor"
          :saveEdit="saveEditingHandler"
          :cancelEdit="cancelEditingHandler"
        />
        <Book
          v-else
          :id="book.id"
          :title="book.title"
          :author="book.author"
          :editHandler="editBookHandler"
          :deleteHandler="deleteBookHandler"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
