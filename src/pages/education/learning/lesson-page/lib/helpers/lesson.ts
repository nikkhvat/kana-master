import { AnyLesson, AutoLesson, InfoLessonScreen, ManuallyLesson } from "@/shared/constants/lessons";


export const isAutoLesson = (
  item: AutoLesson | ManuallyLesson,
): item is AutoLesson => "letters" in item;

export const isManuallyLesson = (
  item: AutoLesson | ManuallyLesson,
): item is ManuallyLesson => "screens" in item;

export const isInfoLessonScreen = (
  item: AnyLesson | InfoLessonScreen | null | undefined,
): item is InfoLessonScreen =>
  item !== null && typeof item === "object" && !("name" in item);

export const isAnyLessonScreen = (
  item: AnyLesson | InfoLessonScreen | null | undefined,
): item is AnyLesson =>
  item !== null && typeof item === "object" && "name" in item;
