import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Car, Users, Heart, Target, Award, Phone, Mail, MapPin, Instagram, Facebook, Music2, Menu, X, Check, Star, Sparkles, Gift, GraduationCap, Zap, Shield } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import logo from "@/assets/emka-logo.png";
import cars from "@/assets/emka-cars.jpg";

const nav = [
  { href: "#dlaczego", label: "Dlaczego my" },
  { href: "#o-nas", label: "O nas" },
  { href: "#instruktorzy", label: "Instruktorzy" },
  { href: "#kursy", label: "Kursy" },
  { href: "#flota", label: "Flota" },
  { href: "#promocje", label: "Promocje" },
  { href: "#opinie", label: "Opinie" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const reasons = [
  { icon: Car, title: "Auto 1:1 jak na egzaminie", desc: "Jeździsz tym samym modelem, na którym później zdajesz egzamin państwowy. Zero zaskoczeń." },
  { icon: Heart, title: "Przyjaźni instruktorzy", desc: "Cierpliwi, wyrozumiali i pełni pasji – uczą bez krzyku i presji." },
  { icon: Sparkles, title: "Luźna atmosfera", desc: "Bezstresowa nauka w komfortowych warunkach. Lubimy to, co robimy." },
  { icon: Target, title: "Indywidualne podejście", desc: "Tempo dopasowane do Ciebie. Każdy kursant traktowany jest wyjątkowo." },
  { icon: Award, title: "Wysoka zdawalność", desc: "Solidne przygotowanie, sprawdzone metody, realne efekty." },
  { icon: Users, title: "Społeczność eMKA", desc: "Setki zadowolonych kierowców rocznie. Dołącz do grona zdających." },
];

const instructors = [
  { name: "Marcin", phone: "796 330 063", tel: "796330063", initial: "M" },
  { name: "Krzysztof", phone: "790 775 037", tel: "790775037", initial: "K" },
  { name: "Marianna", phone: "790 775 049", tel: "790775049", initial: "M" },
];

const mainCourses = [
  {
    name: "Kurs e‑learningowy",
    price: "4 000 zł",
    icon: GraduationCap,
    features: ["30h teorii online (e‑learning)", "30h jazd praktycznych", "Platforma e‑learningowa 24/7", "Materiały i testy online", "Egzamin wewnętrzny"],
    featured: true,
  },
  {
    name: "Kurs stacjonarny",
    price: "4 500 zł",
    icon: Users,
    features: ["30h teorii w sali", "30h jazd praktycznych", "Dostęp do platformy e‑learningowej", "Materiały i testy online", "Egzamin wewnętrzny"],
    featured: false,
  },
  {
    name: "Kurs ekspresowy",
    price: "4 900 zł",
    icon: Zap,
    features: ["Intensywny tryb nauki", "Krótszy termin realizacji", "Dostęp do platformy e‑learningowej", "Indywidualny plan jazd", "Priorytetowe godziny"],
    featured: false,
  },
];

const extraCourses = [
  {
    name: "Jazdy doszkalające",
    price: "150 zł / h",
    icon: Car,
    features: ["Auto egzaminacyjne", "Plac manewrowy", "Trasy egzaminacyjne", "Dla osób z prawem jazdy"],
  },
  {
    name: "Kurs – skrzynia automatyczna",
    price: "4 800 zł",
    icon: Award,
    features: ["Pełny kurs kat. B", "Auto z automatyczną skrzynią biegów", "Podstawiamy auto z automatem", "Dostęp do platformy e‑learningowej", "Egzamin wewnętrzny"],
  },
];

const promos = [
  {
    icon: Sparkles,
    badge: "Do końca maja",
    title: "Kurs ekspresowy w cenie normalnego",
    desc: "Zapisz się do końca maja i jedź na kursie ekspresowym, płacąc tyle co za kurs stacjonarny. Zadzwoń i potwierdź termin – ilość miejsc ograniczona.",
    cta: "Zadzwoń i skorzystaj",
    href: "tel:790775049",
  },
  {
    icon: Gift,
    badge: "Cały rok",
    title: "System poleceń – rabat dla Ciebie i kolegi",
    desc: "Przyprowadź znajomego do eMKA – oboje dostaniecie rabat na kurs. Zadzwoń, żeby dowiedzieć się więcej o warunkach i wysokości rabatu.",
    cta: "Dowiedz się więcej",
    href: "tel:790775049",
  },
];

const reviews = [
  { name: "Aleksandra K.", text: "Świetna atmosfera, zero stresu i zdałam za pierwszym razem! Polecam każdemu.", stars: 5 },
  { name: "Michał W.", text: "Instruktor mega cierpliwy, wszystko tłumaczy na spokojnie. Najlepsza decyzja.", stars: 5 },
  { name: "Patrycja N.", text: "Profesjonalnie, miło i skutecznie. Auto identyczne jak na egzaminie – ogromny plus.", stars: 5 },
];

const faqs = [
  { q: "Ile trwa cały kurs prawa jazdy kat. B?", a: "Standardowo 6–10 tygodni, w zależności od dostępności kursanta. Mamy też tryb ekspresowy – skróć czas do minimum." },
  { q: "Czy mogę jeździć tym samym autem na egzaminie?", a: "Tak! Nasza flota to auta identyczne z egzaminacyjnymi WORD Poznań – uczysz się tam, gdzie zdajesz." },
  { q: "Jak wygląda płatność za kurs?", a: "Oferujemy raty 0% – pierwsza wpłata to 1 000 zł przy zapisie. Każda kolejna rata ustalana jest indywidualnie po ukończeniu każdych 10 godzin jazdy." },
  { q: "Od jakiego wieku mogę zacząć kurs?", a: "Kurs możesz rozpocząć 3 miesiące przed 18. urodzinami. Osoby w wieku 16 lat i 9 miesięcy mogą zacząć naukę za zgodą rodzica lub opiekuna prawnego." },
  { q: "Czy oferujecie kurs na skrzynię automatyczną?", a: "Tak! Posiadamy auto z automatyczną skrzynią biegów – podstawiamy je dla chętnych. Kurs na automat kosztuje 4 800 zł." },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTeenModal, setShowTeenModal] = useState(false);
  const [showSOM, setShowSOM] = useState(false);

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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* POPUP 17-LATKI */}
      <Dialog open={showTeenModal} onOpenChange={(v) => { if (!v) closeTeenModal(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Masz 16 lat i 9 miesięcy?</DialogTitle>
            <DialogDescription className="text-foreground/80 leading-relaxed pt-2">
              Nie musisz czekać do 18. urodzin! Możesz rozpocząć naukę jazdy już w wieku{" "}
              <strong>16 lat i 9 miesięcy</strong> — wystarczy zgoda rodzica lub opiekuna prawnego.
              <br /><br />
              Zadzwoń do nas i umów się na start kursu jeszcze przed swoimi 18. urodzinami.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button className="bg-gold-gradient text-gold-foreground font-semibold" asChild>
              <a href="tel:790775049">Zadzwoń teraz</a>
            </Button>
            <Button variant="outline" onClick={closeTeenModal}>Zamknij</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG STANDARDY OCHRONY MAŁOLETNICH */}
      <Dialog open={showSOM} onOpenChange={setShowSOM}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">Standardy ochrony małoletnich</DialogTitle>
          </DialogHeader>
          <div className="text-foreground/80 leading-relaxed space-y-3 text-sm">
            <p>
              Ośrodek Szkolenia Kierowców <strong>eMKA</strong> w Poznaniu wdrożył Standardy Ochrony Małoletnich
              zgodnie z ustawą z dnia 28 lipca 2023 r. o zmianie ustawy – Kodeks rodzinny i opiekuńczy
              oraz niektórych innych ustaw (tzw. ustawa Kamilkowa).
            </p>
            <p>Nasze standardy obejmują m.in.:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Weryfikację pracowników i instruktorów pod kątem niekaralności</li>
              <li>Procedury reagowania na sygnały krzywdzenia małoletnich</li>
              <li>Zasady bezpiecznego kontaktu z kursantami nieletnimi</li>
              <li>Wyznaczenie osoby odpowiedzialnej za ochronę małoletnich w ośrodku</li>
            </ul>
            <p>
              Pełny dokument standardów dostępny jest w biurze ośrodka oraz na życzenie
              przesyłany drogą mailową. W razie pytań: <strong>biuro@emka.edu.pl</strong>
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowSOM(false)} className="mt-2">Zamknij</Button>
        </DialogContent>
      </Dialog>

      {/* PROMO BANNER */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-gold-gradient text-gold-foreground text-center py-2 px-4 text-sm font-semibold">
        Promocja dla zapisanych do końca maja!{" "}
        <a href="tel:790775049" className="underline font-bold ml-1">Zadzwoń i dowiedz się więcej →</a>
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
          <Button variant="default" className="hidden lg:inline-flex bg-gold-gradient text-gold-foreground hover:opacity-90 hover:shadow-gold-soft transition-smooth font-semibold" asChild>
            <a href="#kontakt">Zapisz się</a>
          </Button>
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
              <Button className="bg-gold-gradient text-gold-foreground font-semibold" asChild>
                <a href="#kontakt" onClick={() => setOpen(false)}>Zapisz się na kurs</a>
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
              <span className="text-sm text-primary-foreground/90 tracking-wide">Ośrodek Szkolenia Kierowców · Poznań</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] mb-6">
              Zdaj prawo jazdy <br />
              <span className="text-gradient-gold text-glow-gold">w Poznaniu</span> <br />
              bez stresu
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed">
              Szkolimy skutecznie, w przyjaznej atmosferze – krok po kroku do Twojego prawa jazdy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold text-base px-8 h-14 shadow-gold-soft hover:scale-105 transition-smooth" asChild>
                <a href="#kontakt">Zapisz się na kurs</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground h-14 px-8" asChild>
                <a href="#kursy">Zobacz ofertę</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 text-primary-foreground/80">
              <div><div className="font-display text-3xl text-gold font-bold">1:1</div><div className="text-sm">Auto egzaminacyjne</div></div>
              <div><div className="font-display text-3xl text-gold font-bold">95%</div><div className="text-sm">Zdawalność</div></div>
              <div><div className="font-display text-3xl text-gold font-bold">10+</div><div className="text-sm">Lat doświadczenia</div></div>
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
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Dlaczego eMKA</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Wybierz spokój i skuteczność</h2>
            <p className="text-muted-foreground text-lg">Wszystko, czego potrzebujesz, by pewnie zdać i pewnie jeździć.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <Card key={i} className="group p-8 border-border hover:border-gold/50 transition-smooth hover:-translate-y-2 hover:shadow-elegant bg-card">
                <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth shadow-gold-soft">
                  <r.icon className="w-7 h-7 text-gold-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
              </Card>
            ))}
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
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">O nas</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Spokój. <span className="text-gradient-gold">Jakość.</span> Skuteczność.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              eMKA to szkoła jazdy w Poznaniu, która stawia na jakość, spokój i skuteczność. Uczymy nie tylko zdać egzamin, ale przede wszystkim dobrze i pewnie jeździć na co dzień.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Nasi instruktorzy to doświadczeni profesjonaliści z ludzkim podejściem.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-deep transition-smooth" asChild>
              <a href="#kontakt">Porozmawiajmy</a>
            </Button>
          </div>
        </div>
      </section>

      {/* NASI INSTRUKTORZY */}
      <section id="instruktorzy" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Zespół</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Nasi instruktorzy</h2>
            <p className="text-muted-foreground text-lg">Poznaj ludzi, którzy przeprowadzą Cię przez kurs bezpiecznie i bez stresu.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {instructors.map((instr, i) => (
              <Card key={i} className="p-8 text-center border-border hover:border-gold/50 transition-smooth hover:-translate-y-2 hover:shadow-elegant bg-card">
                <div className="w-28 h-28 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6 shadow-gold-soft text-4xl font-display font-bold text-gold-foreground">
                  {instr.initial}
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-1">{instr.name}</h3>
                <div className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">Instruktor jazdy</div>
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
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Oferta</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Kursy dopasowane do Ciebie</h2>
            <p className="text-muted-foreground text-lg">Wybierz najlepszą opcję i ruszaj na drogę.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {mainCourses.map((c, i) => (
              <Card key={i} className={`p-8 transition-smooth hover:-translate-y-2 hover:shadow-elegant relative ${c.featured ? "border-gold border-2 bg-gradient-to-b from-gold/5 to-transparent" : "border-border bg-card"}`}>
                {c.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-gold-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-gold-soft">
                    Najpopularniejszy
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 shadow-gold-soft">
                  <c.icon className="w-6 h-6 text-gold-foreground" />
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
                <Button className={`w-full ${c.featured ? "bg-gold-gradient text-gold-foreground hover:opacity-90" : "bg-primary text-primary-foreground hover:bg-primary-deep"} transition-smooth`} asChild>
                  <a href="#kontakt">Wybieram</a>
                </Button>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            {extraCourses.map((c, i) => (
              <Card key={i} className="p-8 border-border bg-card transition-smooth hover:-translate-y-2 hover:shadow-elegant hover:border-gold/50">
                <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 shadow-gold-soft">
                  <c.icon className="w-6 h-6 text-gold-foreground" />
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
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-deep transition-smooth" asChild>
                  <a href="#kontakt">Wybieram</a>
                </Button>
              </Card>
            ))}
          </div>

          {/* RATY 0% */}
          <Card className="max-w-2xl mx-auto p-8 border-gold/40 bg-gradient-to-r from-gold/5 to-transparent text-center">
            <div className="font-display text-2xl font-bold text-primary mb-3">Raty 0% – bez stresu finansowego</div>
            <p className="text-foreground/80 leading-relaxed">
              Pierwsza wpłata to tylko <strong className="text-primary">1 000 zł</strong> przy zapisie.
              Każda kolejna rata ustalana jest indywidualnie —{" "}
              <strong className="text-primary">po ukończeniu każdych 10 godzin jazdy</strong>.
              Żadnych ukrytych kosztów, żadnego pośpiechu.
            </p>
          </Card>
        </div>
      </section>

      {/* FLOTA */}
      <section id="flota" className="py-24 md:py-32 bg-hero relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Flota</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Uczysz się i zdajesz na <span className="text-gradient-gold">identycznym aucie</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Zero zaskoczeń na egzaminie. Pełna znajomość gabarytów, sprzęgła i lusterek. Pewność, którą czuć od pierwszej minuty za kierownicą.
            </p>
            <ul className="space-y-3 mb-8">
              {["Auta identyczne z egzaminacyjnymi WORD Poznań", "Pełen serwis i bezpieczeństwo", "Klimatyzacja i wygodne wnętrze"].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="w-2 h-2 rounded-full bg-gold" /> {t}
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
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Promocje</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Aktualne oferty specjalne</h2>
            <p className="text-muted-foreground text-lg">Skorzystaj z okazji – ilość miejsc ograniczona.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {promos.map((p, i) => (
              <Card key={i} className="p-8 border-gold/40 bg-gradient-to-b from-gold/5 to-transparent hover:border-gold hover:shadow-elegant transition-smooth hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-soft">
                    <p.icon className="w-6 h-6 text-gold-foreground" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gold border border-gold/40 px-3 py-1 rounded-full">{p.badge}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-3">{p.title}</h3>
                <p className="text-foreground/80 leading-relaxed mb-6">{p.desc}</p>
                <Button className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold transition-smooth" asChild>
                  <a href={p.href}>{p.cta}</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section id="opinie" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Opinie kursantów</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Mówią o nas najlepiej</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Card key={i} className="p-8 hover:shadow-elegant transition-smooth hover:-translate-y-1 border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
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
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">FAQ</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Najczęstsze pytania</h2>
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

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 md:py-32 bg-hero relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/15 blur-3xl rounded-full animate-pulse-glow" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Kontakt</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Zacznij swoją drogę dziś</h2>
            <p className="text-primary-foreground/80 text-lg">Zapisz się na kurs lub umów konsultację – odpowiadamy szybko.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { icon: Phone, label: "Biuro", value: "790 775 049", href: "tel:790775049" },
              { icon: Phone, label: "Telefon", value: "790 775 037", href: "tel:790775037" },
              { icon: Mail, label: "Email", value: "biuro@emka.edu.pl", href: "mailto:biuro@emka.edu.pl" },
              { icon: MapPin, label: "Lokalizacja", value: "Poznań", href: "#" },
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
              <a href="tel:790775049">Zadzwoń teraz</a>
            </Button>
            <a
              href="https://wa.me/48790775049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 h-14 rounded-xl hover:bg-[#1ebe5d] transition-smooth shadow-lg text-base"
            >
              <WhatsAppIcon />
              Napisz na WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/48790775049"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Napisz na WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-smooth"
      >
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
                <div className="font-display font-bold text-primary-foreground text-lg">Standardy ochrony małoletnich</div>
                <div className="text-sm text-primary-foreground/70 mt-0.5">eMKA wdrożyła standardy zgodnie z ustawą Kamilkową (ustawa z 28.07.2023 r.)</div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowSOM(true)}
              className="border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground flex-shrink-0 font-semibold"
            >
              Czytaj więcej
            </Button>
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
                { icon: Music2, href: "https://www.tiktok.com/@emka.osk1", label: "eMKA na TikToku" },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-gold-foreground hover:border-gold transition-smooth" aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm opacity-70 mb-2">© {new Date().getFullYear()} eMKA Poznań. Wszelkie prawa zastrzeżone.</div>
              <button onClick={() => setShowSOM(true)} className="text-xs text-gold/70 hover:text-gold underline transition-smooth cursor-pointer">
                Standardy ochrony małoletnich
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
