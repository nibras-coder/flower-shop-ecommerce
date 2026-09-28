import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-800">
      {/* Sticky Frosted Navbar */}
      <nav className="fixed w-full top-0 z-50 glass-panel border-b-0 border-x-0 rounded-none bg-white/50 backdrop-blur-2xl transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-primary tracking-tight">Flora&Co.</span>
            </div>
            <div className="flex gap-6 items-center">
              <a href="#collections" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Collections</a>
              <Link to="/custom-bouquet" className="text-sm font-bold text-primary hover:text-pink-600 transition-colors">Custom Studio</Link>
              <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="text-sm font-bold bg-primary/90 text-white px-5 py-2.5 rounded-full hover:bg-primary shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
        {/* Background Image / Blurred Overlays */}
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2000&auto=format&fit=crop')]">
          <span className="w-full h-full absolute opacity-40 bg-linear-to-b from-black/30 to-background"></span>
        </div>

        <div className="container relative mx-auto z-10 px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 px-4 text-center">
              {/* Central Frosted Glass Panel */}
              <div className="glass-panel p-10 md:p-16 rounded-3xl mx-auto max-w-2xl transform transition duration-500 hover:scale-[1.02]">
                <h1 className="text-white font-serif font-bold text-5xl md:text-6xl drop-shadow-md mb-6 leading-tight">
                  Elegance in Every Petal
                </h1>
                <p className="mt-4 text-lg text-slate-100 font-medium mb-10 drop-shadow-sm">
                  Discover curated luxury bouquets crafted by master florists. Elevate your space with the freshest, most vibrant blooms delivered directly to your door.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/custom-bouquet" className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-pink-600 transition-all duration-300 hover:shadow-primary/50 text-lg">
                    ✨ Build Custom Bouquet
                  </Link>
                  <a href="#collections" className="inline-block bg-white/80 backdrop-blur-md text-slate-800 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 text-lg">
                    Collections
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections Section */}
      <section id="collections" className="pb-20 relative bg-background block -mt-10 pt-20">
        {/* Soft background blobs */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
        <div className="absolute top-60 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-serif font-bold text-slate-800">Featured Collections</h2>
              <p className="text-lg leading-relaxed m-4 text-slate-600">
                Explore our seasonal favorites, carefully arranged to capture the essence of nature's beauty.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {/* Card 1 */}
            <div className="w-full md:w-1/3 px-4 text-center mb-8">
              <div className="glass-panel relative flex flex-col min-w-0 break-words bg-white/40 w-full shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <img alt="Rose" className="w-full align-middle h-64 object-cover" src="https://images.unsplash.com/photo-1596431940984-7a32338ec7fb?q=80&w=600&auto=format&fit=crop" />
                <div className="p-8">
                  <h6 className="text-xl font-bold font-serif text-slate-800">Classic Roses</h6>
                  <p className="mt-2 mb-4 text-slate-600">
                    Timeless romance and sophisticated charm. Perfect for any special occasion.
                  </p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="w-full md:w-1/3 px-4 text-center mb-8">
              <div className="glass-panel relative flex flex-col min-w-0 break-words bg-white/40 w-full shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <img alt="Orchids" className="w-full align-middle h-64 object-cover" src="https://images.unsplash.com/photo-1562688849-ceb8c4c324fb?q=80&w=600&auto=format&fit=crop" />
                <div className="p-8">
                  <h6 className="text-xl font-bold font-serif text-slate-800">Exotic Orchids</h6>
                  <p className="mt-2 mb-4 text-slate-600">
                    Delicate, rare, and mesmerizing. Bring a touch of the tropics to your home.
                  </p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="w-full md:w-1/3 px-4 text-center mb-8">
              <div className="glass-panel relative flex flex-col min-w-0 break-words bg-white/40 w-full shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <img alt="Tulips" className="w-full align-middle h-64 object-cover" src="https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop" />
                <div className="p-8">
                  <h6 className="text-xl font-bold font-serif text-slate-800">Spring Tulips</h6>
                  <p className="mt-2 mb-4 text-slate-600">
                    Bright, cheerful, and full of life. Celebrate the renewal of the season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Bouquet Studio Feature Section */}
      <section id="custom" className="py-24 relative overflow-hidden bg-white/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-panel rounded-3xl p-8 md:p-14 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-emerald-500/10 border-2 border-white/60 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-accent/20 text-accent inline-block mb-4">
                  ✨ Interactive Atelier
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 leading-tight mb-4">
                  Custom Bouquet Builder & AI Floral Stylist
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Design your personalized floral masterpiece stem-by-stem. Choose your focal blooms, receive smart complementary suggestions powered by AI, select artisanal wrapping papers, and track prices in real time.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to="/custom-bouquet"
                    className="bg-primary hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5"
                  >
                    Launch Bouquet Studio →
                  </Link>
                  <span className="text-xs text-slate-500 font-medium">
                    🌸 Real-time pricing • 🤖 AI flower pairing • 🚚 Direct delivery
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
                  <img
                    src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop"
                    alt="Florist arranging bespoke bouquet"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white font-serif text-lg font-bold">
                      "Every stem tells an enduring story."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
           <span className="font-serif text-3xl font-bold text-white tracking-tight mb-4 block">Flora&Co.</span>
           <p className="text-slate-400 text-sm">© 2026 Flora&Co. Elegance delivered.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
