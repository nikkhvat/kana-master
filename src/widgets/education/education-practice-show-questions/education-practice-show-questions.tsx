import React from "react";

import ChooseLetters from "../education-practice-choose-letters/education-practice-choose-letters";
import ChooseValue from "../education-practice-choose-value/education-practice-choose-value";
import FindPair from "../education-practice-find-pair/education-practice-find-pair";
import SelectAnswers from "../education-practice-select-answers/education-practice-select-answers";
import ShowSymbol from "../education-practice-show-symbol/education-practice-show-symbol";

import { PracticeScreenMode, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { AnyQuestion } from "@/shared/types/questions";


interface EducationPracticeShowQuestionsProps {
  question: AnyQuestion;
  mode: PracticeScreenMode;

  questions: AnyQuestion[];

  onFinish: (isError: boolean) => void;
}

const EducationPracticeShowQuestions: React.FC<EducationPracticeShowQuestionsProps> = ({
  question,
  questions, 
	mode,
  onFinish,
}) => {
  const isChooseLetter = question?.type === QuestionTypeChooseLetter;
  const isFindPair = question?.type === QuestionTypeFindPairWord;
  const isBuildingWord = question?.type === QuestionTypeBuildingWord;
  const isChooseWord = question?.type === QuestionTypeChooseWord;

  if (questions.length === 0) return <></>;

  if (isChooseLetter && mode === PracticeScreenMode.Testing) {
    return (
      <>
        <ShowSymbol symbol={question.symbol} subtext={question.kana} />
        <SelectAnswers
          answers={question.answers}
          onCompleted={onFinish}
          trueAnswer={question.trueAnswer}
        />
      </>
    );
  }

  if (isFindPair && mode == PracticeScreenMode.WordGame) {
    return (
      <FindPair
        pairs={question.pairs}
        answers={question.answers}
        onCompleted={(isError) => onFinish(!isError)}
        title={question.title}
      />
    );
  }

  if (isBuildingWord && mode == PracticeScreenMode.WordGame) {
    return (
      <ChooseLetters
        title={question.title}
        romanji={question.romanji}
        translate={question.translate}
        kana={question.kana}
        shuffle={question.shuffle}
        onFinish={(isError) => onFinish(!isError)}
      />
    );
  }

  if (isChooseWord && mode == PracticeScreenMode.WordGame) {
    return (
      <ChooseValue
        title={question.title}
        questions={question.questions}
        onCompleted={(isError) => onFinish(!isError)}
        trueKey={question.trueKey}
      />
    );
  }
};

export default EducationPracticeShowQuestions;