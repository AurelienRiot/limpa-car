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

export const disabledStyle = {
  color: "gray ",
  backgroundColor: "lightgray ",
  cursor: "not-allowed",
};

export function GetFooterMessage(isDayAvailable: string | null) {
  switch (isDayAvailable) {
    case "full":
      return "Ce jour est complet!";
    case "partiallyFull":
      return "Ce jour est presque complet!";
    case "free":
      return "Ce jour est libre";
    case "unavailable":
      return "Choisisez un autre jour";
    default:
      return null;
  }
}
