import React from "react";

import styled from "styled-components/native";

type Content = {
  width?: string
}

const Content = styled.View<Content>`
  padding-left: 20px;
  padding-right: 20px;
  width: ${({ width }) => (width ? width : "100%")};
`;

const Tabs = styled.View`
  padding: 2px;
  flex-direction: row;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.second_color4};
  border-radius: 12px;
  margin-top: 8px;
`;

const Tab = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 46px;
  border-radius: 10px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.color1 : "transparent"};
`;

const TabText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.color4};
`;

interface SwitchProp {
  activeTab: string
  options: string[]
  setActiveTab: (val: string) => void
  width?: string
}

const Switch: React.FC<SwitchProp> = ({ width, activeTab, setActiveTab, options }) => {
  return (
    <Content width={width} >
      <Tabs>
        {options.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          >
            <TabText>{tab}</TabText>
          </Tab>
        ))}
      </Tabs>
    </Content>
  );
};

export default Switch;