import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import heroImage from "@/assets/hero-excavator.jpg";
import aboutImage from "@/assets/about-site.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M Schakt i Kalmar AB — Mark- och grundarbeten i Kalmar län" },
      {
        name: "description",
        content:
          "M Schakt i Kalmar AB utför schaktning, markentreprenad, transport och fjärrtransporter i Kalmar län. Lokalt företag med säte i Vassmolösa sedan 2017.",
      },
      { name: "keywords", content: "schaktning Kalmar, markentreprenad Kalmar län, mark- och grundarbeten, schakt Vassmolösa, entreprenad Kalmar" },
      { property: "og:title", content: "M Schakt i Kalmar AB — Mark- och grundarbeten i Kalmar län" },
      {
        property: "og:description",
        content: "Schaktning, markentreprenad och transport i Kalmar län. Lokal förankring i Vassmolösa.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "M Schakt i Kalmar AB",
          image: "/og.jpg",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mortorp 110",
            postalCode: "388 91",
            addressLocality: "Vassmolösa",
            addressRegion: "Kalmar län",
            addressCountry: "SE",
          },
          telephone: "+46738375742",
          areaServed: "Kalmar län",
          foundingDate: "2017",
        }),
      },
    ],
  }),
  component: Index,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2 font-display">
          <span className={`inline-block h-2 w-2 rounded-full bg-primary`} />
          <span className={`text-sm font-bold tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            M SCHAKT <span className="font-normal opacity-70">/ Kalmar</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Om oss", "#om"],
            ["Tjänster", "#tjanster"],
            ["Varför oss", "#varfor"],
            ["Kontakt", "#kontakt"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="tel:+46738375742"
          className={`hidden items-center gap-2 rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all md:inline-flex ${
            scrolled
              ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
              : "border-white text-white hover:bg-white hover:text-foreground"
          }`}
        >
          073-837 57 42
        </a>
        <a
          href="#kontakt"
          className={`inline-flex items-center rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] md:hidden ${
            scrolled ? "bg-foreground text-background" : "bg-white text-foreground"
          }`}
        >
          Kontakt
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-foreground">
      <img
        src={heroImage}
        alt="Grävmaskin i arbete vid skymning"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="hero-vignette absolute inset-0" />

      {/* Top thin rule */}
      <div className="absolute left-0 right-0 top-20 hidden border-t border-white/15 md:block" />

      <div className="container-x relative z-10 flex h-full flex-col justify-between pb-12 pt-32 text-white md:pb-20 md:pt-40">
        <div className="grid max-w-6xl grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-1">
            <p className="eyebrow !text-white/70">01 / Mark</p>
          </div>
          <div className="col-span-12 md:col-span-11">
            <h1 className="display-xl">
              Mark- och grund&shy;arbeten
              <br />
              i <span className="text-primary">Kalmar län</span>.
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
              Sedan 2017 utför vi schaktning, entreprenad och transport med
              precision och lokal förankring i Vassmolösa. Ett mindre lag —
              med stora maskiner och korta beslutsvägar.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Begär offert
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="tel:+46738375742"
              className="inline-flex items-center gap-3 border border-white/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-foreground"
            >
              073-837 57 42
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 text-white md:gap-12">
            <Stat n="2017" label="Grundat" />
            <Stat n="Kalmar" label="Län" />
            <Stat n="100%" label="Lokalt" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold tracking-tight md:text-3xl">{n}</div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
        {label}
      </div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Schaktning",
    "Markentreprenad",
    "Grundarbeten",
    "Transport",
    "Fjärrtransporter",
    "Ledningsarbeten",
  ];
  return (
    <div className="rule-top border-b border-border bg-background py-5 overflow-hidden">
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          >
            {t}
            <span className="text-primary">●</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="om" className="relative py-24 md:py-36">
      <div className="container-x grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow">02 / Om oss</p>
          <h2 className="display-lg mt-6">
            Lokalt hantverk.
            <br />
            <span className="text-muted-foreground">Industriell precision.</span>
          </h2>
        </div>
        <div ref={ref} className="col-span-12 space-y-6 text-base leading-relaxed md:col-span-6 md:col-start-7 md:text-lg">
          <p>
            M Schakt i Kalmar AB grundades 2017 och har sitt säte i
            Vassmolösa. Vi är ett mindre, personligt företag med tre
            anställda som värdesätter kvalitet, noggrannhet och pålitlighet
            i varje projekt vi tar oss an.
          </p>
          <p className="text-muted-foreground">
            Vår lokala förankring i Kalmar län innebär god kännedom om
            regionens mark- och väderförhållanden — och förmågan att
            leverera även när förutsättningarna ändras.
          </p>
          <dl className="rule-top grid grid-cols-2 gap-y-6 pt-8">
            <Meta k="Säte" v="Vassmolösa, Kalmar län" />
            <Meta k="Grundat" v="2017" />
            <Meta k="Team" v="3 anställda" />
            <Meta k="Område" v="Hela Kalmar län" />
          </dl>
        </div>
      </div>

      <div className="container-x mt-20">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-foreground">
          <img
            src={aboutImage}
            alt="Grävmaskiner i arbete på en byggarbetsplats"
            width={1280}
            height={1280}
            loading="lazy"
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {k}
      </dt>
      <dd className="mt-1 font-display font-semibold">{v}</dd>
    </div>
  );
}

function Services() {
  const services = [
    {
      num: "01",
      title: "Entreprenad",
      desc: "Helhetslösningar för bygg- och anläggningsprojekt — från planering och kalkyl till färdigställande.",
    },
    {
      num: "02",
      title: "Schaktning",
      desc: "Mark- och grundarbeten, schaktning för grunder, ledningar och anläggningar i alla skalor.",
    },
    {
      num: "03",
      title: "Transport",
      desc: "Transport av massor, material och maskiner till och från byggarbetsplatser i Kalmar län.",
    },
    {
      num: "04",
      title: "Fjärrtransporter",
      desc: "Transportlösningar över längre sträckor för material och utrustning — säkert och i tid.",
    },
  ];
  return (
    <section id="tjanster" className="rule-top bg-foreground py-24 text-background md:py-36">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow !text-background/60">03 / Tjänster</p>
            <h2 className="display-lg mt-6 text-background">
              Vad vi <span className="text-primary">utför</span>.
            </h2>
          </div>
          <p className="col-span-12 max-w-md self-end text-base text-background/70 md:col-span-5 md:col-start-8">
            Fyra kärnverksamheter, levererade med samma omsorg och
            disciplin oavsett projektstorlek.
          </p>
        </div>

        <ol className="mt-16 border-t border-background/15">
          {services.map((s) => (
            <li
              key={s.num}
              className="group grid grid-cols-12 gap-4 border-b border-background/15 py-10 transition-colors hover:bg-background/[0.04] md:py-12"
            >
              <div className="col-span-2 font-display text-xs font-semibold tracking-widest text-background/40 md:col-span-1">
                {s.num}
              </div>
              <h3 className="col-span-10 font-display text-3xl font-bold tracking-tight md:col-span-5 md:text-5xl">
                {s.title}
              </h3>
              <p className="col-span-12 mt-3 max-w-md text-background/70 md:col-span-5 md:col-start-7 md:mt-0">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { k: "Personlig service", v: "Korta beslutsvägar och en kontaktperson genom hela projektet." },
    { k: "Modern maskinpark", v: "Välunderhållna maskiner och erfaren personal i varje projekt." },
    { k: "Lokal expertis", v: "Djup kännedom om Kalmar läns mark- och väderförhållanden." },
    { k: "Pålitliga leveranser", v: "Hög kvalitet, säker arbetsmiljö och leverans enligt plan." },
  ];
  return (
    <section id="varfor" className="rule-top py-24 md:py-36">
      <div className="container-x grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow">04 / Värdegrund</p>
          <h2 className="display-lg mt-6">
            Varför
            <br />
            <span className="text-primary">M Schakt</span>.
          </h2>
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-px bg-border md:col-span-8 md:grid-cols-2">
          {points.map((p, i) => (
            <div key={i} className="bg-background p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className="mt-2 inline-block h-1.5 w-6 bg-primary" />
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{p.k}</h3>
                  <p className="mt-3 text-muted-foreground">{p.v}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`Namn: ${name}\nE-post: ${email}\n\n${message}`);
    window.location.href = `mailto:info@mschakt.se?subject=${encodeURIComponent("Offertförfrågan")}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="kontakt" className="rule-top bg-foreground py-24 text-background md:py-36">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow !text-background/60">05 / Kontakt</p>
            <h2 className="display-lg mt-6 text-background">
              Låt oss bygga
              <br />
              <span className="text-primary">tillsammans</span>.
            </h2>
            <p className="mt-8 max-w-md text-background/70">
              Ring oss direkt eller skicka en offertförfrågan — vi
              återkommer alltid med ett tydligt besked.
            </p>

            <dl className="mt-12 space-y-6">
              <ContactRow k="Telefon" v="073-837 57 42" href="tel:+46738375742" />
              <ContactRow k="Adress" v="Mortorp 110, 388 91 Vassmolösa" />
              <ContactRow k="Region" v="Kalmar län, Sverige" />
            </dl>
          </div>

          <form
            onSubmit={onSubmit}
            className="col-span-12 space-y-6 border border-background/15 p-8 md:col-span-6 md:col-start-7 md:p-10"
          >
            <Field label="Namn" name="name" required />
            <Field label="E-post" name="email" type="email" required />
            <Field label="Meddelande" name="message" as="textarea" required />
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-between bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {sent ? "Skickat ✓" : "Skicka förfrågan"}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>

        <div className="mt-20 overflow-hidden border border-background/15">
          <iframe
            title="Karta Mortorp Vassmolösa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=16.30%2C56.51%2C16.50%2C56.61&layer=mapnik&marker=56.5638%2C16.4039"
            className="block h-[360px] w-full grayscale invert"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ k, v, href }: { k: string; v: string; href?: string }) {
  const inner = (
    <>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/50">{k}</dt>
      <dd className="mt-1 font-display text-xl font-semibold">{v}</dd>
    </>
  );
  return (
    <div className="rule-top border-background/15 pt-6">
      {href ? (
        <a href={href} className="block transition-colors hover:text-primary">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea";
}) {
  const cls =
    "mt-2 w-full border-b border-background/30 bg-transparent py-3 text-base text-background placeholder-background/30 outline-none transition-colors focus:border-primary";
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/50">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : (
        <input type={type} name={name} required={required} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="rule-top bg-background py-12">
      <div className="container-x grid grid-cols-12 gap-6 text-sm">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            M SCHAKT I KALMAR AB
          </div>
          <p className="mt-3 max-w-xs text-muted-foreground">
            Mark- och grundarbeten, schaktning och transport i Kalmar län
            sedan 2017.
          </p>
        </div>
        <div className="col-span-6 md:col-span-3 md:col-start-6">
          <p className="eyebrow">Besök</p>
          <p className="mt-3">Mortorp 110<br />388 91 Vassmolösa</p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow">Kontakt</p>
          <p className="mt-3">
            <a href="tel:+46738375742" className="hover:text-primary">073-837 57 42</a>
          </p>
        </div>
        <div className="col-span-12 mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} M Schakt i Kalmar AB. Alla rättigheter reserverade.</span>
          <span>Kalmar län · Sverige</span>
        </div>
      </div>
    </footer>
  );
}
