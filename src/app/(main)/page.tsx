import HeroSection from "./components/hero";
import EmailListContactForm from "./components/email-list";
import IngredientsSection from "./components/ingredients";
import MainBanners from "./components/main.banner";
import BlogsSections from "./components/blogs";
import PromoVideoComponent from "./components/promo-video";
import ShopNow from "./components/shop-now";
import PureNaturalIngredients from "./components/pure-natural-ingredients";
import SecurePackaging from "./components/secure-packaging";

export default function Home() {
  return (
    <main className="isolate bg-slate-950 pb-52">
      <HeroSection />
      <IngredientsSection />
      <PureNaturalIngredients />
      <SecurePackaging />
      <PromoVideoComponent />
      <BlogsSections />
      {/* <ShopNow /> */}
      <EmailListContactForm />
      <MainBanners />
    </main>
  );
}
