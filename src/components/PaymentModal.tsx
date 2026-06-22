import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export interface PayableCourse {
  id: string;
  name: string;
  price: string;
  amount: number;
  perHour?: boolean;
}

const MAX_HOURS = 20;

interface PaymentModalProps {
  course: PayableCourse | null;
  onClose: () => void;
}

const PHONE_RE = /^[+0-9 ]{7,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PaymentModal = ({ course, onClose }: PaymentModalProps) => {
  const { t, i18n } = useTranslation();
  const [hours, setHours] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const reset = () => {
    setHours(1);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setErrors({});
    setServerError("");
    setSubmitting(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = t("payment.validation.required");
    if (!lastName.trim()) next.lastName = t("payment.validation.required");
    if (!phone.trim()) next.phone = t("payment.validation.required");
    else if (!PHONE_RE.test(phone.trim())) next.phone = t("payment.validation.phone");
    if (!email.trim()) next.email = t("payment.validation.required");
    else if (!EMAIL_RE.test(email.trim())) next.email = t("payment.validation.email");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/payu-create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.name,
          amount: course.amount,
          hours: course.perHour ? hours : undefined,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          language: i18n.language,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.redirectUri) throw new Error(data.error || "create-order failed");
      window.location.href = data.redirectUri;
    } catch {
      setServerError(t("payment.error"));
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!course} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-primary">{t("payment.modalTitle")}</DialogTitle>
        </DialogHeader>

        {course && (
          <div className="rounded-lg bg-secondary px-4 py-3 mb-2 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("payment.modalCourseLabel")}</div>
              <div className="font-semibold text-primary">{course.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("payment.modalAmountLabel")}</div>
              <div className="font-display text-lg font-bold text-gradient-gold">
                {course.perHour ? `${course.amount * hours} ${course.price.split(" ")[1] ?? ""}` : course.price}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {course?.perHour && (
            <div className="space-y-1.5">
              <Label htmlFor="pm-hours">{t("payment.hours")}</Label>
              <Input
                id="pm-hours"
                type="number"
                min={1}
                max={MAX_HOURS}
                value={hours}
                onChange={(e) => setHours(Math.min(MAX_HOURS, Math.max(1, Number(e.target.value) || 1)))}
                disabled={submitting}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pm-firstName">{t("payment.firstName")}</Label>
              <Input id="pm-firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={submitting} />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pm-lastName">{t("payment.lastName")}</Label>
              <Input id="pm-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={submitting} />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pm-phone">{t("payment.phone")}</Label>
            <Input id="pm-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={submitting} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pm-email">{t("payment.email")}</Label>
            <Input id="pm-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">{t("payment.infoNote")}</p>

          {serverError && <p className="text-sm text-destructive">{serverError}</p>}

          <Button type="submit" disabled={submitting} className="w-full bg-gold-gradient text-gold-foreground hover:opacity-90 transition-smooth">
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> {t("payment.submitting")}
              </span>
            ) : (
              t("payment.submit")
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
