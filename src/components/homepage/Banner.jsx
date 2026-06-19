import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative min-h-screen w-full bg-white font-sans overflow-hidden select-none">
      {/* ১. স্টাইলিশ গ্লোবাল নেভিগেশন বার */}
      <header className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"></header>

      {/* ২. মেইন হিরো কন্টেন্ট এরিয়া */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* বামপাশের টেক্সট কন্টেন্ট */}
          <div className="lg:col-span-6 space-y-6 max-w-xl text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1]">
              Mens health and <br />
              wellness solutions
            </h1>

            <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed max-w-md">
              A Geviti membership makes longevity easy and accessible with our
              wide range of at-home diagnostics, innovative anti-aging
              therapies, and a dedicated qualified care team.
            </p>

            {/* পিল-শেপড প্রিমিয়াম গেট স্টার্টেড বাটন */}
            <div className="pt-2">
              <button className="group flex items-center justify-between min-w-[180px] bg-[#111] hover:bg-black text-white rounded-full p-1.5 pl-6 pr-2 transition-all shadow-md">
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  Get Started
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* ডানপাশের প্রোডাক্ট এবং ওয়াটারমার্ক ইমেজ জোন */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
            {/* ব্যাকগ্রাউন্ড বিগ ওয়াটারমার্ক টেক্সট */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <span className="text-[120px] sm:text-[160px] lg:text-[200px] font-black text-sky-100/40 tracking-tight">
                BLOOD
              </span>
            </div>

            {/* থ্রিডি প্রোডাক্ট বোতল (ফ্লোটিং অ্যানিমেশন সহ) */}
            <div className="relative z-10 animate-[bounce_6s_infinite_ease-in-out] max-w-[280px] sm:max-w-[340px]">
              <img
                src="https://i.ibb.co/v4bXwXp/pngwing-com.png" // 💡 এখানে আপনার অরিজিনাল টেস্টোস্টেরন বোতলের ট্রান্সপারেন্ট পিএনজি লিংকটি বসাবেন
                alt="Geviti Oral Testosterone"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)] rotate-[-12deg]"
              />
            </div>

            {/* ডানদিকের নিচের সোশ্যাল প্রুফ কার্ড (HSA/FSA Accepted) */}
            <div className="absolute bottom-4 right-0 sm:right-4 bg-white/90 backdrop-blur-md border border-gray-100 p-2.5 px-4 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-3 z-20">
              {/* ছোট ওভারল্যাপিং অ্যাভাটার ট্রিক */}
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                  alt="User"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
                  alt="User"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
                  alt="User"
                />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
                  ✓ HSA/FSA Accepted
                </p>
                {/* ৫ স্টার রেটিং */}
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-xs">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ৩. বামদিকের নিচে থাকা স্ক্রোল মাউস ইন্ডিকেটর */}
      <div className="absolute bottom-8 left-4 sm:left-8 lg:left-12 z-20 hidden sm:block">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-gray-300 p-1.5 hover:border-gray-500 transition cursor-pointer">
          <span className="h-2 w-1 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
