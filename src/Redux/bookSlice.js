import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchTerm) => {
    const defaultWords = [
      "life",
      "history",
      "science",
      "love",
      "mystery",
      "art",
      "technology",
      "adventure",
    ];

    const query =
      searchTerm?.trim() ||
      defaultWords[Math.floor(Math.random() * defaultWords.length)];
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await res.json();

    return data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || "Unknown",
      rating:
        typeof item.volumeInfo.averageRating === "number"
          ? item.volumeInfo.averageRating
          : 0,
      genre: item.volumeInfo.categories?.[0] || "Uncategorized",
      image:
        item.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/150",
      description: item.volumeInfo.description || "No description available.",
    }));
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: { items: [], userAdded: [], loading: false, error: null },
  reducers: {
    addBook: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const existingIds = new Set(state.items.map((book) => book.id));
        const newBooks = action.payload.filter(
          (book) => !existingIds.has(book.id)
        );

        state.items = [...state.items, ...newBooks];
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
