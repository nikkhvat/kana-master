import ruDump from "./lessons/ru/dump.json"
import enDump from "./lessons/en/dump.json"

export const getDumpLessons = (lang: "ru" | "en") => {
  if (lang === "ru") {
    return ruDump
  }

  return enDump;
}