"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/site.config";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_KENYA || "254748699460";

// Helpers (with safe fallbacks)
const BRAND =
  site.brand || "Real Estate";
const PHONE =
  (site.contact.phone as string) ||
  process.env.NEXT_PUBLIC_PHONE ||
  "+254 748 699 460";
const ADDRESS =
  (site.address as string) || "Fortis Suites, Westlands, Nairobi";
const EMAIL =
  (site.contact.email as string) || "info@example.com";

// Map embed – works with just the address string
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

/* ---------- Inline icons (no external assets) ---------- */
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2.2 2.2L15 10.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmileyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M8 14.5c1.2 1.2 2.6 1.8 4 1.8s2.8-.6 4-1.8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatBubbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 16l-1 4 4-1h9a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v9z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 12h6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Page() {
  /* ---------- Simple Carousel ---------- */
  const slides = useMemo(
    () => [
      {
        src: "/templates/realestate-villa.jpg",
        alt: "Modern villa exterior, Karen",
      },
      {
        src: "/templates/realestate-apartment2.jpg",
        alt: "Bright living room with large windows",
      },
      { src: "/templates/realestate-city.jpg", alt: "Nairobi skyline at dusk" },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ===== TOP CONTACT BAR ===== */}
      <div className="w-full bg-[#0B1B3A] text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 opacity-90">
            <span>
              📞{" "}
              <a className="hover:underline" href={`tel:${PHONE}`}>
                {PHONE}
              </a>
            </span>
            <span>
              📍{" "}
              <a
                className="hover:underline"
                target="_blank"
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  ADDRESS
                )}`}
              >
                {ADDRESS}
              </a>
            </span>
            <span>
              ✉️{" "}
              <a className="hover:underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`https://wa.me/${WA}`}
              target="_blank"
              className="rounded-full bg-white text-[#0B1B3A] px-4 py-1.5 font-semibold hover:bg-gray-100 transition"
            >
              Chat on WhatsApp
            </Link>
            <a
              target="_blank"
              href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              className="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/brand/realestate-logo.svg"
              alt={site.brand}
              width={34}
              height={34}
              className="shrink-0"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-gray-900 group-hover:text-[#0B1B3A] transition">
                {site.brand}
              </div>
              <div className="text-[11px] text-gray-500 -mt-0.5">
                Real Estate Agency
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#listings" className="hover:text-[#0B1B3A]">
              Listings
            </a>
            <a href="#why" className="hover:text-[#0B1B3A]">
              Why Us
            </a>
            <a href="#testimonials" className="hover:text-[#0B1B3A]">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-[#0B1B3A]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ===== HERO WITH SEARCH ===== */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        {/* carousel slides (only active slide visible) */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <Image
              key={`${s.src}-${i}`}
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={[
                "object-cover object-[50%_38%]",
                "transition-opacity duration-700 ease-out",
                i === idx ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
              aria-hidden={i !== idx}
            />
          ))}
          {/* dark overlay for readability */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,23,0.65)_0%,rgba(7,14,23,0.78)_40%,rgba(7,14,23,0.92)_100%)]" />
        </div>

        {/* content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Your Next Address Starts Here
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-200">
            Discover verified homes and investment properties with {BRAND}.
            Trusted agents, transparent deals, instant WhatsApp support.
          </p>

          {/* search bar – FIXED COLORS */}
          <div className="mt-10 w-full max-w-3xl">
            <div className="bg-white rounded-2xl shadow-2xl p-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-left">
              <input
                placeholder="City or Area (e.g., Kilimani)"
                className="col-span-1 md:col-span-2 h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] bg-white"
              />
              <select
                className="h-12 rounded-xl border border-gray-300 px-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] appearance-none"
                defaultValue="Buy"
              >
                <option>Buy</option>
                <option>Rent</option>
                <option>Commercial</option>
              </select>
              <Link
                href="#listings"
                className="h-12 rounded-xl bg-[#0B1B3A] text-white font-semibold px-6 grid place-items-center hover:opacity-90"
              >
                Explore Properties
              </Link>
            </div>
            <p className="text-xs text-gray-200 mt-2">
              Tip: Try “Karen 4 bedroom” or “Westlands office”.
            </p>
          </div>

          {/* carousel controls */}
          <div className="absolute left-0 right-0 bottom-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${
                  i === idx
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <section id="listings" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A]">
            Featured Listings
          </h2>
          <Link
            href={`https://wa.me/${WA}`}
            target="_blank"
            className="text-sm md:text-base underline underline-offset-4 hover:opacity-80"
          >
            Need something specific? Chat now →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Luxury Villa · Karen",
              price: "KES 52M",
              badge: "For Sale",
              img: "/templates/realestate-villa.jpg",
            },
            {
              title: "Modern Apartment · Kilimani",
              price: "KES 14.5M",
              badge: "For Sale",
              img: "/templates/realestate-apartment.jpg",
            },
            {
              title: "Grade-A Office · Westlands",
              price: "KES 240K / month",
              badge: "For Rent",
              img: "/templates/realestate-office.jpg",
            },
          ].map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow hover:shadow-2xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 mb-2">
                    {p.badge}
                  </span>
                  <h3 className="text-lg font-semibold drop-shadow">{p.title}</h3>
                  <p className="font-bold">{p.price}</p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between gap-4">
                <Link
                  href="#"
                  className="text-[#0B1B3A] font-semibold hover:underline underline-offset-4"
                >
                  View details
                </Link>
                <Link
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Schedule viewing
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section id="why" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              Icon: ShieldCheckIcon,
              title: "Verified Homes",
              text: "Every listing inspected and validated — no surprises.",
            },
            {
              Icon: SmileyIcon,
              title: "Trusted Agents",
              text:
                "Vetted professionals with local expertise and track records.",
            },
            {
              Icon: ChatBubbleIcon,
              title: "Instant Support",
              text: "Ask on WhatsApp and get answers in minutes, not days.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="text-center p-8 bg-white rounded-3xl shadow-sm"
            >
              <div className="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-full bg-[#0B1B3A]/5">
                <Icon className="h-8 w-8 text-[#0B1B3A]" aria-hidden />
              </div>
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS (round photos) ===== */}
      <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3A] text-center mb-12">
          What Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Amina & Joseph",
              role: "Buyers, Kilimani",
              quote:
                "Smooth, transparent and fast. We found our Kilimani apartment in a week and the paperwork was painless.",
              avatar: "/templates/testimonial1.jpg",
            },
            {
              name: "Ian M.",
              role: "Landlord, Westlands",
              quote:
                "Professional tenant screening and quick closing. Their agent kept me updated at every step.",
              avatar: "/templates/testimonial2.jpg",
            },
            {
              name: "Grace N.",
              role: "Renter, Karen",
              quote:
                "They curated a shortlist that matched my taste and budget. Viewing schedule was perfect.",
              avatar: "/templates/testimonial3.jpg",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
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

      {/* ===== MAPS ===== */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          {/* Office map */}
          <div className="rounded-3xl overflow-hidden shadow">
            <iframe
              title="Office location"
              src={MAP_EMBED_SRC}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Nairobi listings map placeholder (swap with your real map later) */}
          <div className="rounded-3xl overflow-hidden shadow relative">
            <Image
              src="/templates/nairobi-map.jpg"
              alt="Nairobi map with sample pins"
              width={1200}
              height={800}
              className="object-cover w-full h-[380px]"
            />
            <div className="absolute bottom-3 right-3 bg-white/90 text-gray-800 rounded-full px-4 py-1 text-sm shadow">
              Sample pins — replace with live listings map
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-6xl mx-auto px-6 mt-10 text-center">
          <h3 className="text-2xl font-bold text-[#0B1B3A]">
            Visit our office or chat now
          </h3>
          <p className="text-gray-600 mt-2">
            {ADDRESS} · {PHONE} · {EMAIL}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href={`https://wa.me/${WA}`}
              target="_blank"
              className="rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold hover:brightness-95"
            >
              WhatsApp Us
            </Link>
            <a
              target="_blank"
              href={`tel:${PHONE}`}
              className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
            >
              Call Now
            </a>
            <a
              target="_blank"
              href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {BRAND}. Powered by Tech24.
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
