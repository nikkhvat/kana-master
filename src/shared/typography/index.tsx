import { TextStyle, StyleSheet } from "react-native";

// Regular Large
export const TypographyRegularLarge: TextStyle = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: 96,
  lineHeight: 104,
  fontWeight: "700",
};

// Regular H1
export const TypographyRegularH1: TextStyle = {
  fontFamily: "SFProDisplay-Regular",
  fontSize: 28,
  lineHeight: 32,
  fontWeight: "400",
};

// Regular H3
export const TypographyRegularH3: TextStyle = {
  fontFamily: "SFProText-Regular",
  fontSize: 19,
  lineHeight: 24,
  fontWeight: "400",
};

// Regular H4
export const TypographyRegularH4: TextStyle = {
  fontFamily: "SFProText-Regular",
  fontSize: 17,
  lineHeight: 22,
  fontWeight: "400",
};

// Regular Paragraph
export const TypographyRegularParagraph: TextStyle = {
  fontFamily: "SFProText-Regular",
  fontSize: 15,
  lineHeight: 20,
  fontWeight: "400",
};

// Regular Label
export const TypographyRegularLabel: TextStyle = {
  fontFamily: "SFProText-Regular",
  fontSize: 13,
  lineHeight: 16,
  fontWeight: "400",
};

// Regular Caption
export const TypographyRegularCaption: TextStyle = {
  fontFamily: "SFProText-Regular",
  fontSize: 11,
  lineHeight: 14,
  fontWeight: "400",
};

// Bold H1
export const TypographyBoldH1: TextStyle = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: 28,
  lineHeight: 32,
  fontWeight: "700",
};

// Bold H2
export const TypographyBoldH2: TextStyle = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: 22,
  lineHeight: 26,
  fontWeight: "700",
};

// Bold H3
export const TypographyBoldH3: TextStyle = {
  fontFamily: "SFProText-Bold",
  fontSize: 19,
  lineHeight: 24,
  fontWeight: "700",
};

// Bold H4
export const TypographyBoldH4: TextStyle = {
  fontFamily: "SFProText-Bold",
  fontSize: 17,
  lineHeight: 22,
  fontWeight: "700",
};

// Bold Paragraph
export const TypographyBoldParagraph: TextStyle = {
  fontFamily: "SFProText-Bold",
  fontSize: 15,
  lineHeight: 20,
  fontWeight: "700",
};

// Bold Label
export const TypographyBoldLabel: TextStyle = {
  fontFamily: "SFProText-Bold",
  fontSize: 13,
  lineHeight: 16,
  fontWeight: "700",
};

export const Typography = StyleSheet.create({
  regularLarge: TypographyRegularLarge,
  regularH1: TypographyRegularH1,
  regularH3: TypographyRegularH3,
  regularH4: TypographyRegularH4,
  regularParagraph: TypographyRegularParagraph,
  regularLabel: TypographyRegularLabel,
  regularCaption: TypographyRegularCaption,

  boldH1: TypographyBoldH1,
  boldH2: TypographyBoldH2,
  boldH3: TypographyBoldH3,
  boldH4: TypographyBoldH4,
  boldParagraph: TypographyBoldParagraph,
  boldLabel: TypographyBoldLabel,
});
