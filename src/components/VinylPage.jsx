import { useState, useRef, useEffect } from "react";

const records = [
  {
    title: "Ser Parte",
    artist: "Disco 1",
    cover: "🟨",
    audio: "https://raw.githubusercontent.com/Leslie-23-del/vinyl-project/main/public/music/disco1.mp3",
  },
  {
    title: "Nevermind",
    artist: "Nirvana",
    cover: "🟦",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "AM",
    artist: "Arctic Monkeys",
    cover: "⬛",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    cover: "🟪",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

export default function VinylPage() {
  const [selected, setSelected] = useState(records[0]);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = selected.audio;
      audioRef.current.play().catch(() => {});
      audioRef.current.onloadedmetadata = () =>
        setDuration(audioRef.current.duration || 0);
    }
  }, [selected]);

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60) || 0;
    const sec = Math.floor(s % 60) || 0;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#120b08] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[220px_1fr] gap-8">
        
        {/* IZQUIERDA - VINILOS */}
        <aside>
          <h2 className="text-4xl mb-6 font-serif text-amber-100 leading-tight">
            colección
            <br />
            vinilos
          </h2>

          <div className="space-y-4 max-h-[80vh] overflow-auto pr-2">
            {records.map((r, i) => (
              <button
                key={i}
                onClick={() => setSelected(r)}
                className="group relative w-full h-40 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-start pl-4 overflow-hidden"
              >
                {/* DISCO */}
                <div className="absolute left-3 w-24 h-24 rounded-full bg-black border-4 border-zinc-700 shadow-xl animate-[spin_6s_linear_infinite] hover:animate-[spin_1s_linear_infinite] hover:scale-105">
                  <div className="absolute inset-3 rounded-full border border-white/10" />
                  <div className="absolute inset-7 rounded-full border border-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-300 border-2 border-zinc-500 shadow-inner" />
                  </div>
                </div>

                {/* PORTADA */}
                <div className="ml-12 w-28 h-32 relative z-10 rounded-r-xl bg-gradient-to-br from-stone-100 to-stone-300 shadow-xl p-3 text-left text-zinc-900 flex flex-col justify-between">
                  <div className="text-[10px] uppercase tracking-[0.2em]">
                    LP
                  </div>
                  <div>
                    <div className="font-bold text-sm truncate">
                      {r.title}
                    </div>
                    <div className="text-xs opacity-70 truncate">
                      {r.artist}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTRO - TOCADISCOS */}
        <main>
          <div className="text-center mb-6">
            <h1 className="text-6xl md:text-7xl font-serif text-amber-50">
              {selected.title}
            </h1>
            <p className="text-3xl text-amber-100/90 mt-2">
              {selected.artist}
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-b from-[#3a2318] to-[#1a0f0b] p-6 shadow-2xl">
            
            {/* TOCADISCOS 3D */}
            <div className="relative mx-auto max-w-3xl aspect-[16/10] rounded-3xl bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center shadow-inner overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-zinc-700 shadow-2xl border border-white/10 flex items-center justify-center">
                <div className="w-[22rem] h-[22rem] rounded-full bg-black animate-[spin_2s_linear_infinite] relative">
                  <div className="absolute inset-3 rounded-full border border-white/5" />
                  <div className="absolute inset-8 rounded-full border border-white/5" />
                  <div className="absolute inset-14 rounded-full border border-white/5" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 text-black flex items-center justify-center font-bold">
                      {selected.title.slice(0, 2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REPRODUCTOR */}
            <div className="max-w-2xl mx-auto mt-6">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>0:00</span>
                <span>{formatTime(duration)}</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                defaultValue="20"
                className="w-full h-1 accent-white bg-transparent"
              />

              <div className="flex items-center justify-center gap-8 mt-5 text-2xl">
                <button>🔀</button>
                <button>⏮</button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl"
                >
                  ▶
                </button>
                <button>⏭</button>
                <button>🔊</button>
              </div>
            </div>

          </div>

          <audio ref={audioRef} className="hidden" />
        </main>
      </div>
    </div>
  );
}
