function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans bg-linear-to-br from-background to-secondary/20 relative overflow-hidden">
      
      {/* Decorative background blur element */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/50 max-w-md text-center z-10">
        <h1 className="text-3xl font-bold text-primary mb-4 font-serif">
          Flower Shop E-Commerce
        </h1>
        <p className="text-gray-700 mb-6 font-medium">
          Tailwind v4 is configured with your vibrant theme.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 font-medium shadow-md">
          Start Shopping
        </button>
      </div>
      
    </div>
  )
}

export default App