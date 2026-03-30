import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-amber-200">Contact Us</h1>
        <p className="mt-3 text-slate-300">Start your luxury project with a one-on-one consultation.</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />
        <div className="rounded-3xl border border-amber-200/15 bg-black/45 p-6 shadow-panel backdrop-blur">
          <h2 className="text-2xl font-semibold text-amber-200">Reach out directly</h2>
          <p className="mt-3 text-slate-300">Phone: +91 9141566888</p>
          <p className="text-slate-300 mt-1">Email: mlrconstructios@gmail.com</p>
          <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-amber-300/20">
            <iframe title="company location" src="https://maps.google.com/maps?q=12.5259006,76.896751&t=&z=16&ie=UTF8&iwloc=&output=embed" className="h-full w-full" loading="lazy"></iframe>
          </div>
          <a href="tel:+919141566888" className="mt-5 inline-flex items-center justify-center rounded-full border border-amber-300 px-5 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-300/20">Call Now</a>
        </div>
      </div>
    </div>
  );
}
