// Uhrzeit korrekt anzeigen
export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });
};

// Datum korrekt anzeigen
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
};
