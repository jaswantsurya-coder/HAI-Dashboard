"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { hashPassword, setSession, getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Demo credentials
  const DEMO_EMAIL = "admin@hai.com";
  const DEMO_PASSWORD = "hai2025";

  useEffect(() => {
    if (getSession()) router.replace("/dashboard");

    // Cursor logic
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }
      if (lightRef.current) {
        lightRef.current.style.left = `${mx}px`;
        lightRef.current.style.top = `${my}px`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", moveCursor);
    const ringAnim = requestAnimationFrame(animateRing);

    // Particles logic
    const cv = document.getElementById('pts') as HTMLCanvasElement;
    if (cv) {
      const cx = cv.getContext('2d');
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      const pts = Array.from({ length: 60 }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        o: Math.random() * 0.3 + 0.05
      }));

      const drawPts = () => {
        if (!cx) return;
        cx.clearRect(0, 0, cv.width, cv.height);
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
          if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
          cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          cx.fillStyle = `rgba(100,92,80,${p.o})`; cx.fill();
        });
        requestAnimationFrame(drawPts);
      };
      drawPts();
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(ringAnim);
    };
  }, [router]);

  const handleCardMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-dy * 3.5}deg) rotateY(${dx * 3.5}deg)`;
  };

  const resetCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  const triggerShake = () => {
    if (!cardRef.current) return;
    let i = 0, d = 1;
    const s = setInterval(() => {
      if (cardRef.current) cardRef.current.style.transform = `translateX(${d * (7 - i)}px)`;
      d *= -1; i++;
      if (i > 9) { clearInterval(s); if (cardRef.current) cardRef.current.style.transform = ''; }
    }, 42);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    setLoading(true);
    const hashedInput = await hashPassword(password);
    const hashedDemo = await hashPassword(DEMO_PASSWORD);

    if (email === DEMO_EMAIL && hashedInput === hashedDemo) {
      setTimeout(() => {
        setLoading(false);
        setShowOverlay(true);
        setSession({ email, name: "Admin User", role: "Super Admin", loggedInAt: Date.now() });
        setTimeout(() => router.push("/dashboard"), 1800);
      }, 1200);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError("Incorrect email or password.");
        triggerShake();
      }, 1000);
    }
  };

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Google OAuth Redirect/Success
    setTimeout(() => {
      setLoading(false);
      setShowOverlay(true);
      setSession({ email: "google-user@gmail.com", name: "Google Admin", role: "Manager", loggedInAt: Date.now() });
      setTimeout(() => router.push("/dashboard"), 1800);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] overflow-hidden selection:bg-black selection:text-white" style={{ cursor: "none" }}>
      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        * { cursor: none !important; }

        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(72px); opacity: 0;
          animation: orbPulse ease-in-out infinite alternate;
        }
        .orb-1 { width: 560px; height: 560px; background: #dbeafe; top: -140px; left: -100px; animation-duration: 9s; animation-delay: 0s; }
        .orb-2 { width: 420px; height: 420px; background: #fce7f3; top: 55%; right: -130px; animation-duration: 11s; animation-delay: -4s; }
        .orb-3 { width: 380px; height: 380px; background: #d1fae5; bottom: -120px; left: 28%; animation-duration: 8s; animation-delay: -7s; }
        .orb-4 { width: 320px; height: 320px; background: #fef3c7; top: 18%; left: 52%; animation-duration: 13s; animation-delay: -2s; }

        @keyframes orbPulse {
          0% { opacity: 0.45; transform: scale(1) translate(0,0); }
          100% { opacity: 0.72; transform: scale(1.08) translate(18px,-22px); }
        }

        .grain {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          opacity: .55;
        }

        .lbtn .arc {
          position: absolute; top: 0; left: 8%; right: 8%; height: 52%;
          border-radius: 0 0 50% 50% / 0 0 28px 28px;
          background: linear-gradient(180deg, rgba(255,255,255,.22) 0%, transparent 100%);
          pointer-events: none; z-index: 1;
        }

        .lbtn .shim {
          position: absolute; top: 0; left: -120%; width: 75%; height: 100%;
          background: linear-gradient(108deg, transparent 20%, rgba(255,255,255,.28) 50%, transparent 80%);
          transform: skewX(-20deg); pointer-events: none; z-index: 2;
        }
        .lbtn:hover .shim {
          left: 170%;
          transition: left .7s cubic-bezier(.25,.46,.45,.94);
        }

        .lbtn.loading .spin { display: block; }
        .lbtn.loading .blbl { display: none; }
        
        @keyframes spinA { to { transform: rotate(360deg); } }
        .spin {
          display: none; width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: white; border-radius: 50%;
          animation: spinA .6s linear infinite;
        }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="fixed w-2.5 h-2.5 bg-[#1a1714] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-[width,height,background] duration-200" />
      <div ref={ringRef} className="fixed w-9 h-9 border-[1.5px] border-[rgba(26,23,20,0.22)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <div ref={lightRef} className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-400 mix-blend-overlay bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,transparent_65%)]" />

      {/* Scene */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(155deg,#fdfcfb_0%,#f4efe8_45%,#f9f8f5_100%)] overflow-hidden">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      <canvas id="pts" className="fixed inset-0 z-[1] pointer-events-none"></canvas>
      <div className="grain"></div>

      <div className="relative z-[3] flex min-h-screen items-center justify-center p-4">
        <div 
          ref={cardRef}
          onMouseMove={handleCardMove}
          onMouseLeave={resetCard}
          className="relative w-full max-w-[448px] bg-[rgba(255,255,255,0.55)] border border-[rgba(255,255,255,0.85)] rounded-[30px] p-8 sm:p-12 backdrop-blur-[32px] saturate-[190%] shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_32px_80px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300"
        >
          {/* Success Overlay */}
          <div className={cn("absolute inset-0 bg-[rgba(255,255,255,0.93)] backdrop-blur-[24px] flex flex-col items-center justify-center gap-4 z-20 transition-opacity duration-400 pointer-events-none", showOverlay ? "opacity-100 pointer-events-auto" : "opacity-0")}>
            <div className={cn("w-[66px] h-[66px] rounded-full bg-[#1a1714] flex items-center justify-center shadow-[0_8px_28px_rgba(26,23,20,0.25)] transition-transform duration-[0.55s] cubic-bezier(0.16,1,0.3,1)", showOverlay ? "scale-100" : "scale-[0.4]")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#1a1714]">Signed in successfully</h3>
            <p className="text-sm text-[#9a9490]">Redirecting to your dashboard…</p>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[42px] h-[42px] rounded-[13px] bg-[#1a1714] flex items-center justify-center shadow-[0_4px_16px_rgba(26,23,20,0.18)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-[21px] h-[21px]"><path d="M12 2L3 7V12C3 16.55 7.08 20.74 12 22C16.92 20.74 21 16.55 21 12V7L12 2Z" fill="white" fillOpacity=".12"/><path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-['Cormorant_Garamond'] text-[23px] font-semibold tracking-[3px] uppercase text-[#1a1714]">HAI</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-['Cormorant_Garamond'] text-4xl font-normal tracking-[-0.5px] leading-[1.08] text-[#1a1714]">Welcome <em className="italic font-light">back</em></h1>
            <p className="text-[13.5px] text-[#9a9490]">Sign in to your analytics dashboard</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[rgba(26,23,20,0.06)] rounded-[13px] p-1 mb-8">
            <button 
              onClick={() => setActiveTab("login")}
              className={cn("flex-1 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-250", activeTab === "login" ? "bg-white text-[#1a1714] shadow-[0_2px_12px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.9)_inset]" : "text-[#9a9490]")}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab("signup")}
              className={cn("flex-1 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-250", activeTab === "signup" ? "bg-white text-[#1a1714] shadow-[0_2px_12px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.9)_inset]" : "text-[#9a9490]")}
            >
              Create Account
            </button>
          </div>

          {/* Error Box */}
          {error && <div className="p-3 mb-4 bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.15)] rounded-[11px] text-[12.5px] text-[#c0392b] backdrop-blur-[8px] animate-bounce">{error}</div>}

          {/* Login Panel */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">Email</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c5c0bb]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" 
                    className="w-full pl-[41px] pr-4 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:bg-[rgba(255,255,255,0.92)] focus:border-[rgba(26,23,20,0.22)] focus:shadow-[0_0_0_4px_rgba(26,23,20,0.05),0_2px_12px_rgba(0,0,0,0.05)]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">Password</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c5c0bb]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input 
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••" 
                    className="w-full pl-[41px] pr-10 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:bg-[rgba(255,255,255,0.92)] focus:border-[rgba(26,23,20,0.22)] focus:shadow-[0_0_0_4px_rgba(26,23,20,0.05),0_2px_12px_rgba(0,0,0,0.05)]" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c5c0bb] hover:text-[#4a4540] transition-colors"
                  >
                    {showPass ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center gap-2 text-[13px] text-[#9a9490] cursor-none">
                  <input type="checkbox" className="hidden peer" />
                  <span className="w-4 h-4 rounded-[5px] border-[1.5px] border-[rgba(26,23,20,0.14)] bg-[rgba(255,255,255,0.8)] flex items-center justify-center transition-all peer-checked:bg-[#1a1714] peer-checked:border-[#1a1714] after:content-[''] after:block after:w-1 after:h-2 after:border-white after:border-b-[1.5px] after:border-r-[1.5px] after:rotate-45 after:-translate-y-[1px] after:opacity-0 peer-checked:after:opacity-100"></span>
                  Remember me
                </label>
                <a href="#" className="text-[13px] text-[#4a4540] hover:opacity-55 transition-opacity">Forgot password?</a>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit"
                  className={cn("lbtn pri relative w-full py-3.5 rounded-[17px] font-bold transition-all duration-300 shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_28px_rgba(26,23,20,0.28)]", loading && "loading")}
                >
                  <span className="arc"></span><span className="shim"></span><span className="edge"></span><span className="bubble"></span>
                  <div className="relative z-[3] flex items-center justify-center gap-2">
                    <span className="blbl">Sign In</span>
                    <div className="spin"></div>
                  </div>
                </button>

                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-[linear-gradient(90deg,transparent,rgba(26,23,20,0.1)_50%,transparent)]" />
                  <span className="text-[11.5px] text-[#c5c0bb] tracking-wider uppercase">or continue with</span>
                  <div className="flex-1 h-px bg-[linear-gradient(90deg,transparent,rgba(26,23,20,0.1)_50%,transparent)]" />
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  className={cn("lbtn sec relative w-full py-3.5 rounded-[17px] font-semibold border border-[rgba(255,255,255,0.88)] bg-[rgba(255,255,255,0.42)] backdrop-blur-[24px] saturate-[200%] shadow-[0_1.5px_0_rgba(255,255,255,0.98)_inset,0_4px_18px_rgba(0,0,0,0.07)]", loading && "loading")}
                >
                  <span className="arc"></span><span className="shim"></span><span className="edge"></span><span className="bubble"></span>
                  <div className="relative z-[3] flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="blbl">Continue with Google</span>
                  </div>
                </button>
              </div>

              <div className="text-center text-[12px] text-[#9a9490] pt-4">
                Secure admin access · <a href="#" className="text-[#4a4540] border-b border-[rgba(26,23,20,0.15)] pb-0.5">Support</a> · <a href="#" className="text-[#4a4540] border-b border-[rgba(26,23,20,0.15)] pb-0.5">Privacy</a>
              </div>
            </form>
          )}

          {/* Signup Panel (Placeholder) */}
          {activeTab === "signup" && (
             <div className="space-y-4 animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]">
               <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-2">
                   <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">First Name</label>
                   <input type="text" placeholder="Alex" className="w-full px-4 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px]" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">Last Name</label>
                   <input type="text" placeholder="Johnson" className="w-full px-4 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px]" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">Work Email</label>
                 <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px]" />
               </div>
               <div className="space-y-2">
                 <label className="text-[11px] font-semibold tracking-wider uppercase text-[#9a9490]">Password</label>
                 <input type="password" placeholder="Min. 12 characters" className="w-full px-4 py-3 bg-[rgba(255,255,255,0.62)] border border-[rgba(26,23,20,0.09)] rounded-[13px] outline-none backdrop-blur-[10px]" />
               </div>
               <button className="lbtn pri relative w-full py-3.5 rounded-[17px] font-bold mt-4 shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_28px_rgba(26,23,20,0.28)]">
                  <span className="arc"></span><span className="shim"></span><span className="edge"></span><span className="bubble"></span>
                  <span className="relative z-[3] blbl">Create Account</span>
               </button>
               <div className="text-center text-[12px] text-[#9a9490] pt-4">
                By signing up you agree to our <a href="#" className="text-[#4a4540] border-b border-[rgba(26,23,20,0.15)] pb-0.5">Terms</a> and <a href="#" className="text-[#4a4540] border-b border-[rgba(26,23,20,0.15)] pb-0.5">Privacy</a>
              </div>
             </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 bg-[rgba(255,255,255,0.58)] backdrop-blur-[18px] border border-[rgba(255,255,255,0.88)] rounded-[100px] px-5 py-2 text-[11.5px] text-[#9a9490] flex items-center gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-[sdotPulse_2s_ease-in-out_infinite]"></span>
        All systems operational · HAI v2.4.1
      </div>

      <style jsx>{`
        @keyframes sdotPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.45;transform:scale(.8);} }
        @keyframes fadeUp { from{ opacity:0; transform:translateY(13px); } to{ opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
