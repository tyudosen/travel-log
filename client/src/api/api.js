const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://travel-log-api.tyudosen.vercel.app";

export const fetchEntries = async () => {
  const entries = await fetch(`${API_URL}/api/travel-logs`);
  return entries.json();
};

export const createLogEntry = async (entry) => {
  const response = await fetch(`${API_URL}/api/travel-logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
};
