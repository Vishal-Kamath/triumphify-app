import HeroSection from "./components/hero";
import EmailListContactForm from "./components/email-list";
import IngredientsSection from "./components/ingredients";
import MainBanners from "./components/main.banner";
import BlogsSections from "./components/blogs";

export default function Home() {
  return (
    <main className="isolate bg-slate-950 pb-52">
      <HeroSection />
      <IngredientsSection />
      <BlogsSections />
      <EmailListContactForm />
      <MainBanners />
    </main>
  );
}
