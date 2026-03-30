import TestimonialCarousel from '../components/TestimonialCarousel';

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-display font-bold text-amber-200">What Clients Say</h1>
        <p className="mt-3 text-slate-300">Experience the trust and confidence accomplished by our premium builds.</p>
      </header>
      <TestimonialCarousel />
    </div>
  );
}
