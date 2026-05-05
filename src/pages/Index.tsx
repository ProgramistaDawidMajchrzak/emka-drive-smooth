import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Car, Users, Heart, Target, Award, Phone, Mail, MapPin, Instagram, Facebook, Music2, Menu, X, Check, Star, Sparkles } from "lucide-react";
import logo from "@/assets/emka-logo.png";
import cars from "@/assets/emka-cars.jpg";

const nav = [
  { href: "#dlaczego", label: "Dlaczego my" },
  { href: "#o-nas", label: "O nas" },
  { href: "#kursy", label: "Kursy" },
  { href: "#flota", label: "Flota" },
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
  { icon: Users, title: "Społeczność EMKA", desc: "Setki zadowolonych kierowców rocznie. Dołącz do grona zdających." },
];

const courses = [
  { name: "Kurs prawa jazdy kat. B", price: "od 3 200 zł", features: ["30h teorii", "30h jazd praktycznych", "Materiały online", "Egzamin wewnętrzny"], featured: true },
  { name: "Jazdy doszkalające", price: "120 zł / h", features: ["Auto egzaminacyjne", "Plac manewrowy", "Trasy egzaminacyjne", "Dla osób z prawem jazdy"] },
  { name: "Kurs ekspresowy", price: "od 3 800 zł", features: ["Intensywny tryb", "Krótszy termin", "Indywidualny plan", "Priorytetowe godziny"] },
];

const reviews = [
  { name: "Aleksandra K.", text: "Świetna atmosfera, zero stresu i zdałam za pierwszym razem! Polecam każdemu.", stars: 5 },
  { name: "Michał W.", text: "Instruktor mega cierpliwy, wszystko tłumaczy na spokojnie. Najlepsza decyzja.", stars: 5 },
  { name: "Patrycja N.", text: "Profesjonalnie, miło i skutecznie. Auto identyczne jak na egzaminie – ogromny plus.", stars: 5 },
];

const faqs = [
  { q: "Ile trwa cały kurs prawa jazdy kat. B?", a: "Standardowo 6–10 tygodni, w zależności od dostępności kursanta. Mamy też tryb ekspresowy." },
  { q: "Czy mogę jeździć tym samym autem na egzaminie?", a: "Tak! Nasza flota to auta identyczne z egzaminacyjnymi WORD Poznań – uczysz się tam, gdzie zdajesz." },
  { q: "Jak wygląda płatność za kurs?", a: "Możliwość rozłożenia na wygodne raty 0%. Szczegóły ustalamy indywidualnie." },
  { q: "Od jakiego wieku mogę zacząć kurs?", a: "Kurs możesz rozpocząć 3 miesiące przed 18. urodzinami." },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-smooth ${scrolled ? "bg-primary-deep/95 backdrop-blur-lg shadow-elegant" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="EMKA – Ośrodek Szkolenia Kierowców" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-xl text-gold font-bold">EMKA</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">Ośrodek Szkolenia Kierowców</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
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
      <section id="top" className="relative min-h-screen flex items-center bg-hero overflow-hidden pt-20">
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
            <img src={logo} alt="Logo EMKA" className="relative w-full max-w-lg mx-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* DLACZEGO */}
      <section id="dlaczego" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Dlaczego EMKA</div>
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
              <img src={logo} alt="EMKA Logo" className="w-full max-w-sm drop-shadow-2xl animate-pulse-glow rounded-full" />
            </div>
          </div>
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">O nas</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Spokój. <span className="text-gradient-gold">Jakość.</span> Skuteczność.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              EMKA to szkoła jazdy w Poznaniu, która stawia na jakość, spokój i skuteczność. Uczymy nie tylko zdać egzamin, ale przede wszystkim dobrze i pewnie jeździć na co dzień.
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

      {/* KURSY */}
      <section id="kursy" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4">Oferta</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Kursy dopasowane do Ciebie</h2>
            <p className="text-muted-foreground text-lg">Wybierz najlepszą opcję i ruszaj na drogę.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((c, i) => (
              <Card key={i} className={`p-8 transition-smooth hover:-translate-y-2 hover:shadow-elegant relative ${c.featured ? "border-gold border-2 bg-gradient-to-b from-gold/5 to-transparent" : "border-border"}`}>
                {c.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-gold-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-gold-soft">
                    Najpopularniejszy
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-primary mb-3">{c.name}</h3>
                <div className="text-4xl font-display font-bold text-gradient-gold mb-6">{c.price}</div>
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
              {["Auta identyczne z egzaminacyjnymi WORD Poznań", "Pełen serwis i bezpieczeństwo", "Klimatyzacja i komfortowe wnętrze"].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="w-2 h-2 rounded-full bg-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <img src={cars} alt="Auta EMKA – wizualizacje brandingowe" className="relative rounded-3xl shadow-elegant w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section id="opinie" className="py-24 md:py-32 bg-background">
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
      <section id="faq" className="py-24 md:py-32 bg-secondary">
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
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Phone, label: "Telefon", value: "601 234 567", href: "tel:601234567" },
              { icon: Mail, label: "Email", value: "kontakt@emka-poznan.pl", href: "mailto:kontakt@emka-poznan.pl" },
              { icon: MapPin, label: "Lokalizacja", value: "Poznań", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="group">
                <Card className="p-8 text-center bg-primary-foreground/5 backdrop-blur-md border-primary-foreground/10 hover:border-gold/50 hover:bg-primary-foreground/10 transition-smooth h-full">
                  <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <c.icon className="w-7 h-7 text-gold-foreground" />
                  </div>
                  <div className="text-xs tracking-widest uppercase text-gold mb-2">{c.label}</div>
                  <div className="text-primary-foreground font-semibold">{c.value}</div>
                </Card>
              </a>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 font-semibold text-base px-10 h-14 shadow-gold-soft hover:scale-105 transition-smooth" asChild>
              <a href="tel:601234567">Zadzwoń teraz</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary-deep text-primary-foreground/80 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EMKA" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display text-lg text-gold font-bold">EMKA</div>
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-70">Ośrodek Szkolenia Kierowców</div>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#", label: "EMKA na Instagramie" },
                { icon: Facebook, href: "#", label: "EMKA na Facebooku" },
                { icon: Music2, href: "#", label: "EMKA na TikToku" },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-gold-foreground hover:border-gold transition-smooth" aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-sm opacity-70">© {new Date().getFullYear()} EMKA Poznań. Wszelkie prawa zastrzeżone.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
