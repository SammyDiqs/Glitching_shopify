import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ImportCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
 

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleImport = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/import");

    if (response.ok) {
      setToastProps({
        content: t("You have imported your product!", {
        }),
      });
      setIsLoading(false);
      await refetchProductCount();
    } else {
      setIsLoading(false);
      setToastProps({
        content: t("There was an error importing your product..."),
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title={t("Import Product!")}
        sectioned
        primaryFooterAction={{
          content: t("Import now.", {
          }),
          onAction: handleImport,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>{t("This should add Grabage bag to your products.")}</p>
          <Text as="h4" variant="headingMd">
            {t("ProductsCard.totalProductsHeading")}
            <Text variant="bodyMd" as="p" fontWeight="semibold">
              {isLoadingCount ? "-" : data.count}
            </Text>
          </Text>
        </TextContainer>
      </Card>
    </>
  );
}
