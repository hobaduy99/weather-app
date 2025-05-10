export const saveSearchHistory = (city: string, lat: number, lon: number) => {
  const existingHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  const newEntry = { city, lat, lon };
  const isDuplicate = existingHistory.some(
    (entry: { city: string }) => entry.city === city
  );

  if (!isDuplicate) {
    const updatedHistory = [...existingHistory, newEntry];
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }
};

const isBrowser = typeof window !== "undefined";

export const getSearchHistory = (): [] => {
  if (!isBrowser) return [];
  return JSON.parse(localStorage.getItem("searchHistory") || "[]");
};

export const removeSearchHistory = (city: string) => {
  let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  history = history.filter((item: string) => item !== city);
  localStorage.setItem("searchHistory", JSON.stringify(history));
};
