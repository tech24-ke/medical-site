"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/site.config";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_KENYA || "254748699460";

// Helpers (with safe fallbacks)
const BRAND = site.brand || "Your Private Clinic";
const PHONE =
  (site.contact?.phone as string) ||
  process.env.NEXT_PUBLIC_PHONE ||
  "+254 748 699 460";
const ADDRESS = (site.address as string) || "Fortis Suites, Westlands, Nairobi";
const EMAIL = (site.contact?.email as string) || "care@example.com";

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

/* ---------- Inline icons ---------- */
function StethoscopeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 8a6 6 0 1 1-12 0" strokeWidth="1.8" />
      <circle cx="18" cy="12" r="3" strokeWidth="1.8" />
      <path d="M18 15v2a4 4 0 0 1-4 4h-1" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 21s-7.5-4.7-9.5-8.6C.8 9.5 2.4 6 6 6c2.1 0 3.5 1.1 4 2 0.5-0.9 1.9-2 4-2 3.6 0 5.2 3.5 3.5 6.4C19.5 16.3 12 21 12 21z" strokeWidth="1.8" />
      <path d="M3 12h3l2 3 2-6 2 6 1-2h6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldCrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v8M8 12h8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Page() {
  const slides = useMemo(
    () => [
      { src: "/templates/medical-hero.jpg", alt: "Doctor with patient during a friendly consultation" },
      { src: "/templates/medical-lobby.jpg", alt: "Bright clinic lobby with welcoming staff" },
      { src: "/templates/medical-family.jpg", alt: "Family health — pediatric to adult care" },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ===== TOP CONTACT BAR ===== */}
      <div className="w-full bg-[#0A6C73] text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 opacity-90">
            <span>📞 <a className="hover:underline" href={`tel:${PHONE}`}>{PHONE}</a></span>
            <span>📍{" "}
              <a className="hover:underline" target="_blank"
                 href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}>
                {ADDRESS}
              </a>
            </span>
            <span>✉️ <a className="hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`https://wa.me/${WA}`} target="_blank"
              className="rounded-full bg-white text-[#0A6C73] px-4 py-1.5 font-semibold hover:bg-gray-100 transition">
              Book on WhatsApp
            </Link>
            <a target="_blank" href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
               className="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10">
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* Full SVG wordmark — larger, no truncation */}
            <Image
              src="/brand/medical-logo.svg"
              alt={site.brand}
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-[#0A6C73]">Services</a>
            <a href="#why" className="hover:text-[#0A6C73]">Why Us</a>
            <a href="#testimonials" className="hover:text-[#0A6C73]">Testimonials</a>
            <a href="#contact" className="hover:text-[#0A6C73]">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <Image key={`${s.src}-${i}`} src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw"
                   className={["object-cover object-[50%_40%]","transition-opacity duration-700 ease-out", i === idx ? "opacity-100" : "opacity-0 pointer-events-none"].join(" ")}
                   aria-hidden={i !== idx}/>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,26,0.55)_0%,rgba(3,24,26,0.7)_40%,rgba(3,24,26,0.86)_100%)]" />
        </div>

        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
          <span className="inline-block text-xs tracking-widest uppercase opacity-80 mb-3">
            Family · Preventive · Cosmetic
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Your Health. Our Priority.
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-200">
            Same-day appointments with trusted doctors. From routine checkups to diagnostics and dental — book on WhatsApp in seconds.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href={`https://wa.me/${WA}`} target="_blank"
                  className="h-12 rounded-2xl bg-[#0A6C73] text-white font-semibold px-6 grid place-items-center hover:brightness-95 shadow-lg">
              Book Appointment
            </Link>
            <a href="#services"
               className="h-12 rounded-2xl bg-white/10 border border-white/30 text-white font-semibold px-6 grid place-items-center hover:bg-white/20">
              View Services
            </a>
          </div>

          <div className="absolute left-0 right-0 bottom-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`}
                      className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A6C73]">Our Services</h2>
          <Link href={`https://wa.me/${WA}`} target="_blank"
                className="text-sm md:text-base underline underline-offset-4 hover:opacity-80">
            Not sure what you need? Chat with us →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "General Practice", text: "Checkups, prescriptions, chronic condition care and follow-ups.", img: "/services/medical-general.jpg" },
            { title: "Pediatrics", text: "Gentle care for infants, children, and teens — wellness and vaccines.", img: "/services/medical-pediatrics.jpg" },
            { title: "Women’s Health", text: "Well-woman exams, family planning, screenings, and counseling.", img: "/services/medical-women.jpg" },
            { title: "Dental & Cosmetic", text: "Cleaning, fillings, whitening, and smile-enhancing treatments.", img: "/services/medical-dental.jpg" },
            { title: "Diagnostics & Lab", text: "Modern lab tests and imaging with clear, timely results.", img: "/services/medical-diagnostics.jpg" },
            { title: "Wellness & Vaccines", text: "Preventive care, lifestyle programs, and routine immunizations.", img: "/services/medical-wellness.jpg" },
          ].map((s) => (
            <article key={s.title} className="group relative overflow-hidden rounded-3xl bg-white shadow hover:shadow-2xl transition">
              <div className="relative h-56">
                <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold drop-shadow">{s.title}</h3>
                  <p className="text-sm text-white/90">{s.text}</p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between gap-4">
                <Link href={`https://wa.me/${WA}`} target="_blank"
                      className="text-[#0A6C73] font-semibold hover:underline underline-offset-4">
                  Ask a Doctor
                </Link>
                <Link href={`https://wa.me/${WA}`} target="_blank"
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
                  Book now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section id="why" className="bg-[#E6F4F1] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            { Icon: StethoscopeIcon, title: "Experienced Doctors", text: "Board-certified clinicians focused on clear, practical care." },
            { Icon: HeartPulseIcon, title: "Patient-First Approach", text: "We listen, explain options, and tailor treatment to your goals." },
            { Icon: ShieldCrossIcon, title: "Modern & Safe", text: "Clean facilities and up-to-date diagnostics with strict hygiene." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="text-center p-8 bg-white rounded-3xl shadow-sm">
              <div className="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-full bg-[#0A6C73]/5">
                <Icon className="h-8 w-8 text-[#0A6C73]" aria-hidden />
              </div>
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A6C73] text-center mb-12">What Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Wanjiru K.",
              role: "General Practice",
              quote: "They explained my results in simple terms and gave me a clear plan. I felt genuinely cared for.",
              avatar: "/templates/testimonial1.jpg",
            },
            {
              name: "Samir A.",
              role: "Dental",
              quote: "Efficient, painless cleaning and helpful tips. Booking via WhatsApp was super convenient.",
              avatar: "/templates/testimonial2.jpg",
            },
            {
              name: "Grace & Baby Liam",
              role: "Pediatrics",
              quote: "Kind staff and a patient pediatrician. My baby stayed calm throughout the visit.",
              avatar: "/templates/testimonial3.jpg",
            },
          ].map((t) => (
            <div key={t.name} className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <Image src={t.avatar} alt={t.name} width={56} height={56} className="rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT + MAP ===== */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl overflow-hidden shadow">
            <iframe
              title="Clinic location"
              src={MAP_EMBED_SRC}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow relative">
            <Image
              src="/consultation/medical-room.jpg"
              alt="Private consultation room"
              width={1200}
              height={800}
              className="object-cover w-full h-[380px]"
            />
            <div className="absolute bottom-3 right-3 bg-white/90 text-gray-800 rounded-full px-4 py-1 text-sm shadow">
              Modern rooms · Hygienic standards
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-10 text-center">
          <h3 className="text-2xl font-bold text-[#0A6C73]">Book your appointment today</h3>
          <p className="text-gray-600 mt-2">{ADDRESS} · {PHONE} · {EMAIL}</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href={`https://wa.me/${WA}`} target="_blank" className="rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold hover:brightness-95">WhatsApp Us</Link>
            <a target="_blank" href={`tel:${PHONE}`} className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50">Call Now</a>
            <a target="_blank" href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50">Get Directions</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {BRAND}. Patient-first care, powered by Tech24.
      </footer>

      {/* Floating WhatsApp button */}
      <Link
        href={`https://wa.me/${WA}`}
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 flex items-center justify-center shadow-xl bg-[#25D366] hover:brightness-95 transition"
      >
        <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={26} height={26} />
      </Link>
    </main>
  );
}
