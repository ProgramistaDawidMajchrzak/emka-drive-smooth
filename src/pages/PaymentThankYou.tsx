import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentThankYou = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  // PayU dopisuje ?error=... do continueUrl, gdy płatność nie przeszła
  const failed = searchParams.has("error");

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {failed ? (
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
        ) : (
          <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
        )}
        <h1 className="font-display text-3xl font-bold text-primary-foreground mb-4">
          {t(failed ? "paymentThankYou.errorTitle" : "paymentThankYou.title")}
        </h1>
        <p className="text-primary-foreground/80 mb-8 leading-relaxed">
          {t(failed ? "paymentThankYou.errorDesc" : "paymentThankYou.desc")}
        </p>
        <Button asChild className="bg-gold-gradient text-gold-foreground hover:opacity-90">
          <Link to="/">{t("paymentThankYou.backHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentThankYou;
