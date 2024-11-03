import { Accessor, Setter } from "solid-js";
import { StudyPlan } from "../models";

export interface ReadingPlanContextType {
    readingPlan: Accessor<StudyPlan[] | undefined>;
    setReadingPlan: Setter<StudyPlan[] | undefined>;
}
