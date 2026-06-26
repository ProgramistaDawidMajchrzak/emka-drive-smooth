import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Regulamin = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-smooth mb-8">
          <ArrowLeft className="w-4 h-4" /> Wróć na stronę główną
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8">Regulamin świadczenia usług</h1>

        <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">1. Dane Usługodawcy</h2>
            <p>
              Usługodawcą jest <strong>OSK eMKA Marianna Kalicka-Antoszkiewicz</strong>, z siedzibą przy ul. Dąbrowskiego 143,
              60-577 Poznań, NIP: 7812109311, REGON: 544535524 (dalej: „Usługodawca" lub „eMKA").
            </p>
            <p>
              Kontakt: e-mail <a href="mailto:biuro@emka.edu.pl" className="text-gold underline">biuro@emka.edu.pl</a>,
              telefon <a href="tel:790775037" className="text-gold underline">790 775 037</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">2. Przedmiot regulaminu</h2>
            <p>
              Regulamin określa zasady korzystania ze strony internetowej emka.edu.pl, zapisów na kursy prawa jazdy
              kategorii B oraz jazdy doszkalające, a także zasady dokonywania płatności online za te usługi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">3. Zapisy na kursy</h2>
            <p>
              Zapisu na kurs można dokonać telefonicznie, mailowo, osobiście w biurze Usługodawcy lub poprzez formularz
              płatności online dostępny na stronie. Zawarcie umowy o przeprowadzenie kursu następuje po potwierdzeniu
              zapisu przez Usługodawcę.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">4. Płatności online</h2>
            <p>
              Płatności elektroniczne i kartą płatniczą za kursy oraz jazdy doszkalające przeprowadzane są za
              pośrednictwem serwisu płatności internetowych PayU S.A., z siedzibą w Poznaniu, ul. Grunwaldzka 186,
              60-166 Poznań (NIP: 7791452724), wpisanego do rejestru krajowych instytucji płatniczych prowadzonego
              przez Komisję Nadzoru Finansowego.
            </p>
            <p>
              W zależności od dostępnych metod płatności kursant może zapłacić jednorazowo (przelew, BLIK, karta
              płatnicza) lub – jeśli ta opcja jest dostępna – w ratach PayU. Decyzję o udzieleniu raty oraz jej
              warunkach podejmuje wyłącznie PayU S.A. lub współpracujący z nim podmiot finansujący; Usługodawca nie
              jest stroną umowy kredytu/pożyczki zawieranej w związku z ratami.
            </p>
            <p>Ceny kursów podane na stronie są cenami brutto, wyrażonymi w złotych polskich (PLN).</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">5. Reklamacje</h2>
            <p>
              Reklamacje dotyczące usług świadczonych przez Usługodawcę należy zgłaszać na adres
              biuro@emka.edu.pl lub osobiście w biurze. Reklamacje dotyczące samej płatności (np. nieprawidłowe
              obciążenie) rozpatrywane są zgodnie z regulaminem PayU S.A. Usługodawca rozpatruje reklamacje w
              terminie 14 dni od ich otrzymania.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">6. Ochrona danych osobowych</h2>
            <p>
              Dane osobowe podane przy zapisie na kurs lub w formularzu płatności przetwarzane są przez Usługodawcę
              w celu realizacji usługi oraz, w zakresie niezbędnym do przeprowadzenia płatności, przekazywane do
              PayU S.A. jako odrębnego administratora danych. Szczegóły przetwarzania danych przez PayU dostępne są
              w regulaminie i polityce prywatności PayU S.A.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary mb-2">7. Postanowienia końcowe</h2>
            <p>
              W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego, w
              szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta. Usługodawca zastrzega sobie prawo do
              zmiany regulaminu; zmiany wchodzą w życie z dniem publikacji na stronie.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Regulamin;
