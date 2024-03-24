import React from "react";

import { useTranslation } from "react-i18next";

import SafeLayout from "@/app/layouts/safeLayout";
import PageTitle from "@/shared/ui/page-title/page-title";

const LearningList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <SafeLayout>
      <PageTitle>{t("tabs.learning")}</PageTitle>
    </SafeLayout>
  );
};

export default LearningList;