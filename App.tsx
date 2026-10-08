import { useState, useEffect, useRef } from "react";
import logoImg from "@/imports/Gemini_Generated_Image_5cbug85cbug85cbu.jpeg";

type Screen = "splash" | "welcome" | "name" | "age" | "location" | "interests" | "photo" | "app";
type Tab = "map" | "events" | "chat" | "profile";
type ChatMode = "list" | "city" | "direct";

type ProfileData = {
  name: string;
  age: number;
  city: string;
  interests: string[];
  avatar: string;
};

type PreviewConfig = {
  id: string;
  label: string;
  initialScreen: Screen;
  initialTab?: Tab;
  initialChatMode?: ChatMode;
  initialChatIndex?: number;
};

type BoardSection = {
  id: "onboarding" | "discover" | "conversations" | "profile";
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  previews: PreviewConfig[];
};

// ─── Blob Character SVG ───────────────────────────────────────────────────────
function BlobChar({ color = "#AE445A", size = 32, smile = true }: { color?: string; size?: number; smile?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 48" fill="none">
      <ellipse cx="20" cy="16" rx="13" ry="14" fill={color} stroke="#1D1A39" strokeWidth="2" />
      <ellipse cx="20" cy="38" rx="10" ry="8" fill={color} stroke="#1D1A39" strokeWidth="2" />
      {smile ? (
        <path d="M16 17 Q20 21 24 17" stroke="#1D1A39" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M16 19 Q20 16 24 19" stroke="#1D1A39" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
      <circle cx="16" cy="14" r="2" fill="#1D1A39" />
      <circle cx="24" cy="14" r="2" fill="#1D1A39" />
    </svg>
  );
}

// ─── Map Pin with Blob ────────────────────────────────────────────────────────
function MapPin({ color = "#AE445A", label = "", active = false }: { color?: string; label?: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center" style={{ filter: active ? "drop-shadow(0 0 8px " + color + ")" : undefined }}>
      <div
        className="rounded-full border-2 flex items-center justify-center"
        style={{ background: color, borderColor: "#1D1A39", width: 36, height: 36, boxShadow: active ? `0 0 16px ${color}88` : "0 2px 8px rgba(0,0,0,0.4)" }}
      >
        <BlobChar color="#fff" size={22} />
      </div>
      <div style={{ width: 2, height: 8, background: color, margin: "0 auto" }} />
      <div style={{ width: 6, height: 3, borderRadius: 9999, background: color, opacity: 0.4 }} />
      {label && (
        <div className="text-xs font-bold mt-1 px-2 py-0.5 rounded-full" style={{ background: color, color: "#fff", fontSize: 10 }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone, autoAdvance = true }: { onDone: () => void; autoAdvance?: boolean }) {
  useEffect(() => {
    if (!autoAdvance) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [autoAdvance, onDone]);

  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: "linear-gradient(160deg, #1D1A39 0%, #451952 60%, #662549 100%)" }}>
      <div className="animate-float flex flex-col items-center">
        <img src={logoImg} alt="Sociable logo" className="rounded-full object-cover" style={{ width: 180, height: 180, border: "4px solid #AE445A", boxShadow: "0 0 40px rgba(174,68,90,0.6)" }} />
        <h1 className="font-display text-5xl font-bold mt-6" style={{ color: "#E8BCB9", letterSpacing: 3 }}>SOCIABLE</h1>
        <p className="mt-2 text-sm font-medium" style={{ color: "#F39F5A" }}>Conexões em Círculo ✦</p>
      </div>
      <div className="mt-12 flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded-full animate-pulse" style={{ width: 8, height: 8, background: "#AE445A", animationDelay: `${i * 0.3}s`, opacity: 0.7 }} />
        ))}
      </div>
    </div>
  );
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(180deg, #1D1A39 0%, #2A1F4A 100%)" }}>
      {/* Hero */}
      <div className="flex flex-col items-center px-6" style={{ paddingTop: 24, paddingBottom: 12 }}>
        <img src={logoImg} alt="Sociable" className="rounded-full object-cover" style={{ width: 80, height: 80, border: "3px solid #AE445A" }} />
        <h1 className="font-display text-3xl font-bold mt-3 text-center" style={{ color: "#E8BCB9" }}>Bem-vindo ao<br /><span style={{ color: "#AE445A" }}>Sociable</span></h1>
        <p className="text-center mt-2 text-xs leading-relaxed" style={{ color: "#9B7B8A" }}>
          Encontre pessoas para curtir festas, eventos e rolês. Sem compromisso, só diversão. 🎉
        </p>

      </div>

      {/* Event preview card */}
      <div className="mx-6">
        <div className="flex items-center gap-3 rounded-2xl px-3 py-2.5"
          style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.2)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "#66254933" }}>
            🍹
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate" style={{ color: "#E8BCB9" }}>Barzinho do Centro · Vila Madalena</p>
            <p className="text-xs mt-0.5" style={{ color: "#9B7B8A" }}>Amanhã · 21h · 15 pessoas</p>
          </div>
          <BlobChar color="#662549" size={26} />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 pt-4 flex flex-col gap-2.5">
        {/* Gmail */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-3"
          style={{ background: "#fff", color: "#1a1a1a", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z" fill="#FFC107"/>
            <path d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00"/>
            <path d="M24 44c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.3 35.5 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.6 5C9.6 39.7 16.3 44 24 44z" fill="#4CAF50"/>
            <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C41.3 36.5 44 30.7 44 24c0-1.2-.1-2.5-.4-3.5z" fill="#1976D2"/>
          </svg>
          Entrar / Cadastrar com Gmail
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.25)" }} />
          <span className="text-xs font-semibold" style={{ color: "#9B7B8A" }}>ou</span>
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.25)" }} />
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-display font-bold text-lg transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #AE445A, #662549)", color: "#fff", boxShadow: "0 4px 24px rgba(174,68,90,0.5)" }}
        >
          Criar minha conta 🎉
        </button>
        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95"
          style={{ border: "1.5px solid rgba(174,68,90,0.4)", color: "#E8BCB9", background: "transparent" }}
        >
          Já tenho conta · Entrar
        </button>
        <p className="text-center text-xs" style={{ color: "#9B7B8A" }}>
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}

// ─── Onboarding Shell ─────────────────────────────────────────────────────────
function OnboardingShell({ step, total, children, onBack }: { step: number; total: number; children: React.ReactNode; onBack?: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#1D1A39" }}>
      <div className="px-5 pb-4 flex items-center gap-3" style={{ paddingTop: 16 }}>
        {onBack && (
          <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90" style={{ background: "#2A1F4A" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#E8BCB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="flex-1 h-1.5 rounded-full" style={{ background: "#2A1F4A" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(step / total) * 100}%`, background: "linear-gradient(90deg, #AE445A, #F39F5A)" }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: "#9B7B8A" }}>{step}/{total}</span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6">
        {children}
      </div>
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-2xl font-display font-bold text-lg transition-all active:scale-95"
      style={{
        background: disabled ? "#2A1F4A" : "linear-gradient(135deg, #AE445A, #662549)",
        color: disabled ? "#9B7B8A" : "#fff",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(174,68,90,0.4)",
      }}
    >
      {children}
    </button>
  );
}

// ─── Name Step ────────────────────────────────────────────────────────────────
function NameStep({ onNext, onBack }: { onNext: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState("");
  return (
    <OnboardingShell step={1} total={6} onBack={onBack}>
      <div className="animate-slide-up">
        <h2 className="font-display text-3xl font-bold mt-4" style={{ color: "#E8BCB9" }}>Qual é o seu nome?</h2>
        <p className="text-sm mt-2 mb-8" style={{ color: "#9B7B8A" }}>Vamos nos conhecer 👋 Isso aparecerá no seu perfil</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Seu primeiro nome"
          className="w-full px-4 py-4 rounded-2xl text-lg font-semibold outline-none transition-all"
          style={{ background: "#2A1F4A", color: "#E8BCB9", border: "2px solid", borderColor: name ? "#AE445A" : "rgba(174,68,90,0.2)" }}
          autoFocus
        />
        <div className="mt-8">
          <PrimaryBtn onClick={() => name.trim() && onNext(name.trim())} disabled={!name.trim()}>
            Próximo →
          </PrimaryBtn>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ─── Age Step ─────────────────────────────────────────────────────────────────
function AgeStep({ onNext, onBack }: { onNext: (age: number) => void; onBack: () => void }) {
  const [birth, setBirth] = useState("");
  const [error, setError] = useState("");

  const check = () => {
    const d = new Date(birth);
    const age = new Date().getFullYear() - d.getFullYear();
    if (isNaN(d.getTime())) { setError("Data inválida"); return; }
    if (age < 18) { setError("Você precisa ter 18 anos ou mais para usar o Sociable 🔞"); return; }
    onNext(age);
  };

  return (
    <OnboardingShell step={2} total={6} onBack={onBack}>
      <div className="animate-slide-up">
        <h2 className="font-display text-3xl font-bold mt-4" style={{ color: "#E8BCB9" }}>Qual é a sua data de nascimento?</h2>
        <p className="text-sm mt-2 mb-8" style={{ color: "#9B7B8A" }}>O Sociable é exclusivo para maiores de 18 anos 🔞</p>
        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={birth}
            onChange={e => { setBirth(e.target.value); setError(""); }}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
            className="w-full px-4 py-4 rounded-2xl text-lg font-semibold outline-none"
            style={{ background: "#2A1F4A", color: "#E8BCB9", border: "2px solid", borderColor: error ? "#F39F5A" : birth ? "#AE445A" : "rgba(174,68,90,0.2)", colorScheme: "dark" }}
          />
          {error && <p className="text-sm font-semibold" style={{ color: "#F39F5A" }}>⚠️ {error}</p>}
          <div className="rounded-2xl p-4 flex gap-3 items-start" style={{ background: "#2A1F4A", border: "1px solid rgba(174,68,90,0.2)" }}>
            <span className="text-lg">🔒</span>
            <p className="text-xs leading-relaxed" style={{ color: "#9B7B8A" }}>Sua data de nascimento não é exibida no perfil. Apenas sua idade é visível para outros usuários.</p>
          </div>
        </div>
        <div className="mt-8">
          <PrimaryBtn onClick={check} disabled={!birth}>Próximo →</PrimaryBtn>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ─── Location Step ────────────────────────────────────────────────────────────
const CITIES = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Salvador, BA", "Curitiba, PR", "Manaus, AM", "Recife, PE", "Fortaleza, CE", "Porto Alegre, RS", "Brasília, DF", "Belém, PA", "Campinas, SP"];

function LocationStep({ onNext, onBack }: { onNext: (city: string) => void; onBack: () => void }) {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const filtered = CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <OnboardingShell step={3} total={6} onBack={onBack}>
      <div className="animate-slide-up">
        <h2 className="font-display text-3xl font-bold mt-4" style={{ color: "#E8BCB9" }}>Onde você mora?</h2>
        <p className="text-sm mt-2 mb-6" style={{ color: "#9B7B8A" }}>Encontre rolês e pessoas na sua cidade 📍</p>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar cidade..."
          className="w-full px-4 py-3.5 rounded-2xl text-base outline-none mb-4"
          style={{ background: "#2A1F4A", color: "#E8BCB9", border: "2px solid rgba(174,68,90,0.2)" }}
        />
        <div className="flex flex-col gap-2">
          {filtered.map(c => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all"
              style={{
                background: city === c ? "linear-gradient(135deg, #AE445A22, #66254922)" : "#2A1F4A",
                border: "2px solid",
                borderColor: city === c ? "#AE445A" : "transparent",
                color: "#E8BCB9",
              }}
            >
              <span>📍</span>
              <span className="font-semibold text-sm">{c}</span>
              {city === c && <span className="ml-auto" style={{ color: "#AE445A" }}>✓</span>}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryBtn onClick={() => city && onNext(city)} disabled={!city}>Próximo →</PrimaryBtn>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ─── Interests Step ───────────────────────────────────────────────────────────
const INTERESTS = [
  { emoji: "🎶", label: "Música ao Vivo" }, { emoji: "🕺", label: "Balada" }, { emoji: "🍹", label: "Barzinho" },
  { emoji: "🎉", label: "Festas" }, { emoji: "🛍️", label: "Shopping" }, { emoji: "🎭", label: "Teatro" },
  { emoji: "🏋️", label: "Academia" }, { emoji: "🎮", label: "Games" }, { emoji: "🎨", label: "Arte" },
  { emoji: "🍕", label: "Gastronomia" }, { emoji: "📸", label: "Fotografia" }, { emoji: "🌊", label: "Praia" },
  { emoji: "⚽", label: "Esportes" }, { emoji: "🤝", label: "Networking" }, { emoji: "🎤", label: "Karaokê" },
  { emoji: "🌙", label: "Noitada" }, { emoji: "🎪", label: "Festival" }, { emoji: "☕", label: "Café" },
];

function InterestsStep({ onNext, onBack }: { onNext: (interests: string[]) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (l: string) => setSelected(s => s.includes(l) ? s.filter(x => x !== l) : s.length < 10 ? [...s, l] : s);

  return (
    <OnboardingShell step={4} total={6} onBack={onBack}>
      <div className="animate-slide-up">
        <h2 className="font-display text-3xl font-bold mt-4" style={{ color: "#E8BCB9" }}>O que você curte?</h2>
        <p className="text-sm mt-2 mb-6" style={{ color: "#9B7B8A" }}>Escolha até 10 interesses para o seu perfil</p>
        <div className="grid grid-cols-2 gap-2">
          {INTERESTS.map(({ emoji, label }) => {
            const on = selected.includes(label);
            return (
              <button key={label} onClick={() => toggle(label)} className="flex items-center gap-2 px-3 py-3 rounded-2xl transition-all active:scale-95"
                style={{ background: on ? "linear-gradient(135deg, #AE445A, #662549)" : "#2A1F4A", border: "2px solid", borderColor: on ? "#AE445A" : "transparent", color: on ? "#fff" : "#E8BCB9" }}>
                <span className="text-xl">{emoji}</span>
                <span className="font-semibold text-sm">{label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-center mt-4" style={{ color: "#9B7B8A" }}>{selected.length}/10 selecionados</p>
        <div className="mt-4">
          <PrimaryBtn onClick={() => selected.length > 0 && onNext(selected)} disabled={selected.length === 0}>Próximo →</PrimaryBtn>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ─── Blob placeholder SVG for profile ────────────────────────────────────────
function BlobAvatar({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Body */}
      <ellipse cx="60" cy="52" rx="36" ry="38" fill="#AE445A" stroke="#1D1A39" strokeWidth="3" />
      <ellipse cx="60" cy="96" rx="28" ry="22" fill="#AE445A" stroke="#1D1A39" strokeWidth="3" />
      {/* Face */}
      <circle cx="48" cy="46" r="5.5" fill="#1D1A39" />
      <circle cx="72" cy="46" r="5.5" fill="#1D1A39" />
      <circle cx="50" cy="44" r="2" fill="#fff" opacity="0.6" />
      <circle cx="74" cy="44" r="2" fill="#fff" opacity="0.6" />
      <path d="M50 58 Q60 66 70 58" stroke="#1D1A39" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Sparkles */}
      <path d="M18 20 L20 14 L22 20 L28 22 L22 24 L20 30 L18 24 L12 22 Z" fill="#F39F5A" opacity="0.9" />
      <path d="M94 30 L95.5 26 L97 30 L101 31.5 L97 33 L95.5 37 L94 33 L90 31.5 Z" fill="#F39F5A" opacity="0.7" />
      <circle cx="100" cy="18" r="2.5" fill="#F39F5A" opacity="0.6" />
      <circle cx="22" cy="96" r="2" fill="#F39F5A" opacity="0.5" />
    </svg>
  );
}

// ─── Photo Step ───────────────────────────────────────────────────────────────
const AI_AVATARS = [
  { id: 1, url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&auto=format", label: "Júlia" },
  { id: 2, url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format", label: "Mariana" },
  { id: 3, url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&auto=format", label: "Camila" },
];

function PhotoStep({ name, onNext, onBack }: { name: string; onNext: (avatar: string) => void; onBack: () => void }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <OnboardingShell step={5} total={6} onBack={onBack}>
      <div className="animate-slide-up">
        <h2 className="font-display text-3xl font-bold mt-4" style={{ color: "#E8BCB9" }}>Sua foto de perfil</h2>
        <p className="text-sm mt-2 mb-5" style={{ color: "#9B7B8A" }}>
          Adicione uma foto sua para {name} aparecer no mapa! 📍
        </p>

        {/* Preview */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="rounded-full overflow-hidden flex items-center justify-center animate-pulse-glow"
              style={{ width: 120, height: 120, border: "4px solid #AE445A", background: "#2A1F4A" }}>
              {photo
                ? <img src={photo} alt="Sua foto" className="w-full h-full object-cover" />
                : <BlobAvatar size={110} />
              }
            </div>
            {/* Upload trigger badge */}
            <button
              onClick={() => inputRef.current?.click()}
              className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ width: 34, height: 34, background: "#AE445A", border: "2.5px solid #1D1A39" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 21H4M20 16v5H4v-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Label */}
        {!photo && (
          <p className="text-xs text-center mb-4" style={{ color: "#9B7B8A" }}>
            O bonequinho é temporário — adicione sua foto abaixo ✨
          </p>
        )}
        {photo && (
          <p className="text-xs text-center mb-4 font-semibold" style={{ color: "#4ade80" }}>
            ✓ Foto adicionada! Ficou ótima 🎉
          </p>
        )}

        {/* Upload button */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 mb-3"
          style={{ background: "#2A1F4A", border: "2px dashed rgba(174,68,90,0.5)", color: "#AE445A" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#AE445A" strokeWidth="1.8" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="#AE445A" />
            <path d="M3 15l5-5 4 4 3-3 6 6" stroke="#AE445A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {photo ? "Trocar foto da galeria" : "Escolher foto da galeria 📷"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.2)" }} />
          <span className="text-xs" style={{ color: "#9B7B8A" }}>ou continue com bonequinho</span>
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.2)" }} />
        </div>

        <div>
          <PrimaryBtn onClick={() => onNext(photo ?? "blob")}>
            Criar minha conta 🎉
          </PrimaryBtn>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ─── Styled Map Screen ────────────────────────────────────────────────────────
const MAP_PINS = [
  { x: "22%", y: "30%", color: "#AE445A", label: "Festa", name: "Bia", active: true, event: "Sunset Party" },
  { x: "55%", y: "20%", color: "#662549", label: "Show", name: "Leo", active: false, event: "Jazz ao Vivo" },
  { x: "70%", y: "45%", color: "#F39F5A", label: "Bar", name: "Ana", active: true, event: "Barzinho" },
  { x: "35%", y: "60%", color: "#451952", label: "Club", name: "Kai", active: false, event: "Balada Tech" },
  { x: "80%", y: "28%", color: "#AE445A", label: "Rolê", name: "Max", active: true, event: "Skate na Praça" },
  { x: "15%", y: "65%", color: "#662549", label: "Show", name: "Pri", active: false, event: "Pop Show" },
  { x: "60%", y: "70%", color: "#F39F5A", label: "Arte", name: "Dé", active: true, event: "Expo Arte" },
];

const MAP_PEOPLE = [
  { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format", name: "Júlia, 22", dist: "0.3km", tag: "🎶 Música" },
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", name: "Rafael, 25", dist: "0.8km", tag: "🕺 Balada" },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format", name: "Camila, 23", dist: "1.2km", tag: "🍹 Barzinho" },
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format", name: "Mariana, 21", dist: "1.5km", tag: "🎨 Arte" },
];

function MapScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between" style={{ background: "#1D1A39" }}>
        <div>
          <h2 className="font-display font-bold text-xl" style={{ color: "#E8BCB9" }}>Perto de você</h2>
          <p className="text-xs" style={{ color: "#9B7B8A" }}>São Paulo · Vila Madalena</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold"
          style={{ background: "#2A1F4A", color: "#F39F5A", border: "1px solid rgba(243,159,90,0.3)" }}>
          <span>📍</span> Agora
        </button>
      </div>

      {/* Map area */}
      <div className="relative flex-1 mx-3 rounded-3xl overflow-hidden" style={{ background: "#0F0C1E", border: "1.5px solid rgba(174,68,90,0.2)" }}>
        {/* Stylized map grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
          {/* Streets */}
          <rect width="400" height="320" fill="#0F0C1E" />
          {/* Main roads */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#1D1A39" strokeWidth="12" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#1D1A39" strokeWidth="8" />
          <line x1="100" y1="0" x2="100" y2="320" stroke="#1D1A39" strokeWidth="10" />
          <line x1="250" y1="0" x2="250" y2="320" stroke="#1D1A39" strokeWidth="8" />
          <line x1="350" y1="0" x2="350" y2="320" stroke="#1D1A39" strokeWidth="6" />
          <line x1="0" y1="280" x2="400" y2="280" stroke="#1D1A39" strokeWidth="6" />
          {/* Secondary roads */}
          <line x1="0" y1="150" x2="250" y2="150" stroke="#1A1730" strokeWidth="5" />
          <line x1="175" y1="0" x2="175" y2="200" stroke="#1A1730" strokeWidth="5" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#1A1730" strokeWidth="4" />
          {/* Blocks / areas */}
          <rect x="5" y="5" width="90" height="90" rx="6" fill="#150E2E" />
          <rect x="110" y="5" width="85" height="90" rx="6" fill="#150E2E" />
          <rect x="260" y="5" width="85" height="90" rx="6" fill="#150E2E" />
          <rect x="5" y="110" width="90" height="85" rx="6" fill="#150E2E" />
          <rect x="110" y="110" width="60" height="35" rx="4" fill="#150E2E" />
          <rect x="110" y="160" width="60" height="35" rx="4" fill="#150E2E" />
          <rect x="180" y="110" width="65" height="85" rx="6" fill="#150E2E" />
          <rect x="260" y="110" width="85" height="85" rx="6" fill="#150E2E" />
          <rect x="5" y="210" width="90" height="65" rx="6" fill="#150E2E" />
          <rect x="110" y="210" width="130" height="65" rx="6" fill="#150E2E" />
          <rect x="260" y="210" width="85" height="65" rx="6" fill="#150E2E" />
          {/* Park area */}
          <rect x="360" y="5" width="35" height="90" rx="4" fill="#1A2E1A" opacity="0.7" />
          <circle cx="377" cy="30" r="8" fill="#1E3A1E" opacity="0.8" />
          <circle cx="370" cy="50" r="6" fill="#1E3A1E" opacity="0.8" />
          <circle cx="385" cy="60" r="7" fill="#1E3A1E" opacity="0.8" />
          {/* Glow streets */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#AE445A" strokeWidth="1" opacity="0.15" />
          <line x1="100" y1="0" x2="100" y2="320" stroke="#AE445A" strokeWidth="1" opacity="0.1" />
          <line x1="250" y1="0" x2="250" y2="320" stroke="#AE445A" strokeWidth="1" opacity="0.08" />
          {/* My location pulse */}
          <circle cx="200" cy="180" r="18" fill="#AE445A" opacity="0.1" className="animate-ping" />
          <circle cx="200" cy="180" r="10" fill="#AE445A" opacity="0.2" />
          <circle cx="200" cy="180" r="6" fill="#AE445A" opacity="0.8" />
          <circle cx="200" cy="180" r="3" fill="#fff" />
        </svg>

        {/* Map pins */}
        {MAP_PINS.map((pin, i) => (
          <div
            key={i}
            className="absolute cursor-pointer"
            style={{ left: pin.x, top: pin.y, transform: "translate(-50%,-100%)", zIndex: selected === i ? 20 : 10 }}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className={pin.active ? "animate-bounce-pin" : ""} style={{ animationDelay: `${i * 0.3}s` }}>
              <MapPin color={pin.color} label={pin.label} active={selected === i} />
            </div>
          </div>
        ))}

        {/* Selected pin tooltip */}
        {selected !== null && (
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-3 animate-slide-up"
            style={{ background: "rgba(42,31,74,0.95)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(174,68,90,0.4)", zIndex: 30 }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: MAP_PINS[selected].color }}>
                <BlobChar color="#fff" size={28} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "#E8BCB9" }}>{MAP_PINS[selected].event}</p>
                <p className="text-xs" style={{ color: "#9B7B8A" }}>{MAP_PINS[selected].name} está aqui · Agora</p>
              </div>
              <button className="px-3 py-1.5 rounded-xl font-bold text-xs" style={{ background: MAP_PINS[selected].color, color: "#fff" }}>
                Chat
              </button>
            </div>
          </div>
        )}

        {/* Zoom controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {["+", "−"].map(s => (
            <button key={s} className="w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center"
              style={{ background: "rgba(42,31,74,0.9)", color: "#E8BCB9", border: "1px solid rgba(174,68,90,0.3)" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* People nearby */}
      <div className="px-3 mt-3 mb-2">
        <div className="flex items-center justify-between mb-2.5">
          <p className="font-display font-bold text-sm" style={{ color: "#E8BCB9" }}>Pessoas por perto</p>
          <button className="text-xs font-semibold" style={{ color: "#AE445A" }}>Ver todos</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {MAP_PEOPLE.map((p, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl"
              style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)", minWidth: 90 }}>
              <div className="relative">
                <img src={p.url} alt={p.name} className="rounded-full object-cover" style={{ width: 48, height: 48 }} />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "#4ade80", borderColor: "#2A1F4A" }} />
              </div>
              <p className="font-bold text-xs text-center" style={{ color: "#E8BCB9" }}>{p.name}</p>
              <p className="text-xs" style={{ color: "#9B7B8A" }}>{p.dist}</p>
              <div className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(174,68,90,0.15)", color: "#AE445A", fontSize: 10 }}>{p.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Events Screen ────────────────────────────────────────────────────────────
const EVENTS = [
  { emoji: "🎶", title: "Noite Eletrônica Secreta", place: "Loft Bom Retiro · SP", time: "Sex · 23h", tag: "Exclusivo", tagColor: "#AE445A", going: 47, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=160&fit=crop&auto=format" },
  { emoji: "🕺", title: "Baile Charme · Ep. 12", place: "Quadra da Glória · RJ", time: "Sáb · 20h", tag: "Gratuito", tagColor: "#4ade80", going: 128, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=160&fit=crop&auto=format" },
  { emoji: "🎤", title: "Karaokê Neon Underground", place: "Bar do Alemão · SP", time: "Sáb · 22h", tag: "Novo", tagColor: "#F39F5A", going: 23, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=160&fit=crop&auto=format" },
  { emoji: "🌊", title: "Rave na Represa", place: "Guarapiranga · SP", time: "Dom · 14h", tag: "Exclusivo", tagColor: "#AE445A", going: 89, img: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=300&h=160&fit=crop&auto=format" },
  { emoji: "🎨", title: "Expo Arte + Drinks", place: "Galeria Rebouças · SP", time: "Sex · 19h", tag: "Cultural", tagColor: "#662549", going: 34, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=160&fit=crop&auto=format" },
];

function EventsScreen() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Hoje", "Grátis", "Exclusivos", "Perto"];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-3" style={{ background: "#1D1A39" }}>
        <h2 className="font-display font-bold text-xl" style={{ color: "#E8BCB9" }}>Eventos 🎪</h2>
        <p className="text-xs mt-0.5 mb-3" style={{ color: "#9B7B8A" }}>Rolês não divulgados · Só quem é do circle sabe</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ background: filter === f ? "#AE445A" : "#2A1F4A", color: filter === f ? "#fff" : "#9B7B8A" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Add event CTA */}
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl mb-4 mt-3 transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, rgba(174,68,90,0.2), rgba(102,37,73,0.2))", border: "2px dashed rgba(174,68,90,0.4)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(174,68,90,0.2)" }}>➕</div>
          <div className="text-left">
            <p className="font-bold text-sm" style={{ color: "#AE445A" }}>Divulgar um evento secreto</p>
            <p className="text-xs" style={{ color: "#9B7B8A" }}>Só visível para o seu círculo</p>
          </div>
        </button>

        {EVENTS.map((ev, i) => (
          <div key={i} className="rounded-3xl overflow-hidden mb-4" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)" }}>
            <div className="relative h-36 overflow-hidden">
              <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,31,74,0.95) 0%, transparent 60%)" }} />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: ev.tagColor, fontSize: 11, color: "#fff", fontWeight: 700 }}>
                {ev.tag}
              </div>
              <div className="absolute top-3 right-3 text-2xl">{ev.emoji}</div>
            </div>
            <div className="px-4 pt-3 pb-4">
              <h3 className="font-display font-bold text-base" style={{ color: "#E8BCB9" }}>{ev.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs" style={{ color: "#9B7B8A" }}>📍 {ev.place}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#AE445A", "#662549", "#F39F5A"].map((c, j) => (
                      <div key={j} className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ background: c, borderColor: "#2A1F4A" }}>
                        <BlobChar color="#fff" size={14} />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "#9B7B8A" }}>{ev.going} indo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: "#F39F5A" }}>🕐 {ev.time}</span>
                  <button className="px-3 py-1.5 rounded-xl font-bold text-xs" style={{ background: "linear-gradient(135deg, #AE445A, #662549)", color: "#fff" }}>
                    Quero ir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Chat da Cidade ───────────────────────────────────────────────────────────
const CITY_CHAT_MSGS = [
  { id: 1, avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format", name: "Júlia", text: "Alguém vai na Noite Eletrônica hoje? 🎉", time: "22:10", color: "#AE445A" },
  { id: 2, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", name: "Rafael", text: "Eu vou! Começa às 23h no Bom Retiro 🕺", time: "22:11", color: "#662549" },
  { id: 3, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format", name: "Mariana", text: "Posso levar uma amiga? A entrada é paga?", time: "22:12", color: "#F39F5A" },
  { id: 4, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format", name: "Camila", text: "Entrada gratuita até meia-noite! Vai ser épico 🔥", time: "22:13", color: "#AE445A" },
  { id: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", name: "Lucas", text: "Tem estacionamento perto? Prefiro ir de Uber mesmo", time: "22:14", color: "#451952" },
  { id: 6, avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format", name: "Júlia", text: "Uber é melhor! A rua fica cheia 🚗💨", time: "22:15", color: "#AE445A" },
];

const CITY_ONLINE_COUNT = 1_284;

function CityChatScreen({ city = "São Paulo, SP", onBack }: { city?: string; onBack: () => void }) {
  const [msgs, setMsgs] = useState(CITY_CHAT_MSGS);
  const [msg, setMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [onlineCount] = useState(CITY_ONLINE_COUNT);

  const send = () => {
    const text = msg.trim();
    if (!text) return;
    setMsgs(m => [...m, {
      id: Date.now(),
      avatar: "",
      name: "Você",
      text,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      color: "#AE445A",
    }]);
    setMsg("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter") send(); };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{ background: "#1D1A39", borderBottom: "1px solid rgba(174,68,90,0.15)" }}>
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#2A1F4A" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#E8BCB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {/* City icon */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: "linear-gradient(135deg, #AE445A, #662549)", boxShadow: "0 0 12px rgba(174,68,90,0.5)" }}>
          🏙️
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: "#E8BCB9" }}>Chat · {city.split(",")[0]}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="animate-pulse" style={{ color: "#4ade80", fontSize: 8 }}>●</span>
            <p className="text-xs font-semibold" style={{ color: "#4ade80" }}>{onlineCount.toLocaleString("pt-BR")} pessoas online agora</p>
          </div>
        </div>
        <div className="flex -space-x-1.5 flex-shrink-0">
          {["#AE445A", "#662549", "#F39F5A", "#451952"].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-full border flex items-center justify-center"
              style={{ background: c, borderColor: "#1D1A39" }}>
              <BlobChar color="#fff" size={12} />
            </div>
          ))}
        </div>
      </div>

      {/* Pinned info */}
      <div className="mx-3 mt-2 px-3 py-2 rounded-xl flex items-center gap-2"
        style={{ background: "rgba(174,68,90,0.1)", border: "1px solid rgba(174,68,90,0.25)" }}>
        <span style={{ fontSize: 13 }}>📌</span>
        <p className="text-xs" style={{ color: "#9B7B8A" }}>Chat público da cidade · Seja respeitoso com todos ✨</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 flex flex-col gap-3">
        {msgs.map((m) => {
          const isMe = m.name === "Você";
          return (
            <div key={m.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
              {!isMe && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden flex items-center justify-center mt-0.5"
                  style={{ background: m.color, border: `1.5px solid ${m.color}` }}>
                  {m.avatar
                    ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                    : <BlobChar color="#fff" size={16} />
                  }
                </div>
              )}
              <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[75%]`}>
                {!isMe && (
                  <span className="text-xs font-bold mb-0.5 px-1" style={{ color: m.color }}>{m.name}</span>
                )}
                <div className="px-3 py-2 rounded-2xl"
                  style={{
                    background: isMe ? "linear-gradient(135deg, #AE445A, #662549)" : "#2A1F4A",
                    color: "#E8BCB9",
                    borderBottomRightRadius: isMe ? 4 : undefined,
                    borderBottomLeftRadius: !isMe ? 4 : undefined,
                  }}>
                  <p className="text-sm leading-snug">{m.text}</p>
                </div>
                <span className="text-xs mt-0.5 px-1" style={{ color: "#9B7B8A", opacity: 0.7 }}>{m.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 flex gap-2 items-center" style={{ borderTop: "1px solid rgba(174,68,90,0.12)" }}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Mensagem para a cidade..."
          className="flex-1 px-4 py-2.5 rounded-2xl text-sm outline-none"
          style={{ background: "#2A1F4A", color: "#E8BCB9", border: "1.5px solid rgba(174,68,90,0.2)" }}
        />
        <button
          onClick={send}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: msg.trim() ? "linear-gradient(135deg, #AE445A, #662549)" : "#2A1F4A", opacity: msg.trim() ? 1 : 0.5 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l12-6-6 12-2-4-4-2z" fill="white" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Chat Screen ──────────────────────────────────────────────────────────────
const CHATS = [
  { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format", name: "Júlia", last: "Oi! Vai na festa hoje? 🎉", time: "22:14", unread: 3, color: "#AE445A", online: true },
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format", name: "Rafael", last: "Combinado! Te vejo lá 🕺", time: "21:50", unread: 0, color: "#662549", online: true },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format", name: "Camila", last: "Qual balada você vai na sexta?", time: "20:03", unread: 1, color: "#F39F5A", online: false },
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format", name: "Mariana", last: "Posso levar uma amiga também?", time: "19:45", unread: 0, color: "#451952", online: true },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", name: "Lucas", last: "Valeu pela dica do evento!", time: "18:30", unread: 0, color: "#AE445A", online: false },
];

const CONV_MSGS = [
  { from: "them", text: "Oi! Você vai na Noite Eletrônica hoje? 🎉", time: "22:10" },
  { from: "me", text: "Sim!! Tô animada demais 🕺✨", time: "22:11" },
  { from: "them", text: "Que ótimo! A gente pode se encontrar lá e curtir junto?", time: "22:12" },
  { from: "me", text: "Claro! Combinamos o ponto de encontro pelo mapa 📍", time: "22:13" },
  { from: "them", text: "Perfeito! Vejo você às 23h perto da entrada 🎶", time: "22:14" },
];

function ChatScreen({
  city = "São Paulo, SP",
  initialMode = "list",
  initialChatIndex = 0,
}: {
  city?: string;
  initialMode?: ChatMode;
  initialChatIndex?: number;
}) {
  const [openChat, setOpenChat] = useState<number | null>(initialMode === "direct" ? initialChatIndex : null);
  const [cityChat, setCityChat] = useState(initialMode === "city");
  const [msg, setMsg] = useState("");

  if (cityChat) {
    return <CityChatScreen city={city} onBack={() => setCityChat(false)} />;
  }

  if (openChat !== null) {
    const c = CHATS[openChat];
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{ background: "#1D1A39", borderBottom: "1px solid rgba(174,68,90,0.15)" }}>
          <button onClick={() => setOpenChat(null)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#2A1F4A" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#E8BCB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="relative">
            <img src={c.url} alt={c.name} className="rounded-full object-cover" style={{ width: 40, height: 40 }} />
            {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "#4ade80", borderColor: "#1D1A39" }} />}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: "#E8BCB9" }}>{c.name}</p>
            <p className="text-xs" style={{ color: c.online ? "#4ade80" : "#9B7B8A" }}>{c.online ? "Online agora" : "Offline"}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#2A1F4A" }}>📍</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-3">
          {CONV_MSGS.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-xs px-4 py-2.5 rounded-2xl" style={{
                background: m.from === "me" ? "linear-gradient(135deg, #AE445A, #662549)" : "#2A1F4A",
                color: "#E8BCB9",
                borderBottomRightRadius: m.from === "me" ? 4 : undefined,
                borderBottomLeftRadius: m.from === "them" ? 4 : undefined,
              }}>
                <p className="text-sm">{m.text}</p>
                <p className="text-xs mt-1 text-right opacity-60">{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4 pt-2 flex gap-2 items-center" style={{ borderTop: "1px solid rgba(174,68,90,0.15)" }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Mensagem..."
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: "#2A1F4A", color: "#E8BCB9", border: "1.5px solid rgba(174,68,90,0.2)" }} />
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background: "linear-gradient(135deg, #AE445A, #662549)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l12-6-6 12-2-4-4-2z" fill="white" /></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-3" style={{ background: "#1D1A39" }}>
        <h2 className="font-display font-bold text-xl" style={{ color: "#E8BCB9" }}>Mensagens 💬</h2>
        <p className="text-xs mt-0.5 mb-3" style={{ color: "#9B7B8A" }}>Combine o próximo rolê</p>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.2)" }}>
          <span style={{ color: "#9B7B8A" }}>🔍</span>
          <input placeholder="Buscar conversa..." className="flex-1 text-sm bg-transparent outline-none" style={{ color: "#E8BCB9" }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        {/* City Chat Banner */}
        <button
          onClick={() => setCityChat(true)}
          className="w-full mt-3 mb-1 rounded-2xl overflow-hidden transition-all active:scale-98"
          style={{ border: "1.5px solid rgba(174,68,90,0.35)" }}
        >
          <div className="relative px-4 py-3 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, rgba(174,68,90,0.22) 0%, rgba(102,37,73,0.18) 100%)" }}>
            {/* Animated pulse background */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 10% 50%, rgba(174,68,90,0.15) 0%, transparent 60%)" }} />
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl relative"
              style={{ background: "linear-gradient(135deg, #AE445A, #662549)", boxShadow: "0 0 16px rgba(174,68,90,0.5)" }}>
              🏙️
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#4ade80", border: "1.5px solid #1D1A39" }}>
                <span className="animate-pulse" style={{ color: "#fff", fontSize: 8, fontWeight: 900 }}>●</span>
              </div>
            </div>
            {/* Text */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-display font-bold text-sm" style={{ color: "#E8BCB9" }}>Chat · {city.split(",")[0]}</p>
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#AE445A", color: "#fff", fontSize: 9 }}>AO VIVO</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span style={{ color: "#4ade80", fontSize: 9 }}>●</span>
                <p className="text-xs font-semibold" style={{ color: "#4ade80" }}>
                  {CITY_ONLINE_COUNT.toLocaleString("pt-BR")} pessoas no chat agora
                </p>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "#9B7B8A" }}>
                Júlia: Alguém vai na Noite Eletrônica hoje? 🎉
              </p>
            </div>
            {/* Avatars */}
            <div className="flex -space-x-1.5 flex-shrink-0">
              {["#AE445A", "#662549", "#F39F5A"].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border flex items-center justify-center"
                  style={{ background: c, borderColor: "#1D1A39" }}>
                  <BlobChar color="#fff" size={14} />
                </div>
              ))}
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.12)" }} />
          <span className="text-xs font-semibold" style={{ color: "#9B7B8A" }}>Conversas diretas</span>
          <div className="flex-1 h-px" style={{ background: "rgba(174,68,90,0.12)" }} />
        </div>

        {CHATS.map((c, i) => (
          <button key={i} onClick={() => setOpenChat(i)} className="w-full flex items-center gap-3 py-3.5 transition-all active:scale-98"
            style={{ borderBottom: "1px solid rgba(174,68,90,0.08)" }}>
            <div className="relative flex-shrink-0">
              <img src={c.url} alt={c.name} className="rounded-full object-cover" style={{ width: 52, height: 52, border: `2px solid ${c.color}44` }} />
              {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2" style={{ background: "#4ade80", borderColor: "#1D1A39" }} />}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm" style={{ color: "#E8BCB9" }}>{c.name}</p>
                <p className="text-xs" style={{ color: "#9B7B8A" }}>{c.time}</p>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "#9B7B8A" }}>{c.last}</p>
            </div>
            {c.unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#AE445A" }}>
                <span className="text-xs font-bold text-white">{c.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ avatar, name, city, interests, age }: { avatar: string; name: string; city: string; interests: string[]; age: number }) {
  const [privacyDist, setPrivacyDist] = useState(true);
  const [privacyMsg, setPrivacyMsg] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const BIO_MAX = 160;

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* Profile header */}
      <div className="relative pb-6" style={{ background: "linear-gradient(160deg, #451952 0%, #1D1A39 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(174,68,90,0.3) 0%, transparent 70%)" }} />
        <div className="relative flex flex-col items-center pt-10 px-4">
          <div className="relative mb-3">
            <div className="rounded-full overflow-hidden flex items-center justify-center"
              style={{ width: 100, height: 100, border: "4px solid #AE445A", boxShadow: "0 0 24px rgba(174,68,90,0.5)", background: "#2A1F4A" }}>
              {avatar && avatar !== "blob"
                ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
                : <BlobAvatar size={92} />
              }
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#AE445A", border: "2px solid #1D1A39" }}>✨</div>
          </div>
          <h2 className="font-display font-bold text-2xl" style={{ color: "#E8BCB9" }}>{name}, {age}</h2>
          <p className="text-sm font-medium mt-1" style={{ color: "#9B7B8A" }}>📍 {city}</p>
          <div className="flex gap-4 mt-4">
            {[["12", "Amigos"], ["8", "Eventos"], ["42", "Rolês"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center">
                <span className="font-display font-bold text-lg" style={{ color: "#AE445A" }}>{n}</span>
                <span className="text-xs" style={{ color: "#9B7B8A" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-4 mt-4">
        {/* Interests */}
        <div className="rounded-2xl p-4" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)" }}>
          <p className="font-display font-bold text-sm mb-3" style={{ color: "#E8BCB9" }}>Meus interesses</p>
          <div className="flex flex-wrap gap-2">
            {(interests.length > 0 ? interests : ["🎶 Música", "🕺 Balada", "🍹 Barzinho"]).map(it => (
              <span key={it} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(174,68,90,0.2)", color: "#AE445A", border: "1px solid rgba(174,68,90,0.3)" }}>
                {it}
              </span>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl p-4" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)" }}>
          <p className="font-display font-bold text-sm mb-3" style={{ color: "#E8BCB9" }}>Privacidade</p>
          {[
            { label: "Mostrar Distância", desc: "Sua localização exata nunca é compartilhada", val: privacyDist, set: setPrivacyDist },
            { label: "Receber Mensagens", desc: "Outros podem te enviar mensagens", val: privacyMsg, set: setPrivacyMsg },
            { label: "Notificações de Eventos", desc: "Avisos de rolês perto de você", val: notifications, set: setNotifications },
          ].map(({ label, desc, val, set }) => (
            <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(174,68,90,0.08)" }}>
              <div className="flex-1 mr-4">
                <p className="font-semibold text-sm" style={{ color: "#E8BCB9" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9B7B8A" }}>{desc}</p>
              </div>
              <button onClick={() => set(!val)} className="relative w-12 h-6 rounded-full transition-all" style={{ background: val ? "#AE445A" : "#3D2060" }}>
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: val ? "calc(100% - 22px)" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
              </button>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="rounded-2xl p-4" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BlobChar color="#AE445A" size={22} />
              <p className="font-display font-bold text-sm" style={{ color: "#E8BCB9" }}>Sobre você</p>
            </div>
            <button
              onClick={() => setEditingBio(e => !e)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full transition-all active:scale-90"
              style={{ background: editingBio ? "rgba(174,68,90,0.25)" : "rgba(174,68,90,0.12)", color: "#AE445A" }}
            >
              {editingBio ? "Salvar" : "Editar"}
            </button>
          </div>
          {editingBio ? (
            <div>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value.slice(0, BIO_MAX))}
                placeholder="Conte sobre você, adoraríamos conhecer mais um ser sociável! 🎉"
                autoFocus
                rows={4}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                style={{ background: "#1D1A39", color: "#E8BCB9", border: "1.5px solid rgba(174,68,90,0.35)", fontFamily: "Nunito, sans-serif", lineHeight: 1.5 }}
              />
              <p className="text-right text-xs mt-1" style={{ color: "#9B7B8A" }}>{bio.length}/{BIO_MAX}</p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: bio ? "#E8BCB9" : "#9B7B8A", fontStyle: bio ? "normal" : "italic" }}>
              {bio || "Conte sobre você, adoraríamos conhecer mais um ser sociável! 🎉"}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#2A1F4A", border: "1.5px solid rgba(174,68,90,0.15)" }}>
          {[
            { icon: "✏️", label: "Editar Perfil" },
            { icon: "🔔", label: "Notificações" },
            { icon: "🛡️", label: "Segurança" },
            { icon: "❓", label: "Ajuda" },
          ].map(({ icon, label }, i, arr) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-4 transition-all active:bg-white/5"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(174,68,90,0.08)" : "none" }}>
              <span className="text-xl w-8">{icon}</span>
              <span className="font-semibold text-sm" style={{ color: "#E8BCB9" }}>{label}</span>
              <svg className="ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#9B7B8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ))}
        </div>

        <button className="w-full py-3.5 rounded-2xl font-semibold text-sm" style={{ border: "1.5px solid rgba(174,68,90,0.3)", color: "#AE445A" }}>
          Sair da conta
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function MainApp({
  avatar,
  name,
  city,
  interests,
  age,
  initialTab = "map",
  initialChatMode = "list",
  initialChatIndex = 0,
}: {
  avatar: string;
  name: string;
  city: string;
  interests: string[];
  age: number;
  initialTab?: Tab;
  initialChatMode?: ChatMode;
  initialChatIndex?: number;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);

  const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: "map", label: "Mapa",
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={a ? "#AE445A" : "none"} stroke={a ? "#AE445A" : "#9B7B8A"} strokeWidth="1.8" />
          <circle cx="12" cy="9" r="2.5" fill={a ? "#fff" : "#9B7B8A"} />
        </svg>
      )
    },
    {
      id: "events", label: "Eventos",
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill={a ? "#AE445A" : "none"} stroke={a ? "#AE445A" : "#9B7B8A"} strokeWidth="1.8" />
          <line x1="8" y1="2" x2="8" y2="6" stroke={a ? "#fff" : "#9B7B8A"} strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke={a ? "#fff" : "#9B7B8A"} strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" stroke={a ? "#fff" : "#9B7B8A"} strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: "chat", label: "Chat",
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill={a ? "#AE445A" : "none"} stroke={a ? "#AE445A" : "#9B7B8A"} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: "profile", label: "Perfil",
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={a ? "#AE445A" : "none"} stroke={a ? "#AE445A" : "#9B7B8A"} strokeWidth="1.8" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={a ? "#AE445A" : "#9B7B8A"} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#1D1A39" }}>
      <div className="flex-1 overflow-hidden">
        {tab === "map" && <MapScreen />}
        {tab === "events" && <EventsScreen />}
        {tab === "chat" && <ChatScreen city={city} initialMode={initialChatMode} initialChatIndex={initialChatIndex} />}
        {tab === "profile" && <ProfileScreen avatar={avatar} name={name} city={city} interests={interests} age={age} />}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-2"
        style={{
          background: "#1D1A39",
          borderTop: "1.5px solid rgba(174,68,90,0.2)",
          boxShadow: "0 -8px 32px rgba(29,26,57,0.9)",
          paddingTop: 8,
          paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
        }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all active:scale-90"
            style={{ background: tab === t.id ? "rgba(174,68,90,0.15)" : "transparent" }}>
            {t.icon(tab === t.id)}
            <span className="text-xs font-semibold" style={{ color: tab === t.id ? "#AE445A" : "#9B7B8A" }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Galaxy S23 Phone Frame ───────────────────────────────────────────────────
// Proportions based on Galaxy S23: 146.3 × 70.9 mm physical, 6.1" 19.5:9 screen
// Rendered at ~60% scale: phone 370 × 800px, screen 342 × 742px
function GalaxyS23Frame({ children }: { children: React.ReactNode }) {
  // Phone outer dimensions
  const PW = 370, PH = 800;
  // Screen insets inside chassis
  const SX = 14, SY = 16, SW = PW - SX * 2, SH = PH - SY - 26;
  const screenR = 36; // screen corner radius
  const phoneR = 44; // chassis corner radius

  return (
    <div style={{ position: "relative", width: PW, height: PH, flexShrink: 0 }}>

      {/* ── Ambient glow ── */}
      <div style={{
        position: "absolute", inset: -40, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(174,68,90,0.18) 0%, transparent 70%)",
        filter: "blur(32px)",
      }} />

      {/* ── Chassis shadow ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: phoneR, zIndex: 1,
        boxShadow: [
          "0 32px 64px rgba(0,0,0,0.75)",
          "0 8px 24px rgba(0,0,0,0.5)",
          "0 2px 8px rgba(174,68,90,0.12)",
        ].join(", "),
      }} />

      {/* ── Main chassis body ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: phoneR, zIndex: 2,
        background: "linear-gradient(160deg, #1c1c24 0%, #111118 40%, #0e0e14 100%)",
        border: "1px solid #2a2a38",
      }}>
        {/* Side sheen — left edge */}
        <div style={{
          position: "absolute", left: 0, top: "15%", width: 3, height: "70%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.03) 70%, transparent)",
          borderRadius: phoneR,
        }} />
        {/* Side sheen — right edge */}
        <div style={{
          position: "absolute", right: 0, top: "15%", width: 3, height: "70%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.02) 70%, transparent)",
        }} />
        {/* Top sheen */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 2,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          borderRadius: phoneR,
        }} />
      </div>

      {/* ── Volume buttons — left side ── */}
      {/* Silent/power top */}
      <div style={{
        position: "absolute", left: -3, top: 148, width: 3, height: 28,
        background: "linear-gradient(to right, #0a0a12, #1a1a24)",
        borderRadius: "2px 0 0 2px", zIndex: 3,
        boxShadow: "-2px 0 4px rgba(0,0,0,0.6)",
      }} />
      {/* Vol up */}
      <div style={{
        position: "absolute", left: -3, top: 196, width: 3, height: 56,
        background: "linear-gradient(to right, #0a0a12, #1a1a24)",
        borderRadius: "2px 0 0 2px", zIndex: 3,
        boxShadow: "-2px 0 4px rgba(0,0,0,0.6)",
      }} />
      {/* Vol down */}
      <div style={{
        position: "absolute", left: -3, top: 264, width: 3, height: 56,
        background: "linear-gradient(to right, #0a0a12, #1a1a24)",
        borderRadius: "2px 0 0 2px", zIndex: 3,
        boxShadow: "-2px 0 4px rgba(0,0,0,0.6)",
      }} />

      {/* ── Power button — right side ── */}
      <div style={{
        position: "absolute", right: -3, top: 210, width: 3, height: 68,
        background: "linear-gradient(to left, #0a0a12, #1a1a24)",
        borderRadius: "0 2px 2px 0", zIndex: 3,
        boxShadow: "2px 0 4px rgba(0,0,0,0.6)",
      }} />

      {/* ── Screen bezel ── */}
      <div style={{
        position: "absolute", left: SX, top: SY, width: SW, height: SH,
        borderRadius: screenR, zIndex: 4,
        background: "#000",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}>
        {/* Screen content */}
        <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", background: "#1D1A39" }}>
          <StatusBar />
          <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
            {children}
          </div>
          <GestureNav />
        </div>

        {/* Glass reflection overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: screenR, pointerEvents: "none", zIndex: 10,
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)",
        }} />
      </div>

      {/* ── Bottom chin / home area ── */}
      <div style={{
        position: "absolute", bottom: 0, left: SX, right: SX, height: 26,
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5,
      }}>
        {/* Gesture pill */}
        <div style={{
          width: 100, height: 4, borderRadius: 9999,
          background: "rgba(255,255,255,0.18)",
        }} />
      </div>

      {/* ── Rear camera bump silhouette (decorative) ── */}
      <div style={{
        position: "absolute", top: 28, right: 22, zIndex: 2,
        display: "flex", flexDirection: "column", gap: 5,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: "50%",
            background: "radial-gradient(circle, #1e1e2a 60%, #0a0a12 100%)",
            border: "1px solid #2a2a38",
            boxShadow: "0 0 4px rgba(0,0,0,0.8)",
          }} />
        ))}
        <div style={{
          width: 8, height: 8, borderRadius: "50%", marginLeft: 2,
          background: "radial-gradient(circle, #c9a227 0%, #8a6e10 100%)",
          border: "1px solid #2a2a38",
        }} />
      </div>

      {/* ── Speaker grille top ── */}
      <div style={{ position: "absolute", top: SY + 6, left: "50%", transform: "translateX(-50%)", zIndex: 6, display: "flex", gap: 2.5 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ width: 2, height: 6, borderRadius: 1, background: "rgba(0,0,0,0.7)" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Android Status Bar ───────────────────────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours().toString().padStart(2, "0")}:${n.getMinutes().toString().padStart(2, "0")}`;
  });
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours().toString().padStart(2, "0")}:${n.getMinutes().toString().padStart(2, "0")}`);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: 36, background: "transparent", position: "relative", zIndex: 50, display: "flex", alignItems: "center", paddingLeft: 16, paddingRight: 16 }}>
      <span className="font-bold" style={{ color: "#E8BCB9", fontSize: 12 }}>{time}</span>
      {/* Punch-hole camera — centered */}
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: 13, height: 13, borderRadius: "50%",
        background: "#000",
        boxShadow: "0 0 0 1.5px #111, inset 0 0 3px rgba(0,0,0,0.9)",
        zIndex: 55,
      }} />
      {/* Right icons */}
      <div className="flex items-center gap-1.5" style={{ marginLeft: "auto" }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="7" width="2.5" height="3" rx="0.5" fill="#E8BCB9" />
          <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" fill="#E8BCB9" />
          <rect x="7" y="3" width="2.5" height="7" rx="0.5" fill="#E8BCB9" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#E8BCB9" opacity="0.4" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 18 14" fill="none">
          <path d="M9 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#E8BCB9" />
          <path d="M5.1 8.4a5.5 5.5 0 017.8 0" stroke="#E8BCB9" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M2 5.3A9.5 9.5 0 0116 5.3" stroke="#E8BCB9" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div style={{ width: 20, height: 10, border: "1.2px solid #E8BCB9", borderRadius: 2, position: "relative", overflow: "hidden" }}>
            <div style={{ width: "65%", height: "100%", background: "#E8BCB9" }} />
          </div>
          <div style={{ width: 2, height: 5, background: "#E8BCB9", marginLeft: -1, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Android Gesture Nav ──────────────────────────────────────────────────────
function GestureNav() {
  return (
    <div className="flex items-center justify-center" style={{ height: 24, background: "#1D1A39" }}>
      <div className="rounded-full" style={{ width: 90, height: 4, background: "rgba(232,188,185,0.35)" }} />
    </div>
  );
}

const DEMO_PROFILE: ProfileData = {
  name: "Júlia",
  age: 22,
  city: "São Paulo, SP",
  interests: ["Música ao Vivo", "Barzinho", "Festas", "Arte"],
  avatar: AI_AVATARS[0].url,
}

const BOARD_SECTIONS: BoardSection[] = [
  {
    id: "onboarding",
    label: "Onboarding",
    eyebrow: "01 · Primeiros passos",
    title: "Entrada e criação de conta",
    description: "Da apresentação da marca à personalização do perfil.",
    previews: [
      { id: "splash", label: "splash", initialScreen: "splash" },
      { id: "welcome", label: "boas-vindas", initialScreen: "welcome" },
      { id: "name", label: "seu-nome", initialScreen: "name" },
      { id: "age", label: "data-de-nascimento", initialScreen: "age" },
      { id: "location", label: "localização", initialScreen: "location" },
      { id: "interests", label: "interesses", initialScreen: "interests" },
      { id: "photo", label: "foto-de-perfil", initialScreen: "photo" },
    ],
  },
  {
    id: "discover",
    label: "Descobrir",
    eyebrow: "02 · Explorar",
    title: "Rolês perto de você",
    description: "Mapa social e agenda de eventos em instâncias independentes.",
    previews: [
      { id: "map", label: "mapa", initialScreen: "app", initialTab: "map" },
      {
        id: "events",
        label: "eventos",
        initialScreen: "app",
        initialTab: "events",
      },
    ],
  },
  {
    id: "conversations",
    label: "Conversas",
    eyebrow: "03 · Conectar",
    title: "Mensagens e chat ao vivo",
    description: "Lista de conversas, comunidade local e troca direta.",
    previews: [
      {
        id: "messages",
        label: "mensagens",
        initialScreen: "app",
        initialTab: "chat",
        initialChatMode: "list",
      },
      {
        id: "city-chat",
        label: "chat-da-cidade",
        initialScreen: "app",
        initialTab: "chat",
        initialChatMode: "city",
      },
      {
        id: "direct-chat",
        label: "conversa-júlia",
        initialScreen: "app",
        initialTab: "chat",
        initialChatMode: "direct",
        initialChatIndex: 0,
      },
    ],
  },
  {
    id: "profile",
    label: "Perfil",
    eyebrow: "04 · Identidade",
    title: "Perfil e preferências",
    description: "Informações pessoais, bio e controles de privacidade.",
    previews: [
      {
        id: "profile",
        label: "perfil",
        initialScreen: "app",
        initialTab: "profile",
      },
    ],
  },
]

function AppPreview({ config }: { config: PreviewConfig }) {
  const [screen, setScreen] = useState<Screen>(config.initialScreen)
  const [profile, setProfile] = useState<ProfileData>(() => ({
    ...DEMO_PROFILE,
    interests: [...DEMO_PROFILE.interests],
  }))

  const screenContent = (
    <>
      {screen === "splash" && (
        <SplashScreen
          onDone={() => setScreen("welcome")}
          autoAdvance={config.initialScreen !== "splash"}
        />
      )}
      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("name")} />
      )}
      {screen === "name" && (
        <NameStep
          onNext={(name) => {
            setProfile((p) => ({ ...p, name }))
            setScreen("age")
          }}
          onBack={() => setScreen("welcome")}
        />
      )}
      {screen === "age" && (
        <AgeStep
          onNext={(age) => {
            setProfile((p) => ({ ...p, age }))
            setScreen("location")
          }}
          onBack={() => setScreen("name")}
        />
      )}
      {screen === "location" && (
        <LocationStep
          onNext={(city) => {
            setProfile((p) => ({ ...p, city }))
            setScreen("interests")
          }}
          onBack={() => setScreen("age")}
        />
      )}
      {screen === "interests" && (
        <InterestsStep
          onNext={(interests) => {
            setProfile((p) => ({ ...p, interests }))
            setScreen("photo")
          }}
          onBack={() => setScreen("location")}
        />
      )}
      {screen === "photo" && (
        <PhotoStep
          name={profile.name || "você"}
          onNext={(avatar) => {
            setProfile((p) => ({ ...p, avatar }))
            setScreen("app")
          }}
          onBack={() => setScreen("interests")}
        />
      )}
      {screen === "app" && (
        <MainApp
          avatar={profile.avatar || AI_AVATARS[0].url}
          name={profile.name || "Você"}
          city={profile.city || "São Paulo, SP"}
          interests={profile.interests}
          age={profile.age || 22}
          initialTab={config.initialTab}
          initialChatMode={config.initialChatMode}
          initialChatIndex={config.initialChatIndex}
        />
      )}
    </>
  )

  return <GalaxyS23Frame>{screenContent}</GalaxyS23Frame>
}

function PreviewCard({ config }: { config: PreviewConfig }) {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-center gap-2 pl-1">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--primary)" }}
        />
        <p
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {config.label}
        </p>
      </div>
      <AppPreview config={config} />
    </article>
  )
}

// ─── Root App / interactive flow board ────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] =
    useState<BoardSection["id"]>("onboarding")

  return (
    <main className="min-h-dvh w-full overflow-hidden">
      <header
        className="sticky top-0 z-[100] border-b px-4 pt-5 backdrop-blur-xl sm:px-8 lg:px-12"
        style={{
          background: "rgba(13, 11, 26, 0.88)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p
                className="mb-1 text-xs font-extrabold uppercase tracking-[0.24em]"
                style={{ color: "var(--secondary)" }}
              >
                Product flow
              </p>
              <h1
                className="font-display text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                Sociable
              </h1>
            </div>
            <p
              className="max-w-xl text-sm leading-relaxed md:text-right"
              style={{ color: "var(--muted-foreground)" }}
            >
              Explore o fluxo completo. Cada celular é uma experiência
              independente e interativa.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Etapas do produto"
            className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide"
          >
            {BOARD_SECTIONS.map((section, index) => {
              const active = activeSection === section.id
              return (
                <button
                  key={section.id}
                  id={`tab-${section.id}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className="flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "rgba(42, 31, 74, 0.72)",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    color: active
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                    outlineColor: "var(--secondary)",
                    boxShadow: active
                      ? "0 8px 28px rgba(174, 68, 90, 0.28)"
                      : "none",
                  }}
                >
                  <span className="text-xs opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="py-8 sm:py-10">
        {BOARD_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`panel-${section.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${section.id}`}
            hidden={activeSection !== section.id}
          >
            <div className="px-4 sm:px-8 lg:px-12">
              <div className="mx-auto mb-8 max-w-[1600px]">
                <p
                  className="mb-2 text-xs font-extrabold uppercase tracking-[0.22em]"
                  style={{ color: "var(--primary)" }}
                >
                  {section.eyebrow}
                </p>
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                  <h2
                    className="font-display text-2xl font-bold sm:text-3xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="max-w-lg text-sm md:text-right"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto overscroll-x-contain pb-16 scrollbar-hide">
              <div className="flex w-max gap-10 px-4 sm:gap-14 sm:px-8 lg:px-12">
                {section.previews.map((config) => (
                  <PreviewCard key={config.id} config={config} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
