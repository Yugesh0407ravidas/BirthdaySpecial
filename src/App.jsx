import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Image as ImageIcon, MessageCircle, Gift, Play, Pause, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import photo1 from "./assets/photos/01.jpg";
import photo2 from "./assets/photos/02.jpg";
import photo3 from "./assets/photos/03.jpg";
import photo4 from "./assets/photos/04.jpg";
import photo5 from "./assets/photos/05.jpg";
import photo6 from "./assets/photos/06.jpg";
import photo7 from "./assets/photos/07.jpg";
import photo8 from "./assets/photos/08.jpg";
import photo9 from "./assets/photos/09.jpg";

/* --- INSTRUCTIONS FOR THE USER ---
  1. This is a single-file React app. 
  2. To customize photos: Look for the 'memories' array and the 'heroImage' variable.
     Replace the Unsplash URLs with your own image URLs (or local imports).
  3. To customize the message: Look for the 'birthdayMessage' string.
  4. Music: Update the 'audioUrl' with a link to her favorite song.
*/

const App = () => {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- ASSETS & DATA ---
  // Replace these URLs with your actual photos!
  const heroImage = photo9;
  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder soothing piano

  const memories = [
    { id: 1, src: photo1, caption: "Our First Date" },
    { id: 2, src: photo2, caption: "Konark sun Temple" },
    { id: 3, src: photo3, caption: "Vrindavan" },
    { id: 4, src: photo4, caption: "Barsana" },
    { id: 5, src: photo5, caption: "Khatu Shyam ji" },
    { id: 6, src: photo6, caption: "Puri Beach" },
    { id: 7, src: photo7, caption: "Lotus Temple" },
    { id: 8, src: photo8, caption: "Taj Mahal" },
    { id: 9, src: photo9, caption: "Prem Mandir" },
  ];
  
 

  const birthdayMessage = `  To my favorite person in the world,

Happy Birthday! My Love ❤️ 🎉

Every day with you feels like a dream I never want to wake up from. You bring so much light, laughter, and love into my life. 

I hope this day is as beautiful and magical as you are. Here's to more adventures, more inside jokes, and more years of loving you.

Forever yours,
Your baby ❤️`;

  // --- AUDIO HANDLER ---
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- NAVIGATION HANDLER ---
  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView heroImage={heroImage} setView={setCurrentView} />;
      case 'gallery': return <GalleryView memories={memories} />;
      case 'message': return <MessageView message={birthdayMessage} />;
      case 'wishes': return <WishesView memories={memories} />;
      default: return <HomeView heroImage={heroImage} setView={setCurrentView} />;
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-pink-50 min-h-screen relative overflow-hidden selection:bg-rose-200">
      {/* Global Styles for Animations & Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600&display=swap');
        
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .font-body { font-family: 'Poppins', sans-serif; }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        @keyframes float-fast {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 105, 180, 0.8); }
        }
        .animate-glow { animation: pulse-glow 3s infinite; }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        
        /* Hide scrollbar for cleaner look */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fdf2f8; }
        ::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 4px; }
      `}</style>

      {/* Background Elements */}
      <FloatingBackground />
      <audio ref={audioRef} src={songUrl} loop />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-white/40 shadow-sm transition-all duration-300">
        <div 
          onClick={() => setCurrentView('home')}
          className="text-2xl font-cursive text-rose-600 cursor-pointer hover:scale-105 transition-transform drop-shadow-sm"
        >
          My Love ❤️
        </div>
        
        <div className="flex gap-4 md:gap-8 bg-white/40 px-6 py-2 rounded-full border border-white/50 shadow-sm backdrop-blur-md">
          <NavButton active={currentView === 'home'} onClick={() => setCurrentView('home')} icon={<Heart size={18} />} label="Home" />
          <NavButton active={currentView === 'gallery'} onClick={() => setCurrentView('gallery')} icon={<ImageIcon size={18} />} label="Gallery" />
          <NavButton active={currentView === 'message'} onClick={() => setCurrentView('message')} icon={<MessageCircle size={18} />} label="Letter" />
          <NavButton active={currentView === 'wishes'} onClick={() => setCurrentView('wishes')} icon={<Gift size={18} />} label="Wishes" />
        </div>

        <button 
          onClick={togglePlay}
          className={`p-3 rounded-full transition-all duration-300 shadow-md ${isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-rose-500 hover:bg-rose-50'}`}
        >
          {isPlaying ? <Music size={20} /> : <Play size={20} />}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 min-h-screen relative z-10 font-body">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-rose-400 text-sm font-body opacity-70">
        Made with ❤️ specifically for you
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 transition-all duration-300 ${
      active ? 'text-rose-600 font-bold scale-110' : 'text-gray-500 hover:text-rose-400'
    }`}
  >
    {icon}
    <span className="hidden md:block text-sm">{label}</span>
  </button>
);

const HomeView = ({ heroImage, setView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
      <div className="relative group cursor-pointer" onClick={() => setView('gallery')}>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float">
          <img src={heroImage} alt="Birthday Girl" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-4 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg transform rotate-6 border border-rose-100">
          <span className="text-rose-600 font-bold">Today is yours! 👑</span>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 drop-shadow-sm pb-2">
          Happy Birthday Pinky 
        </h1>
        <p className="text-xl text-gray-600 font-light tracking-wide">
          To the most beautiful soul in the universe.
        </p>
      </div>

      <button 
        onClick={() => setView('wishes')}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <Sparkles size={20} />
        Make a Wish
      </button>
    </div>
  );
};

const GalleryView = ({ memories }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-4xl font-cursive text-center text-rose-600 mb-10">Our Precious Memories</h2>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {memories.map((photo, idx) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white p-2 cursor-pointer"
            onClick={() => setSelectedImage(photo)}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="overflow-hidden rounded-xl relative">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <span className="text-white font-cursive text-2xl tracking-wider transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  {photo.caption}
                </span>
              </div>
              <img 
                src={photo.src} 
                alt={photo.caption}
                className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-rose-400 transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-3xl w-full bg-white p-2 rounded-xl shadow-2xl transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Full size" className="w-full h-auto rounded-lg" />
            <p className="text-center mt-4 font-cursive text-2xl text-rose-500">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageView = ({ message }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length-1) {
        setDisplayedText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 50); // Speed of typing

    return () => clearInterval(timer);
  }, [message]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/40 backdrop-blur-lg border border-white/60 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <Heart className="text-rose-500 mb-6 mx-auto animate-pulse" fill="#f43f5e" size={40} />
          
          <div className="font-body text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
            {displayedText}
            {showCursor && <span className="inline-block w-1 h-6 bg-rose-500 ml-1 animate-pulse align-middle"></span>}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent to-rose-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WishesView = ({ memories }) => {
  const [balloons, setBalloons] = useState([]);
  const cakeUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop";
  // Added background image URL for the wishes section
  const wishesBgUrl = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop";

  // Combine cake and memories for the orbit
  const orbitImages = [
    { id: 'cake', src: cakeUrl },
    ...memories.slice(0, 3)
  ];
  
  const releaseBalloon = () => {
    const id = Date.now();
    const colors = ['bg-red-400', 'bg-rose-400', 'bg-pink-400', 'bg-purple-400', 'bg-orange-300'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 80 + 10; // 10% to 90%
    
    setBalloons(prev => [...prev, { id, color: randomColor, left: randomLeft }]);

    // Remove balloon after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== id));
    }, 4000);
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Wishes Section Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={wishesBgUrl} 
          alt="Celebration background" 
          className="w-full h-full object-cover opacity-15 pointer-events-none blur-sm" 
        />
      </div>

      {/* Orbit System */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center mb-12 z-10">
        {/* Central Text */}
        <div className="absolute z-10 text-center">
           <div className="text-5xl md:text-6xl font-cursive text-rose-500 animate-pulse drop-shadow-md">
             Make a Wish
           </div>
           <p className="text-sm text-gray-500 mt-2">Click the button below</p>
        </div>

        {/* Orbital Ring */}
        <div className="absolute inset-0 rounded-full border border-rose-200/50 animate-spin-slow"></div>
        
        {/* Orbiting Planets (Images) */}
        {orbitImages.map((item, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 md:w-28 md:h-28 md:-ml-14 md:-mt-14 rounded-full overflow-hidden border-4 border-white shadow-xl"
            style={{
              animation: `orbit 10s linear infinite`,
              animationDelay: `-${i * 2.5}s`
            }}
          >
            <img src={item.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button 
        onClick={releaseBalloon}
        className="z-20 px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-xl hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Gift /> Release Love
      </button>

      {/* Floating Balloons Container */}
      {balloons.map(b => (
        <div 
          key={b.id}
          className={`absolute bottom-0 w-12 h-16 rounded-full ${b.color} shadow-lg opacity-90`}
          style={{ 
            left: `${b.left}%`,
            animation: 'floatUp 4s ease-in forwards'
          }}
        >
          {/* Balloon String */}
          <div className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-gray-400 translate-y-full -translate-x-1/2"></div>
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(10deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- BACKGROUND ANIMATION COMPONENT ---
const FloatingBackground = () => {
  // Generate random hearts positions
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 10 + Math.random() * 20
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute text-rose-200 opacity-30"
          style={{
            left: `${h.left}%`,
            bottom: '-50px',
            fontSize: `${h.size}px`,
            animation: `float ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
      {/* Soft Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default App;
