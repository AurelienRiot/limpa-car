export const fullDaysStyle = {
  border: "2px solid white",
  backgroundColor: "red",
};

export const partiallyFullDaysStyle = {
  border: "2px solid white",
  backgroundColor: "orange",
};

export const freeDaysStyle = {
  border: "2px solid white",
  backgroundColor: "green",
};

export const disabledStyle = { color: "gray", backgroundColor: "lightgray" };

export function GetFooterMessage(isDayAvailable: string | null) {
  if (isDayAvailable === "full") {
    return "Ce jour est complet!";
  } else if (isDayAvailable === "partiallyFull") {
    return "Ce jour est presque complet!";
  } else if (isDayAvailable === "free") {
    return "Ce jour est libre";
  } else if (isDayAvailable === "unavailable") {
    return "Choisisez un autre jour";
  } else {
    return null;
  }
}
