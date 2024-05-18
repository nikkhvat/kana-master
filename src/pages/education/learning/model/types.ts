import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons"

export interface InitialState {
  completedLesson: string[]
  chapters: (AutoLesson | ManuallyLesson)[][]
  lastUpdate: number
  lang: "ru" | "en",
}
