import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";
import {
  Baby,
  CalendarCheck,
  ChevronDown,
  Clock,
  Flower2,
  HeartPulse,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UserRoundCheck,
  X,
} from "lucide-react";
import "./styles.css";

const clinic = {
  name: "SREE HOMOEO CLINIC",
  shortName: "SREE HOMOEO CLINIC",
  doctor: "Dr.Sree Divya",
  description: "Clinic & stores",
  qualification: "B.H.M.S., M.Sc. Psychology",
  area: "Yapral, Secunderabad",
  phone: "",
  whatsapp: "",
  mapLink: "https://maps.app.goo.gl/fsa8bN87udMYwF466",
  address:
    "GG3Q+9WR, Yapral Main Rd, opposite SBI BANK, above VIJAYA DIAGNOSTIC CENTRE, Bapuji Nagar, Yapral, Secunderabad, Telangana 500087",
  timings: "Mon - Sat, 10:00 AM - 9:00 PM",
  image: "/assets/doctor-sri-divya.png",
};

const appointmentSheetWebhookUrl = import.meta.env.VITE_APPOINTMENT_SHEET_WEBHOOK_URL || "";

const treatments = [
  ["Women Health", "Menopausal Treatment", HeartPulse],
  ["Women Health", "Menstrual Disorders in Adolescent Girls", Flower2],
  ["Women Health", "PCOD/PCOS Treatment", Sparkles],
  ["Women Health", "Infertility Evaluation / Treatment", HeartPulse],
  ["Women Health", "Thyroid Disorder Treatment", ShieldCheck],
  ["Child Care", "Child Development Disease Treatment", Baby],
  ["Child Care", "Children Immunity Treatment", ShieldCheck],
  ["Respiratory", "Bronchial Asthma Treatment", Stethoscope],
  ["Respiratory", "Sinus / Sinusitis Treatment", Leaf],
  ["Skin & Hair", "Hair Loss Treatment", Sparkles],
  ["Skin & Hair", "Skin Disease Treatment", Flower2],
  ["Pain Care", "Migraine Treatment", Moon],
  ["Pain Care", "Headache Management", HeartPulse],
  ["Pain Care", "Joints and Musculoskeletal Disorders", Stethoscope],
  ["Mind & Lifestyle", "Obsessive Compulsive Disorder Counselling", UserRoundCheck],
  ["Mind & Lifestyle", "Obesity and Lifestyle Disease Modifications", Leaf],
  ["Allergy Care", "Allergy Treatment", ShieldCheck],
];

const stats = [
  ["20+", "Years of clinical experience"],
  ["17", "Focused treatment areas"],
  ["2", "Advanced qualifications"],
  ["1:1", "Personalized consultation"],
];

const features = [
  ["Personalized Case Taking", "Detailed listening, health history, lifestyle patterns and emotional context.", UserRoundCheck],
  ["Women & Child Care", "Focused support for PCOS, menstrual concerns, child immunity and asthma tendencies.", HeartPulse],
  ["Mind-Body Insight", "Psychology training helps include stress, sleep and emotional patterns in care.", Sparkles],
  ["Calm Clinic Experience", "A quiet, premium consultation flow designed to help patients feel heard.", Leaf],
  ["Follow-up Focused", "Progress is reviewed through intensity, frequency, sleep, energy and overall health.", CalendarCheck],
  ["Accessible Location", "Located on Yapral Main Road, opposite SBI Bank and above Vijaya Diagnostic Centre.", MapPin],
];

const process = [
  ["01", "Discover", "Detailed case-taking with symptoms, triggers, medical history and lifestyle patterns.", Search],
  ["02", "Personalize", "A homeopathic plan is selected based on the person, not only the condition name.", Flower2],
  ["03", "Guide", "Diet, routine and follow-up guidance are shared where relevant for long-term wellness.", Leaf],
  ["04", "Review", "Progress is reviewed and treatment is adjusted based on patient response.", CalendarCheck],
];

const testimonials = [
  ["Anitha R.", "Very calm consultation. Doctor listened patiently and explained the treatment approach clearly.", 5],
  ["Suresh K.", "Good experience for allergy and sinus-related concerns. The clinic visit felt organized and comfortable.", 5],
  ["Priya M.", "Helpful guidance for women health concerns. The doctor’s psychology background made the consultation reassuring.", 5],
  ["Rajesh P.", "Professional clinic, easy location and detailed follow-up advice.", 5],
];

const faqs = [
  ["Is homeopathy suitable for children and adults?", "Homeopathy may be considered for different age groups when prescribed after consultation by a qualified doctor."],
  ["How long does treatment take?", "The duration depends on the condition, severity, history and individual response. Chronic concerns usually need planned follow-ups."],
  ["Can I discuss PCOS, thyroid or skin concerns?", "Yes. The clinic evaluates PCOS/PCOD, thyroid concerns, skin disease, allergies, migraine, sinusitis and lifestyle-related conditions."],
  ["What should I bring for consultation?", "Bring previous prescriptions, lab reports and a short note of your symptoms, duration, triggers and current medicines."],
  ["Can I take homeopathy with other medicines?", "Tell the doctor about every medicine you currently take. The doctor can guide you based on your situation."],
];

const appointmentSlots = [
  {
    label: "Morning",
    slots: ["10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"],
  },
  {
    label: "Afternoon",
    slots: ["14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"],
  },
  {
    label: "Evening",
    slots: ["17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00"],
  },
];

const gallery = [
  ["Homeopathic Consultation", clinic.image, ""],
  ["Homeopathic Remedies", "/assets/gallery-homeopathy-remedies.png", ""],
  ["Case Taking and Consultation", "/assets/gallery-homeopathy-consultation.png", ""],
  ["Child Immunity Support", "/assets/gallery-child-care-homeopathy.png", ""],
  ["Allergy and Respiratory Care", "/assets/gallery-respiratory-homeopathy.png", ""],
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let scrollTimer;
    return scrollY.on("change", (value) => {
      setScrolled(value > 20);
      setIsScrolling(true);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => setIsScrolling(false), 180);
    });
  }, [scrollY]);
  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;
      window.setTimeout(() => {
        scrollToSection(window.location.hash, "auto");
      }, 120);
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-clinic-ink">
      <Navigation scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <FloatingTimings isScrolling={isScrolling} />
      <main>
        <Hero />
        <Stats />
        <WhyChoose />
        <Doctor />
        <Treatments />
        <Process />
        <Testimonials index={testimonialIndex} setIndex={setTestimonialIndex} />
        <Gallery setActiveImage={setActiveImage} />
        <AppointmentCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Lightbox activeImage={activeImage} setActiveImage={setActiveImage} />
    </div>
  );
}

function Navigation({ scrolled, menuOpen, setMenuOpen }) {
  const links = ["Home", "Doctor", "Treatments", "Process", "Gallery", "Contact"];
  const hrefFor = (link) => (link === "Home" ? "#home" : `#${link.toLowerCase()}`);
  const handleNav = (event, link) => {
    event.preventDefault();
    const hash = hrefFor(link);
    window.history.pushState(null, "", hash);
    scrollToSection(hash, "smooth");
    setMenuOpen(false);
  };

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/50 bg-white/75 shadow-sm backdrop-blur-2xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Sree Homeopathy home">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clinic-green text-lg font-black text-white shadow-card">SH</span>
          <span>
            <span className="block font-heading text-base font-extrabold">{clinic.shortName}</span>
            <span className="block text-xs font-semibold text-slate-500">{clinic.area}</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link} href={hrefFor(link)} onClick={(event) => handleNav(event, link)} className="text-sm font-bold text-slate-700 transition hover:text-clinic-green">
              {link}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#appointment" className="btn btn-ghost"><CalendarCheck className="h-4 w-4" />Book Appointment</a>
          <a href={whatsappLink()} className="btn btn-green"><MessageCircle className="h-4 w-4" />WhatsApp</a>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white/80 lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="mx-5 mb-4 rounded-luxury border border-white/70 bg-white/90 p-4 shadow-card backdrop-blur-xl lg:hidden">
            {links.map((link) => (
              <a key={link} href={hrefFor(link)} onClick={(event) => handleNav(event, link)} className="block rounded-2xl px-4 py-3 font-bold text-slate-700">
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-clinic-mist to-white px-5 pb-10 pt-20 lg:px-8 lg:pt-24">
      <AnimatedBackdrop />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-10">
          <span className="pill mb-7"><Sparkles className="h-4 w-4" />Premium homeopathy care in Yapral</span>
          <h1 className="max-w-3xl font-heading text-3xl font-normal !leading-[1.18] tracking-tight text-clinic-ink sm:text-4xl md:text-[2.7rem] xl:text-[3rem]">
            Natural healing, guided with <span className="font-extrabold text-clinic-green">modern clinical care</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            {clinic.name} by {clinic.doctor} brings calm, personalized homeopathic consultation for women, children and chronic health concerns, with clinic visits and online consultations available.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#appointment" className="btn btn-green btn-xl"><CalendarCheck className="h-5 w-5" />Book Appointment</a>
            <a href={clinic.mapLink} target="_blank" rel="noreferrer" className="btn btn-white btn-xl"><MapPin className="h-5 w-5" />Get Directions</a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {["BHMS Doctor", "20+ Years", "Women & Child Care"].map((item) => (
              <div key={item} className="rounded-luxury border border-white/80 bg-white/60 px-5 py-4 font-bold text-slate-700 shadow-sm backdrop-blur-xl">
                <ShieldCheck className="mb-2 h-5 w-5 text-clinic-green" />{item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.85 }} className="relative z-10 self-start pt-2 lg:-mt-8">
          <div className="relative mx-auto max-w-[500px]">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-clinic-light/30 via-white to-clinic-gold/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/50 p-3 shadow-luxury backdrop-blur-2xl">
              <img src={clinic.image} alt={clinic.doctor} className="h-[430px] w-full rounded-[1.7rem] object-cover object-center max-md:h-[340px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-luxury border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-widest text-clinic-green">Consultant Homeopath</p>
                <h2 className="mt-1 font-heading text-xl font-black">{clinic.doctor}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{clinic.qualification}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingTimings({ isScrolling }) {
  return (
    <div
      className={`timing-float fixed bottom-5 right-5 z-40 hidden xl:block ${isScrolling ? "timing-scrolling" : ""}`}
      aria-label={`Clinic timings: ${clinic.timings}`}
    >
      <div className="timing-flag w-56 rounded-luxury border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur-2xl">
        <Clock className="h-5 w-5 text-clinic-green" />
        <p className="mt-2 text-sm font-black">Clinic Timings</p>
        <p className="mt-1 text-xs font-semibold text-slate-600">{clinic.timings}</p>
      </div>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div animate={{ x: [0, 40, 0], y: [0, -25, 0] }} transition={{ duration: 13, repeat: Infinity }} className="absolute left-[6%] top-[18%] h-64 w-64 rounded-full bg-clinic-light/20 blur-3xl" />
      <motion.div animate={{ x: [0, -35, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-clinic-gold/20 blur-3xl" />
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 9, repeat: Infinity }} className="absolute bottom-[5%] left-[40%] h-96 w-96 rounded-full bg-clinic-green/10 blur-3xl" />
    </div>
  );
}

function Stats() {
  return (
    <section className="relative -mt-10 px-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-luxury backdrop-blur-2xl md:grid-cols-4">
        {stats.map(([value, label], index) => <CounterCard key={label} value={value} label={label} index={index} />)}
      </div>
    </section>
  );
}

function CounterCard({ value, label, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const numeric = parseInt(value, 10);
  const [count, setCount] = useState(value.includes(":") ? value : "0");

  useEffect(() => {
    if (!isInView || Number.isNaN(numeric) || value.includes(":")) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1100, 1);
      setCount(`${Math.round(progress * numeric)}${value.includes("+") ? "+" : ""}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numeric, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-luxury bg-gradient-to-br from-white to-clinic-mist p-6">
      <strong className="font-heading text-4xl font-black text-clinic-green">{count}</strong>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{label}</p>
    </motion.div>
  );
}

function WhyChoose() {
  return (
    <Section id="why" eyebrow="Why Choose Us" title="A premium clinic experience designed around trust, comfort and clarity.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map(([title, text, Icon], index) => (
          <motion.article key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.04 }} whileHover={{ y: -8 }} className="group rounded-luxury border border-slate-100 bg-white p-7 shadow-card transition hover:shadow-luxury">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-clinic-green to-clinic-light text-white shadow-lg shadow-green-900/20">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-black">{title}</h3>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Doctor() {
  return (
    <section id="doctor" className="scroll-mt-20 bg-clinic-mist px-5 py-6 lg:min-h-[calc(100vh-80px)] lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.68fr_1fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-clinic-light/40 to-clinic-gold/20 blur-xl" />
          <img src={clinic.image} alt={clinic.doctor} className="relative h-[460px] w-full rounded-[2rem] object-cover shadow-luxury max-md:h-[360px]" />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-eyebrow">Meet The Doctor</p>
          <h2 className="section-title">{clinic.doctor}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 lg:text-lg">
            A homeopath practicing in Yapral with 20 years of experience. Dr. Divya completed B.H.M.S. from HKE-S Homeopathy Medical College, Gulbarga and M.Sc. Psychology from Annamalai University.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[["Qualification", clinic.qualification], ["Experience", "20 years"], ["Specialties", "Women health, child care, skin, allergy and chronic concerns"], ["Clinic", `${clinic.shortName}, ${clinic.area}`]].map(([label, value]) => (
              <div key={label} className="rounded-luxury border border-white bg-white/70 p-4 shadow-sm">
                <span className="text-xs font-black uppercase tracking-widest text-clinic-green">{label}</span>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-700 lg:text-base">{value}</p>
              </div>
            ))}
          </div>
          <a href="#appointment" className="btn btn-green btn-xl mt-7"><CalendarCheck className="h-5 w-5" />Schedule Consultation</a>
        </motion.div>
      </div>
    </section>
  );
}

function Treatments() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => treatments.filter(([, name]) => name.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <Section id="treatments" eyebrow="Treatments" title="Advanced homeopathic care across everyday and chronic concerns.">
      <div className="mb-6 flex max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <Search className="h-5 w-5 text-clinic-green" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" placeholder="Search treatments" aria-label="Search treatments" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(([category, name, Icon], index) => (
          <motion.article key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.025 }} whileHover={{ y: -8, scale: 1.01 }} className="rounded-luxury border border-slate-100 bg-white p-5 shadow-card">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-clinic-mist text-clinic-green"><Icon className="h-6 w-6" /></div>
            <p className="text-xs font-black uppercase tracking-widest text-clinic-green">{category}</p>
            <h3 className="mt-2 font-heading text-base font-black leading-6 lg:text-lg">{name}</h3>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-clinic-ink px-5 py-6 text-white lg:min-h-[calc(100vh-80px)] lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="section-eyebrow text-clinic-gold">Treatment Process</p>
        <h2 className="section-title text-white">A calm, transparent journey from first consultation to follow-up.</h2>
        <div className="mt-8 space-y-4">
          {process.map(([number, title, text, Icon], index) => (
            <motion.div key={title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative grid gap-5 rounded-luxury border border-white/10 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-[112px_1fr]">
              {index < process.length - 1 && <span className="absolute left-[66px] top-[96px] hidden h-12 w-px bg-gradient-to-b from-clinic-light to-transparent md:block" />}
              <div className="flex items-center gap-4"><span className="font-heading text-3xl font-black text-clinic-gold">{number}</span><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-clinic-green"><Icon className="h-6 w-6" /></div></div>
              <div><h3 className="font-heading text-xl font-black lg:text-2xl">{title}</h3><p className="mt-2 leading-7 text-white/70">{text}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ index, setIndex }) {
  const [name, text, rating] = testimonials[index];
  return (
    <Section id="testimonials" eyebrow="Patient Testimonials" title="Google-style reviews from patients who value calm, detailed care.">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-7 text-center shadow-luxury">
        <Quote className="mx-auto h-10 w-10 text-clinic-green" />
        <AnimatePresence mode="wait">
          <motion.div key={name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }}>
            <div className="mt-5 flex justify-center gap-1 text-clinic-gold">{Array.from({ length: rating }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700 lg:text-xl">"{text}"</p>
            <p className="mt-5 font-heading text-xl font-black">{name}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 flex justify-center gap-2">
          {testimonials.map((item, i) => <button key={item[0]} type="button" onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${i === index ? "w-9 bg-clinic-green" : "w-2.5 bg-slate-200"}`} aria-label={`Show review ${i + 1}`} />)}
        </div>
      </div>
    </Section>
  );
}

function Gallery({ setActiveImage }) {
  return (
    <Section id="gallery" eyebrow="Treatment Gallery" title="Homeopathy care themes for women, children, allergies, remedies and lifestyle wellness.">
      <div className="grid auto-rows-[190px] gap-4 md:grid-cols-3">
        {gallery.map(([title, src, span]) => (
          <motion.button key={title} type="button" whileHover={{ y: -6 }} onClick={() => setActiveImage({ title, src })} className={`group relative overflow-hidden rounded-luxury bg-slate-100 shadow-card ${span}`}>
            <img src={src} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-left font-heading text-xl font-black text-white">{title}</span>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

function AppointmentCTA() {
  return (
    <section id="appointment" className="scroll-mt-20 px-5 py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-visible rounded-[2.4rem] bg-gradient-to-br from-clinic-green to-[#174d27] p-7 text-white shadow-luxury md:p-10 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="section-eyebrow text-clinic-gold">Book Appointment</p>
          <h2 className="font-heading text-2xl font-extrabold leading-snug md:text-[2.35rem]">Start your wellness consultation with {clinic.name}.</h2>
          <p className="mt-6 text-lg leading-8 text-white/75">Request a clinic visit or online consultation. The clinic team can confirm final timing after receiving your details.</p>
          <a href={whatsappLink()} className="btn mt-8 border border-white/20 bg-white/15 text-white hover:bg-white/25"><MessageCircle className="h-5 w-5" />WhatsApp Clinic</a>
        </div>
        <AppointmentForm />
      </div>
    </section>
  );
}

function AppointmentForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(appointmentSlots[0].slots[0]);
  const [slotPickerOpen, setSlotPickerOpen] = useState(false);
  const [slotPickerPlacement, setSlotPickerPlacement] = useState("bottom");
  const [selectedDate, setSelectedDate] = useState(getTodayInputValue());
  const [consultationMode, setConsultationMode] = useState("Clinic Visit");
  const slotTriggerRef = React.useRef(null);
  const slotPickerRef = React.useRef(null);
  const today = getTodayInputValue();
  const toggleSlotPicker = () => {
    if (!slotPickerOpen && slotTriggerRef.current) {
      const triggerRect = slotTriggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      setSlotPickerPlacement(spaceBelow < 430 && spaceAbove > spaceBelow ? "top" : "bottom");
    }
    setSlotPickerOpen((value) => !value);
  };
  useEffect(() => {
    if (!slotPickerOpen) return;
    const handleOutsideClick = (event) => {
      if (slotPickerRef.current?.contains(event.target) || slotTriggerRef.current?.contains(event.target)) return;
      setSlotPickerOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [slotPickerOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const patientName = data.get("name") || "patient";
    const phone = data.get("phone") || "";
    const concern = data.get("concern") || "";
    const consultationType = data.get("mode") || consultationMode;
    const preferredDate = data.get("date") || selectedDate;
    const preferredTime = data.get("slot") || selectedSlot;
    const submittedAt = new Date().toISOString();
    const appointmentId = createAppointmentId();
    const payload = {
      id: appointmentId,
      appointmentId,
      clinic: clinic.name,
      clinicName: clinic.name,
      doctor: clinic.doctor,
      doctorName: clinic.doctor,
      name: patientName,
      patientName,
      fullName: patientName,
      phone,
      mobile: phone,
      phoneNumber: phone,
      concern,
      healthConcern: concern,
      symptoms: concern,
      consultationType,
      consultationMode: consultationType,
      visitType: consultationType,
      appointmentType: consultationType,
      mode: consultationType,
      preferredDate,
      appointmentDate: preferredDate,
      date: preferredDate,
      preferredTime,
      appointmentTime: preferredTime,
      timeSlot: preferredTime,
      slot: preferredTime,
      status: "NEW",
      source: "Website",
      submittedAt,
      timestamp: submittedAt,
      pageUrl: window.location.href,
    };

    setIsSubmitting(true);
    setStatus("Submitting your appointment request...");

    try {
      if (!appointmentSheetWebhookUrl) {
        throw new Error("Google Sheets webhook URL is not configured.");
      }

      await fetch(appointmentSheetWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setStatus(
        `Thank you, ${patientName}. Your appointment request for ${consultationType} on ${formatDisplayDate(preferredDate)} at ${preferredTime} has been received. The clinic team will confirm the final timing shortly.`
      );
      form.reset();
      setConsultationMode("Clinic Visit");
      setSelectedDate(getTodayInputValue());
      setSelectedSlot(appointmentSlots[0].slots[0]);
      setSlotPickerOpen(false);
    } catch (error) {
      setStatus("Appointment details could not be saved to Google Sheets yet. Please configure the Google Sheets webhook URL and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4 rounded-[1.7rem] border border-white/20 bg-white/95 p-6 text-clinic-ink shadow-card" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2"><label className="field">Full Name<input name="name" required /></label><label className="field">Phone<input name="phone" type="tel" required /></label></div>
      <label className="field">Health Concern<input name="concern" placeholder="PCOS, allergy, migraine..." /></label>
      <div className="field">
        <span>Consultation Type</span>
        <input name="mode" type="hidden" value={consultationMode} readOnly />
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white p-1">
          {["Clinic Visit", "Online Consultation"].map((mode) => (
            <button
              key={mode}
              type="button"
              className={`rounded-xl px-3 py-2 text-sm font-extrabold transition ${
                consultationMode === mode ? "bg-clinic-green text-white shadow-sm" : "text-slate-600 hover:bg-clinic-mist hover:text-clinic-green"
              }`}
              onClick={() => setConsultationMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">Preferred Date<input name="date" type="date" value={selectedDate} min={today} onChange={(event) => setSelectedDate(event.target.value)} /></label>
        <div className="field relative">
          <span>Preferred Time</span>
          <input name="slot" type="hidden" value={selectedSlot} readOnly />
          <button
            ref={slotTriggerRef}
            type="button"
            className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-semibold outline-none transition hover:border-clinic-green focus:border-clinic-green focus:ring-4 focus:ring-green-100"
            onClick={toggleSlotPicker}
            aria-expanded={slotPickerOpen}
            aria-label="Open preferred time slot selector"
          >
            <span>{selectedSlot}</span>
            <Clock className="h-5 w-5 text-clinic-green" />
          </button>
          <AnimatePresence>
            {slotPickerOpen && (
              <motion.div
                ref={slotPickerRef}
                initial={{ opacity: 0, y: slotPickerPlacement === "top" ? -10 : 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: slotPickerPlacement === "top" ? -10 : 10, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`absolute right-0 z-50 w-[min(390px,calc(100vw-40px))] rounded-xl border border-slate-200 bg-white p-3 shadow-luxury ${
                  slotPickerPlacement === "top" ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
                }`}
              >
                <p className="mb-2 text-sm font-extrabold text-slate-700">{formatDisplayDate(selectedDate)}</p>
                <div className="space-y-2">
                  {appointmentSlots.map((group) => (
                    <div key={group.label}>
                      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-clinic-green">{group.label}</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {group.slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`min-h-8 rounded-md border px-1.5 py-1 text-center text-[10px] font-extrabold transition ${
                              selectedSlot === slot
                                ? "border-clinic-green bg-clinic-mist text-clinic-green"
                                : "border-slate-200 bg-white text-slate-500 hover:border-clinic-green hover:text-clinic-green"
                            }`}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setSlotPickerOpen(false);
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <button className="btn btn-green btn-xl" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Request Appointment"}</button>
      {status && <p className="rounded-2xl bg-clinic-mist p-4 text-sm font-semibold text-clinic-green">{status}</p>}
    </form>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Clear answers before your first visit.">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="overflow-hidden rounded-luxury border border-slate-100 bg-white shadow-sm">
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left font-heading text-lg font-black">
              {question}<ChevronDown className={`h-5 w-5 text-clinic-green transition ${open === index ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="px-6 pb-6 leading-7 text-slate-600">{answer}</p></motion.div>}</AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-clinic-mist px-5 py-6 lg:min-h-[calc(100vh-80px)] lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.78fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-card">
          <iframe title="Sree Homeopathy Clinic location" src="https://www.google.com/maps?q=GG3Q%2B9WR%2C%20Yapral%20Main%20Rd%2C%20Secunderabad%2C%20Telangana%20500087&output=embed" className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-card">
          <p className="section-eyebrow">Contact</p>
          <h2 className="font-heading text-2xl font-extrabold lg:text-[2.15rem]">Visit {clinic.name}</h2>
          <div className="mt-6 space-y-4">
            <ContactItem icon={MapPin} title="Address" text={clinic.address} />
            <ContactItem icon={Clock} title="Timings" text={clinic.timings} />
            <ContactItem icon={Phone} title="Phone" text={clinic.phone || "Phone number can be added"} />
            <ContactItem icon={MessageCircle} title="WhatsApp" text={clinic.whatsapp || "WhatsApp number can be added"} />
          </div>
          <a href={clinic.mapLink} target="_blank" rel="noreferrer" className="btn btn-green btn-xl mt-6"><MapPin className="h-5 w-5" />Open Google Maps</a>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4"><div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-clinic-mist text-clinic-green"><Icon className="h-6 w-6" /></div><div><p className="font-heading font-black">{title}</p><p className="mt-1 leading-7 text-slate-600">{text}</p></div></div>
  );
}

function Footer() {
  return (
    <footer className="bg-clinic-ink px-5 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-clinic-green font-black">SH</span><div><p className="font-heading text-xl font-black">{clinic.shortName}</p><p className="text-sm text-white/60">{clinic.area}</p></div></div><p className="mt-5 max-w-sm leading-7 text-white/60">{clinic.description} with homeopathic consultation for natural healing, chronic care and family wellness.</p></div>
        <FooterLinks title="Quick Links" links={["Doctor", "Treatments", "Process", "Gallery"]} />
        <FooterLinks title="Treatments" links={["Women Health", "Child Care", "Skin & Hair", "Allergy Care"]} />
        <div><p className="font-heading text-lg font-black">Clinic</p><p className="mt-4 leading-7 text-white/60">{clinic.address}</p></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/50">Copyright © {new Date().getFullYear()} {clinic.name}. All rights reserved.</div>
    </footer>
  );
}

function FooterLinks({ title, links }) {
  return <div><p className="font-heading text-lg font-black">{title}</p><div className="mt-4 grid gap-3">{links.map((link) => <a key={link} href="#treatments" className="text-white/60 transition hover:text-clinic-gold">{link}</a>)}</div></div>;
}

function Lightbox({ activeImage, setActiveImage }) {
  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)}>
          <button type="button" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-clinic-ink" aria-label="Close gallery image"><X /></button>
          <motion.img src={activeImage.src} alt={activeImage.title} className="max-h-[86vh] max-w-[94vw] rounded-luxury object-contain shadow-luxury" initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-6 lg:min-h-[calc(100vh-80px)] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mb-6 max-w-3xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function whatsappLink() {
  const number = (clinic.whatsapp || clinic.phone || "").replace(/\D/g, "");
  return number ? `https://wa.me/${number}` : "#appointment";
}

function getTodayInputValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000);
  return localToday.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function createAppointmentId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `appt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function scrollToSection(hash, behavior = "smooth") {
  const target = document.querySelector(hash);
  if (!target) return;
  const headerOffset = 80;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior });
}

createRoot(document.getElementById("root")).render(<App />);
