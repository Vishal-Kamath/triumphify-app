import { FC } from "react";
import "./pure-natural-ingredients.css";
import Image from "next/image";

const PureNaturalIngredients: FC = () => {
  return (
    <div className="padding-x relative flex w-full flex-col gap-12 py-12">
      <h2 className="text-4xl font-semibold leading-[1.2] text-white lg:text-5xl lg:leading-[1.2]">
        Using <span className="text-purple-400">Pure</span> Natural Ingredients
      </h2>

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
        <GridSection
          title="Trust in Our Chemical-Free Ingredients"
          body="Our commitment to natural ingredients means you can trust that each product is formulated without synthetic chemicals or additives. We source our ingredients responsibly, focusing on sustainability and purity, so you can enjoy the benefits of nature in every use."
        />
        <GridSection
          title="Sustainable Sourcing"
          body="We partner with trusted suppliers who prioritize sustainable farming and harvesting practices. By choosing Triumphify, you are supporting eco-friendly methods that protect our planet for future generations."
        />
        <GridSection
          title="No Synthetic Additives"
          body="Our products are free from artificial preservatives, colors, and fragrances. Each ingredient is carefully selected to deliver maximum benefits while ensuring safety and efficacy."
        />
        <GridSection
          title="Holistic Health"
          body="Natural ingredients not only provide physical benefits but also support mental and emotional well-being. Our formulations are designed to nurture your body and mind, offering a holistic approach to health."
        />
      </div>

      <Image
        src="/home/ingredients-svg.svg"
        alt="ingredients background"
        width={500}
        height={500}
        className="absolute left-0 top-1/2 -translate-y-1/3 rotate-45 max-md:-translate-x-1/3"
      />
    </div>
  );
};

const GridSection: FC<{ title: string; body: string }> = ({ title, body }) => {
  return (
    <div className="glow flex w-full flex-col gap-4 rounded-2xl border-1 border-purple-900 bg-slate-950/50 px-6 py-8">
      <h4 className="text-xl text-purple-400 md:text-2xl">{title}</h4>
      <p className="text-justify text-sm text-slate-300">{body}</p>
    </div>
  );
};

export default PureNaturalIngredients;
