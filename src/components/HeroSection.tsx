export default function HeroSection() {
  return (
    <section
      className="relative bg-center bg-no-repeat bg-cover rounded my-7"
      style={{ backgroundImage: 'url(/hero-image.jpg)' }}
    >
      <div className="absolute inset-0 rounded bg-white/20"></div>

      <div className="relative max-w-6xl px-4 py-20 mx-auto md:py-32">
        <p className="uppercase tracking-[0.2em] text-xs mb-6 opacity-90">
          new arrivals
        </p>

        <h1 className="max-w-lg text-4xl font-bold leading-tight md:text-5xl drop-shadow-2xl">
          One Store.
          <br />
          Endless choices.
        </h1>

        <p className="max-w-md mt-6 text-sm md:text-base opacity-90 drop-shadow">
          Discover quality products from top brands, curated for every style and
          every budget.
        </p>

        <button
          onClick={() =>
            document
              .getElementById('products')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="inline-flex items-center gap-2 px-6 py-2 mt-8 text-sm font-semibold text-white bg-black rounded-md shadow hover:bg-gray-900"
        >
          Shop now
          <span className="text-lg">↓</span>
        </button>
      </div>
    </section>
  );
}
