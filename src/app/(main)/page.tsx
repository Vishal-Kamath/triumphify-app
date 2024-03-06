import Image from "next/image";
import MainBanners from "./components/main.banner";
import CategoryCarousel from "./components/category.carousel";

export default function Home() {
  return (
    <main className="pb-52">
      <MainBanners />
      <CategoryCarousel />
    </main>
  );
}
