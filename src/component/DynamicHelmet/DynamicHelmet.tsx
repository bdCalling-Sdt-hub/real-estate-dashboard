import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const DynamicHelmet = () => {
    const {t} = useTranslation();
    return (
        <Helmet>
        <title>{t("title")}</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
    );
};

export default DynamicHelmet;