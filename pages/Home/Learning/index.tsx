import React from 'react'
import PreviewCard from '../../../components/PreviewCard';

import learningImage from "../../../assets/preview/learning.png";
import Button from '../../../components/Button';

import styled from "styled-components/native"

const Learning = () => {
  const Container = styled.View`
    padding-left: 20px;
    padding-right: 20px;
    flex: 1;
  `

  const Content = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 15px;
  `

  return (
    <Container>
      <PreviewCard
        imageSource={learningImage}
        title={"66"}
        subtitle={"Hiragana / Katakana"}
      />

      <Content>
        <Button title={"Learn"} type={"general"} fontSize={17} />
      </Content>
    </Container>
  );
}

export default Learning;