import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tema = "light" | "dark";

interface ThemeStore {
  tema: Tema;
  trocarTema: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      tema:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      trocarTema: () => {
        const novoTema: Tema = get().tema === "light" ? "dark" : "light";
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle(
            "dark",
            novoTema === "dark"
          );
        }

        set({ tema: novoTema });
      },
    }),
    {
      name: "tema",
      onRehydrateStorage: () => (state) => {
        if (state?.tema === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }
  )
);
