import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentThankYou = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-primary-foreground mb-4">
          {t("paymentThankYou.title")}
        </h1>
        <p className="text-primary-foreground/80 mb-8 leading-relaxed">{t("paymentThankYou.desc")}</p>
        <Button asChild className="bg-gold-gradient text-gold-foreground hover:opacity-90">
          <Link to="/">{t("paymentThankYou.backHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentThankYou;
