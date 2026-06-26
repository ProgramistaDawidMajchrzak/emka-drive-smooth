import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PaymentModal, { type PayableCourse } from "@/components/PaymentModal";
import { Car, Users, Heart, Target, Award, Phone, Mail, MapPin, Instagram, Facebook, Music2, Menu, X, Check, Star, Sparkles, Gift, GraduationCap, Zap, Shield, Clock, FileText } from "lucide-react";
import logo from "@/assets/emka-logo.png";
import cars from "@/assets/emka-cars.jpg";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const reasonIcons = [Car, Heart, Sparkles, Target, Award, Users];
const mainCourseIcons = [GraduationCap, Users, Zap];
const extraCourseIcons = [Car, Award];
const promoIcons = [Sparkles, Gift, Clock];

const locations = [
  {
    mapUrl: "https://maps.google.com/maps?q=D%C4%85browskiego+143%2C+Pozna%C5%84+60-577&output=embed&hl=pl&z=15",
    mapsLink: "https://maps.google.com/maps?q=D%C4%85browskiego+143%2C+Pozna%C5%84+60-577",
  },
  {
    mapUrl: "https://maps.google.com/maps?q=Sytkowska+45%2C+Pozna%C5%84+60-413&output=embed&hl=pl&z=15",
    mapsLink: "https://maps.google.com/maps?q=Sytkowska+45%2C+Pozna%C5%84+60-413",
  },
  {
    mapUrl: "https://maps.google.com/maps?q=os.+Pod+Lipami+108a%2C+Pozna%C5%84+61-638&output=embed&hl=pl&z=15",
    mapsLink: "https://maps.google.com/maps?q=os.+Pod+Lipami+108a%2C+Pozna%C5%84+61-638",
  },
];

const LANGS = [
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ua", label: "UA", flag: "🇺🇦" },
];

const Index = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTeenModal, setShowTeenModal] = useState(false);
  const [showSOM, setShowSOM] = useState(false);
  const [payingCourse, setPayingCourse] = useState<PayableCourse | null>(null);

  const nav = [
    { href: "#dlaczego", label: t("nav.dlaczego") },
    { href: "#o-nas", label: t("nav.oNas") },
    { href: "#instruktorzy", label: t("nav.instruktorzy") },
    { href: "#kursy", label: t("nav.kursy") },
    { href: "#flota", label: t("nav.flota") },
    { href: "#promocje", label: t("nav.promocje") },
    { href: "#opinie", label: t("nav.opinie") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#znajdz-nas", label: t("nav.znajdzNas") },
    { href: "#kontakt", label: t("nav.kontakt") },
  ];

  const reasons = (t("reasons.items", { returnObjects: true }) as { title: string; desc: string }[]);
  const mainCourses = (t("courses.main", { returnObjects: true }) as { id: string; name: string; price: string; amount: number; payOnline: boolean; features: string[] }[]);
  const extraCourses = (t("courses.extra", { returnObjects: true }) as { id: string; name: string; price: string; amount: number; payOnline: boolean; perHour?: boolean; features: string[] }[]);
  const promos = (t("promos.items", { returnObjects: true }) as { badge: string; title: string; desc: string; cta: string }[]);
  const reviews = (t("reviews.items", { returnObjects: true }) as { name: string; text: string }[]);
  const faqs = (t("faq.items", { returnObjects: true }) as { q: string; a: string }[]);
  const findUsLocations = (t("findUs.locations", { returnObjects: true }) as { name: string; subtitle?: string; address: string }[]);
  const instructors = (t("instructors.items", { returnObjects: true }) as { name: string; phone: string; tel: string }[]);
  const fleetItems = (t("fleet.items", { returnObjects: true }) as string[]);
  const somItems = (t("somModal.items", { returnObjects: true }) as string[]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("teenPopupShown")) {
      const t = setTimeout(() => setShowTeenModal(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const closeTeenModal = () => {
    setShowTeenModal(false);
    sessionStorage.setItem("teenPopupShown", "true");
  };

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* POPUP 17-LATKI */}
      <Dialog open={showTeenModal} onOpenChange={(v) => { if (!v) closeTeenModal(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">{t("teenModal.title")}</DialogTitle>
            <DialogDescription className="text-foreground/80 leading-relaxed pt-2 whitespace-pre-line">
              {t("teenModal.desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button className="bg-gold-gradient text-gold-foreground font-semibold" asChild>
              <a href="tel:790775049">{t("teenModal.ctaCall")}</a>
            </Button>
            <Button variant="outline" onClick={closeTeenModal}>{t("teenModal.ctaClose")}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG STANDARDY OCHRONY MAŁOLETNICH */}
      <Dialog open={showSOM} onOpenChange={setShowSOM}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">{t("somModal.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-foreground/80 leading-relaxed space-y-3 text-sm">
            <p>{t("somModal.p1")}</p>
            <p>{t("somModal.p2")}</p>
            <ul className="list-disc list-inside space-y-1">
              {somItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{t("somModal.p3")} <strong>biuro@emka.edu.pl</strong></p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
            <a href="/standardy-ochrony-skrocona.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-smooth">
              <FileText className="w-4 h-4" />
              Wersja skrócona (PDF)
            </a>
            <a href="/standardy-ochrony-pelna.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/40 text-gold font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/10 transition-smooth">
              <FileText className="w-4 h-4" />
              Wersja pełna (PDF)
            </a>
          </div>
          <Button variant="outline" onClick={() => setShowSOM(false)} className="mt-2">{t("somModal.close")}</Button>
        </DialogContent>
      </Dialog>

      {/* MODAL PŁATNOŚCI PAYU */}
      <PaymentModal course={payingCourse} onClose={() => setPayingCourse(null)} />

      {/* PROMO BANNER */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-gold-gradient text-gold-foreground text-center py-2 px-4 text-sm font-semibold">
        {t("promoBanner")}{" "}
        <a href="tel:790775049" className="underline font-bold ml-1">{t("promoBannerCta")}</a>
      </div>

      {/* NAV */}
      <header className={`fixed top-9 inset-x-0 z-50 transition-smooth ${scrolled ? "bg-primary-deep/95 backdrop-blur-lg shadow-elegant" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="eMKA – Ośrodek Szkolenia Kierowców" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-xl text-gold font-bold">eMKA</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">Ośrodek Szkolenia Kierowców</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-5">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-gold hover:after:w-full after:transition-all">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 border border-gold/30 rounded-lg px-1 py-1">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  className={`text-xs px-2 py-1 rounded-md font-semibold transition-smooth ${i18n.language === l.code ? "bg-gold text-gold-foreground" : "text-primary-foreground/70 hover:text-gold"}`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            <Button variant="default" className="bg-gold-gradient text-gold-foreground hover:opacity-90 hover:shadow-gold-soft transition-smooth font-semibold" asChild>
              <a href="#kontakt">{t("nav.zapiszSie")}</a>
            </Button>
          </div>
          <button className="lg:hidden text-primary-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden bg-primary-deep border-t border-gold/20 animate-fade-up">
            <div className="container py-6 flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-primary-foreground/90 hover:text-gold transition-smooth">{n.label}</a>
              ))}
              <div className="flex gap-2 py-1">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { changeLang(l.code); setOpen(false); }}
                    className={`text-sm px-3 py-1.5 rounded-lg font-semibold border transition-smooth ${i18n.language === l.code ? "bg-gold text-gold-foreground border-gold" : "border-gold/30 text-primary-foreground/70 hover:text-gold"}`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
              <Button className="bg-gold-gradient text-gold-foreground font-semibold" asChild>
                <a href="#kontakt" onClick={() => setOpen(false)}>{t("nav.zapiszSieNaKurs")}</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center bg-hero overflow-hidden pt-32">
        <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-primary-foreground/90 tracking-wide">{t("hero.badge")}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] mb-6">
              {t("hero.h1_1")} <br />
              <span className="text-gradient-gold text-glow-gold">{t("hero.h1_2")}</span> <br />
              {t("hero.h1_3")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold text-base px-8 h-14 shadow-gold-soft hover:scale-105 transition-smooth" asChild>
                <a href="#kontakt">{t("hero.ctaPrimary")}</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground h-14 px-8" asChild>
                <a href="#kursy">{t("hero.ctaSecondary")}</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 text-primary-foreground/80">
              <div><div className="font-display text-3xl text-gold font-bold">1:1</div><div className="text-sm">{t("hero.stat1Label")}</div></div>
              <div><div className="font-display text-3xl text-gold font-bold">95%</div><div className="text-sm">{t("hero.stat2Label")}</div></div>
              <div><div className="font-display text-3xl text-gold font-bold">10+</div><div className="text-sm">{t("hero.stat3Label")}</div></div>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <img src={logo} alt="Logo eMKA" className="relative w-full max-w-lg mx-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* DLACZEGO */}
      <section id="dlaczego" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("reasons.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("reasons.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("reasons.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <Card key={i} className="group p-8 border-border hover:border-gold/50 transition-smooth hover:-translate-y-2 hover:shadow-elegant bg-card">
                  <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth shadow-gold-soft">
                    <Icon className="w-7 h-7 text-gold-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-3">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* O NAS */}
      <section id="o-nas" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-3xl rounded-full" />
        <div className="container relative grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-3xl" />
            <div className="relative bg-hero rounded-3xl p-12 shadow-elegant flex items-center justify-center aspect-square">
              <img src={logo} alt="eMKA Logo" className="w-full max-w-sm drop-shadow-2xl animate-pulse-glow rounded-full" />
            </div>
          </div>
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("about.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              {t("about.title1")} <span className="text-gradient-gold">{t("about.title2")}</span> {t("about.title3")}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">{t("about.p1")}</p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">{t("about.p2")}</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-deep transition-smooth" asChild>
              <a href="#kontakt">{t("about.cta")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* NASI INSTRUKTORZY */}
      <section id="instruktorzy" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("instructors.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("instructors.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("instructors.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {instructors.map((instr, i) => (
              <Card key={i} className="p-8 text-center border-border hover:border-gold/50 transition-smooth hover:-translate-y-2 hover:shadow-elegant bg-card">
                <div className="w-28 h-28 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6 shadow-gold-soft text-4xl font-display font-bold text-gold-foreground">
                  {instr.name[0]}
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-1">{instr.name}</h3>
                <div className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">{t("instructors.role")}</div>
                <a href={`tel:${instr.tel}`} className="inline-flex items-center gap-2 text-gold font-semibold hover:opacity-80 transition-smooth">
                  <Phone className="w-4 h-4" />
                  {instr.phone}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KURSY */}
      <section id="kursy" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("courses.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("courses.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {mainCourses.map((c, i) => {
              const Icon = mainCourseIcons[i];
              const featured = i === 0;
              return (
                <Card key={i} className={`p-8 transition-smooth hover:-translate-y-2 hover:shadow-elegant relative ${featured ? "border-gold border-2 bg-gradient-to-b from-gold/5 to-transparent" : "border-border bg-card"}`}>
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-gold-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-gold-soft">
                      {t("courses.popular")}
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 shadow-gold-soft">
                    <Icon className="w-6 h-6 text-gold-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">{c.name}</h3>
                  <div className="text-3xl font-display font-bold text-gradient-gold mb-6">{c.price}</div>
                  <ul className="space-y-3 mb-8">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-foreground/80">
                        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {c.payOnline ? (
                    <Button
                      className={`w-full ${featured ? "bg-gold-gradient text-gold-foreground hover:opacity-90" : "bg-primary text-primary-foreground hover:bg-primary-deep"} transition-smooth`}
                      onClick={() => setPayingCourse({ id: c.id, name: c.name, price: c.price, amount: c.amount })}
                    >
                      {t("payment.ctaButton")}
                    </Button>
                  ) : (
                    <Button className={`w-full ${featured ? "bg-gold-gradient text-gold-foreground hover:opacity-90" : "bg-primary text-primary-foreground hover:bg-primary-deep"} transition-smooth`} asChild>
                      <a href="#kontakt">{t("courses.cta")}</a>
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            {extraCourses.map((c, i) => {
              const Icon = extraCourseIcons[i];
              return (
                <Card key={i} className="p-8 border-border bg-card transition-smooth hover:-translate-y-2 hover:shadow-elegant hover:border-gold/50">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 shadow-gold-soft">
                    <Icon className="w-6 h-6 text-gold-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">{c.name}</h3>
                  <div className="text-3xl font-display font-bold text-gradient-gold mb-6">{c.price}</div>
                  <ul className="space-y-3 mb-8">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-foreground/80">
                        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {c.payOnline ? (
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary-deep transition-smooth"
                      onClick={() => setPayingCourse({ id: c.id, name: c.name, price: c.price, amount: c.amount, perHour: c.perHour })}
                    >
                      {t("payment.ctaButton")}
                    </Button>
                  ) : (
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-deep transition-smooth" asChild>
                      <a href="#kontakt">{t("courses.cta")}</a>
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
          <Card className="max-w-2xl mx-auto p-8 border-gold/40 bg-gradient-to-r from-gold/5 to-transparent text-center">
            <div className="font-display text-2xl font-bold text-primary mb-3">{t("courses.raty.title")}</div>
            <p className="text-foreground/80 leading-relaxed">
              {t("courses.raty.desc", { amount: t("courses.raty.amount"), hours: t("courses.raty.hours") })}
            </p>
          </Card>
        </div>
      </section>

      {/* FLOTA */}
      <section id="flota" className="py-24 md:py-32 bg-hero relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("fleet.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              {t("fleet.title1")} <span className="text-gradient-gold">{t("fleet.title2")}</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">{t("fleet.desc")}</p>
            <ul className="space-y-3 mb-8">
              {fleetItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="w-2 h-2 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <img src={cars} alt="Auta eMKA – wizualizacje brandingowe" className="relative rounded-3xl shadow-elegant w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* PROMOCJE */}
      <section id="promocje" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("promos.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("promos.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("promos.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {promos.map((p, i) => {
              const Icon = promoIcons[i];
              return (
                <Card key={i} className="p-8 border-gold/40 bg-gradient-to-b from-gold/5 to-transparent hover:border-gold hover:shadow-elegant transition-smooth hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-soft">
                      <Icon className="w-6 h-6 text-gold-foreground" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gold border border-gold/40 px-3 py-1 rounded-full">{p.badge}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-3">{p.title}</h3>
                  <p className="text-foreground/80 leading-relaxed mb-6">{p.desc}</p>
                  <Button className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold transition-smooth" asChild>
                    <a href="tel:790775049">{p.cta}</a>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section id="opinie" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("reviews.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("reviews.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Card key={i} className="p-8 hover:shadow-elegant transition-smooth hover:-translate-y-1 border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
                </div>
                <p className="text-foreground/80 italic leading-relaxed mb-6">„{r.text}"</p>
                <div className="font-semibold text-primary">{r.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("faq.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("faq.title")}</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-6 bg-background hover:border-gold/50 transition-smooth">
                <AccordionTrigger className="text-left font-display text-lg text-primary hover:text-gold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ZNAJDŹ NAS */}
      <section id="znajdz-nas" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("findUs.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{t("findUs.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("findUs.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {findUsLocations.map((loc, i) => (
              <Card key={i} className="overflow-hidden border-border hover:border-gold/50 transition-smooth hover:shadow-elegant">
                <div className="h-48 bg-muted">
                  <iframe
                    src={locations[i].mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={loc.name}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-display font-bold text-primary text-lg leading-tight">{loc.name}</div>
                      {loc.subtitle && <div className="text-xs text-muted-foreground mb-1">{loc.subtitle}</div>}
                      <div className="text-foreground/70 text-sm leading-relaxed whitespace-pre-line">{loc.address}</div>
                    </div>
                  </div>
                  <a
                    href={locations[i].mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold text-sm font-semibold hover:opacity-80 transition-smooth"
                  >
                    {t("findUs.openInMaps")} →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 md:py-32 bg-hero relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/15 blur-3xl rounded-full animate-pulse-glow" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">{t("contact.sectionLabel")}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{t("contact.title")}</h2>
            <p className="text-primary-foreground/80 text-lg">{t("contact.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { icon: Phone, label: t("contact.labelBiuro"), value: "790 775 049", href: "tel:790775049" },
              { icon: Phone, label: t("contact.labelTelefon"), value: "790 775 037", href: "tel:790775037" },
              { icon: Mail, label: t("contact.labelEmail"), value: "biuro@emka.edu.pl", href: "mailto:biuro@emka.edu.pl" },
              { icon: MapPin, label: t("contact.labelLokalizacja"), value: t("contact.lokalizacjaValue"), href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="group">
                <Card className="p-6 text-center bg-primary-foreground/5 backdrop-blur-md border-primary-foreground/10 hover:border-gold/50 hover:bg-primary-foreground/10 transition-smooth h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-smooth">
                    <c.icon className="w-6 h-6 text-gold-foreground" />
                  </div>
                  <div className="text-xs tracking-widest uppercase text-gold mb-2">{c.label}</div>
                  <div className="text-primary-foreground font-semibold text-sm">{c.value}</div>
                </Card>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold text-base px-10 h-14 shadow-gold-soft hover:scale-105 transition-smooth" asChild>
              <a href="tel:790775049">{t("contact.callNow")}</a>
            </Button>
            <a href="https://wa.me/48790775037" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 h-14 rounded-xl hover:bg-[#1ebe5d] transition-smooth shadow-lg text-base">
              <WhatsAppIcon />
              {t("contact.whatsapp")}
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/48790775037" target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-smooth">
        <WhatsAppIcon />
      </a>

      {/* BANER USTAWA KAMILKOWA */}
      <div className="bg-primary-deep border-t border-gold/20 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-gold/30 bg-gold/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold-soft">
                <Shield className="w-6 h-6 text-gold-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-primary-foreground text-lg">{t("kamilkaBanner.title")}</div>
                <div className="text-sm text-primary-foreground/70 mt-0.5">{t("kamilkaBanner.subtitle")}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowSOM(true)}
                className="border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground font-semibold">
                {t("kamilkaBanner.cta")}
              </Button>
              <a href="/standardy-ochrony-skrocona.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold/30 text-primary-foreground/70 hover:text-gold hover:border-gold/60 font-semibold px-4 py-2 rounded-lg text-sm transition-smooth">
                <FileText className="w-4 h-4" />
                PDF skrócony
              </a>
              <a href="/standardy-ochrony-pelna.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold/30 text-primary-foreground/70 hover:text-gold hover:border-gold/60 font-semibold px-4 py-2 rounded-lg text-sm transition-smooth">
                <FileText className="w-4 h-4" />
                PDF pełny
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-primary-deep text-primary-foreground/80 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="eMKA" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display text-lg text-gold font-bold">eMKA</div>
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-70">Ośrodek Szkolenia Kierowców</div>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/emka_osk", label: "eMKA na Instagramie" },
                { icon: Facebook, href: "https://www.facebook.com/share/1CjRuBAvUa/", label: "eMKA na Facebooku" },
                { icon: Music2, href: "https://www.tiktok.com/@emka.osk", label: "eMKA na TikToku" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-gold-foreground hover:border-gold transition-smooth"
                  aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm opacity-70 mb-2">© {new Date().getFullYear()} {t("footer.rights")}</div>
              <div className="flex items-center justify-center md:justify-end gap-3">
                <button onClick={() => setShowSOM(true)} className="text-xs text-gold/70 hover:text-gold underline transition-smooth cursor-pointer">
                  {t("footer.som")}
                </button>
                <Link to="/regulamin" className="text-xs text-gold/70 hover:text-gold underline transition-smooth">
                  Regulamin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
