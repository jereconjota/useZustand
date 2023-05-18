import create from "zustand";

// Define a TypeScript interfaces
export interface Post {
  id: number;
  title: string;
  body: string;
}

interface CounterState {
  count: number;
  title: string;
  posts: Post[];
  increment: (value: number) => void; // A function that takes a number and returns nothing
  getPosts: () => Promise<void>; // A function that returns a Promise of nothing
  cleanStore: () => void; // A function that returns nothing
  multiply: (value: number) => void; // A function that takes a number and returns nothing
}

// Create the counter store using Zustand
export const useCounterStore = create<CounterState>((set, get) => ({
  // Set some initial state values
  title: "Some title",
  count: 10,
  posts: [],

  // Takes a value and adds it to the count
  increment: (value: number) =>
    set((state) => ({ ...state, count: state.count + value })),

  // Retrieves data from an external JSON API
  getPosts: async () => {
    const posts = await (
      await fetch("https://jsonplaceholder.typicode.com/posts")
    ).json();
    set((state) => ({ ...state, posts }));
  },

  // Resets the store to its initial state
  cleanStore: () => set({}, true),

  // Multiplies the count by a value
  multiply: (value: number) => {
    const { count } = get();
    set({ count: count * value });
  },
}));
