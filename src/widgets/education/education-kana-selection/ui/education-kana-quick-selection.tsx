import React, { useState } from "react";

import { Modal, View, ScrollView, Pressable, Text } from "react-native";

import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { useAppDispatch } from "@/hooks/redux";
import { useThemeContext } from "@/hooks/theme-context";
import Switcher from "@/shared/ui/switcher/switcher";
import { resetKanaSelected } from "@/store/features/kana/slice";

interface EducationKanaSelectionProps {
  closeModal: () => void;
  show: boolean;
}

const EducationKanaSelection: React.FC<EducationKanaSelectionProps> = ({ closeModal, show }) => {
  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

  return (
    <Modal visible={show} presentationStyle="pageSheet" animationType="slide" onRequestClose={closeModal}>
      <View style={{ flex: 1, backgroundColor: colors.color1 }}>
        <View style={{ height: 52, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 20, paddingRight: 20, borderColor: colors.color2, borderBottomWidth: 1 }}>
          <Pressable onPress={closeModal} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Close</Text>
          </Pressable>
          <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Hiragana</Text>
          <Pressable onPress={() => dispatch(resetKanaSelected())} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.second_color3, fontSize: 17, fontWeight: "400" }}>Reset</Text>
          </Pressable>
        </View>
        <ScrollView>
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: colors.color2, borderBottomWidth: 1 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Basic</Text>
          </View>
          <EducationKanaTableSelected isEditMode={true} type="base" kana={activeTab} />
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: colors.color2, borderBottomWidth: 1 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Dakuon</Text>
          </View>
          <EducationKanaTableSelected isEditMode={true} type="dakuon" kana={activeTab} />
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: colors.color2, borderBottomWidth: 1 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Handakuon</Text>
          </View>
          <EducationKanaTableSelected isEditMode={true} type="handakuon" kana={activeTab} />
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: colors.color2, borderBottomWidth: 1 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>Yoon</Text>
          </View>
          <EducationKanaTableSelected isEditMode={true} type="yoon" kana={activeTab} />
          <View style={{ marginBottom: 120 }}></View>
        </ScrollView>
      </View>
      <View style={{ position: "absolute", bottom: 0, height: 100, width: "100%", paddingTop: 5, backgroundColor: colors.color1, borderColor: colors.color2, borderTopWidth: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
        <Switcher activeTab={activeTab} setActiveTab={(val) => setActiveTab(val as "hiragana" | "katakana")} options={["hiragana", "katakana"]} width="100%" />
      </View>
    </Modal>
  );
};

export default EducationKanaSelection;
