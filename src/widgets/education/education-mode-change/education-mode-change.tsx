import React from "react";

import styled from "styled-components/native";

import Button from "@/shared/ui/button/button";


export type EducationModeChangeProps = {
  title: string;
  buttons: {
    title: string;
    type: "active" | "inactive" | "weak" | "general";
    key: string;
    condition?: boolean
  }[][];
  onButtonClick?: (column: number, index: number) => void;
};

const EducationModeChange: React.FC<EducationModeChangeProps> = ({ title, buttons, onButtonClick }) => {

  return (
    <Container>
      <Title>{title}</Title>
      <ButtonsContainer>
        {buttons.length > 0 && <Column>
          {buttons[0].map((btn, idx) => (
            <Button
              onClick={() => btn.condition && onButtonClick?.(0, idx)}
              key={btn.title}
              title={btn.title}
              type={btn.condition ? btn.type : "disabled"}
            />
          ))}
        </Column>}
        {buttons.length > 1 && <Column>
          {buttons[1].map((btn, idx) => (
            <Button
              onClick={() => btn.condition && onButtonClick?.(1, idx)}
              key={btn.title}
              title={btn.title}
              type={btn.condition ? btn.type : "disabled"}
            />
          ))}
        </Column>}
      </ButtonsContainer>
    </Container>
  );
};


export default EducationModeChange;

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.43px;
  color: ${({ theme }) => theme.colors.color4};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;