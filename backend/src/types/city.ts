export const cities = [
  { value: "vienna", label: "Vienna" },
  { value: "graz", label: "Graz" },
  { value: "linz", label: "Linz" },
  { value: "salzburg", label: "Salzburg" },
  { value: "innsbruck", label: "Innsbruck" },
  { value: "klagenfurt", label: "Klagenfurt" },
  { value: "villach", label: "Villach" },
  { value: "wels", label: "Wels" },
  { value: "stpölten", label: "St. Pölten" },
] as const;

export type City = (typeof cities)[number]["value"];
