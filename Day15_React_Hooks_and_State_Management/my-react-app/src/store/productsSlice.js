
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed fetching data");
  return res.json();
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (updated) => {
  const res = await fetch(`${API}/${updated.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, s => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(updateProduct.fulfilled, (s, a) => {
        const i = s.items.findIndex(p => p.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      });
  }
});

export default productsSlice.reducer;
