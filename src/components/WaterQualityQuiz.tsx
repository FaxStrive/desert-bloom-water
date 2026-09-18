"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    id: "concern",
    question: "What is your primary concern?",
    options: ["Taste and odor", "Hard water buildup", "Health and wellness", "I am curious"],
  },
  {
    id: "household",
    question: "How many people are in your home?",
    options: ["Just me", "2 to 3", "4 to 5", "6 or more"],
  },
  {
    id: "source",
    question: "What is your water source?",
    options: ["City or municipal", "Well water", "I do not know"],
  },
];

const RESULTS: Record<string, { title: string; body: string }> = {
  default: {
    title: "The K8 Ionizer System",
    body: "Based on your answers, the Enagic K8 is the right fit for your home. Schedule a complimentary consultation to see it demonstrated before you decide.",
  },
};

export default function WaterQualityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOption = (option: string) => {
    const next = [...answers, option];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, quizAnswers: answers }),
      });
    } catch {}
    setSubmitted(true);
  };

  const result = RESULTS.default;

  return (
    <div className="border border-[#D8D0C4] p-8 lg:p-12 bg-[#F5EFE3]">
      <div className="mb-6 flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 transition-colors duration-300 ${i <= step ? "bg-[#2A3E1A]" : "bg-[#D8D0C4]"}`} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="done" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <p className="font-['Playfair_Display'] text-xl font-bold text-[#2A3E1A] mb-2">Thank you, {name}.</p>
            <p className="text-[#6B7560] text-sm">We will be in touch at {phone}. Our team typically responds within 2 hours during business hours.</p>
          </motion.div>
        ) : step < QUESTIONS.length ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <p className="font-['Plus_Jakarta_Sans'] text-lg font-medium text-[#1A1A14] mb-6">{QUESTIONS[step].question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                  className="border border-[#D8D0C4] hover:border-[#2A3E1A] hover:bg-[#2A3E1A] hover:text-[#F5EFE3] text-[#2A3E1A] text-sm font-medium px-4 py-3 text-left transition-colors duration-300 rounded-none"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#5A7040] mb-2">YOUR RECOMMENDATION</p>
            <p className="font-['Playfair_Display'] text-xl font-bold text-[#2A3E1A] mb-2">{result.title}</p>
            <p className="text-[#6B7560] text-sm leading-relaxed mb-6">{result.body}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-[#D8D0C4] bg-transparent px-4 py-3 text-sm text-[#1A1A14] placeholder-[#6B7560] focus:outline-none focus:border-[#2A3E1A] rounded-none" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" type="tel" className="w-full border border-[#D8D0C4] bg-transparent px-4 py-3 text-sm text-[#1A1A14] placeholder-[#6B7560] focus:outline-none focus:border-[#2A3E1A] rounded-none" />
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" className="w-full border border-[#D8D0C4] bg-transparent px-4 py-3 text-sm text-[#1A1A14] placeholder-[#6B7560] focus:outline-none focus:border-[#2A3E1A] rounded-none" />
              <button type="submit" className="relative overflow-hidden w-full bg-[#2A3E1A] text-[#F5EFE3] px-6 py-3 text-sm font-semibold rounded-none group">
                <span className="absolute inset-0 bg-[#E8703A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                <span className="relative z-10">Schedule a Complimentary Consultation</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
