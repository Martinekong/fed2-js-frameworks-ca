export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat rounded my-7"
      style={{ backgroundImage: 'url(/hero-image.jpg)' }}
    >
      <div className="absolute inset-0 bg-white/20 rounded"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        <p className="uppercase tracking-[0.2em] text-xs mb-6 opacity-90">
          new arrivals
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-lg drop-shadow-2xl">
          One Store.
          <br />
          Endless choices.
        </h1>

        <p className="text-sm md:text-base mt-6 max-w-md opacity-90 drop-shadow">
          Discover quality products from top brands, curated for every style and
          every budget.
        </p>

        <button
          onClick={() =>
            document
              .getElementById('products')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-100 shadow"
        >
          Shop now
          <span className="text-lg">↓</span>
        </button>
      </div>
    </section>
  );
}
