import HeroSection from "./components/hero";
import EmailListContactForm from "./components/email-list";
import IngredientsSection from "./components/ingredients";

export default function Home() {
  return (
    <main className="bg-slate-950 pb-52">
      <HeroSection />
      <IngredientsSection />
      <EmailListContactForm />
    </main>
  );
}
