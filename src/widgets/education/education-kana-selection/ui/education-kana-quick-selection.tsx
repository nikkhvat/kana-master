import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Modal, View, ScrollView, Pressable, Text, SectionList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { useAppDispatch } from "@/hooks/redux";
import { useThemeContext } from "@/hooks/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import Switcher from "@/shared/ui/switcher/switcher";
import { resetKanaSelected } from "@/store/features/kana/slice";

interface EducationKanaSelectionProps {
  closeModal: () => void;
  show: boolean;
}

const MemoizedEducationKanaTable = React.memo(EducationKanaTableSelected);

const EducationKanaSelection: React.FC<EducationKanaSelectionProps> = ({ closeModal, show }) => {
  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

  const sections = useMemo(
    () => [
      { title: "Basic", type: "base", data: ["base"] },
      { title: "Dakuon", type: "dakuon", data: ["dakuon"] },
      { title: "Handakuon", type: "handakuon", data: ["handakuon"] },
      { title: "Yoon", type: "yoon", data: ["yoon"] },
    ],
    []
  );

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  
  return (
    <Modal visible={show} presentationStyle="pageSheet" animationType="slide" onRequestClose={closeModal}>
      <View style={{ flex: 1, backgroundColor: colors.color1, paddingBottom: 70 }}>
        <View style={{ height: 52, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 20, paddingRight: 20, borderColor: colors.color2, borderBottomWidth: 1 }}>
          <Pressable onPress={closeModal} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "400" }}>Close</Text>
          </Pressable>
          <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>
            {activeTab === "hiragana" ? t("kana.hiragana") : t("kana.katakana")}
          </Text>
          <Pressable onPress={() => dispatch(resetKanaSelected())} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.second_color3, fontSize: 17, fontWeight: "400" }}>Reset</Text>
          </Pressable>
        </View>
        <View style={[styles.lineContainer, { top: insets.top + 30, backgroundColor: colors.color2 }]} />
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section }) => (
            <React.Suspense fallback={<View />}>
              <EducationKanaTableSelected 
                isEditMode={true} 
                type={section.type as Alphabet}
                kana={activeTab}
                last={section.type === "yoon"}
              />
            </React.Suspense>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.nameContainer, { backgroundColor: colors.color1 }]}>
              <Text style={[styles.name, { color: colors.color4 }]}>{title}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0, height: 100, width: "100%", paddingTop: 5, backgroundColor: colors.color1, borderColor: colors.color2, borderTopWidth: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "center", paddingHorizontal: 20 }}>
        <Switcher 
          activeTab={activeTab} 
          setActiveTab={(val) => setActiveTab(val as "hiragana" | "katakana")} 
          options={["hiragana", "katakana"]}
          translate={[
            t("kana.hiragana"),
            t("kana.katakana"),
          ]} />
      </View>
    </Modal>
  );
};

export default EducationKanaSelection;


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 80,
  },
  switcherContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  nameContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
  },
  lineContainer: {
    width: "100%",
    height: 1,
    position: "absolute",
    zIndex: 999,
  },
});