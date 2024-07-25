import { FC } from "react";
import { TbTruckDelivery } from "react-icons/tb";

const SecurePackaging: FC = () => {
  return (
    <div className="padding-x relative isolate flex w-full flex-col gap-12 py-12 pb-24">
      <div className="flex w-full flex-col gap-6">
        <h2 className="text-4xl font-semibold leading-[1.2] text-white lg:text-5xl lg:leading-[1.2]">
          Discreet and Secure <span className="text-purple-400">Secure</span>{" "}
          Packaging
        </h2>

        <p className="text-sm text-slate-300">
          Your privacy is important to us. Triumphify offers discreet packaging
          and shipping options, ensuring your products arrive securely and
          privately. We respect your confidentiality and strive to provide a
          seamless and discreet purchasing experience from start to finish.{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
        <GridSection
          number={1}
          title="Confidential Delivery"
          body="Our discreet packaging ensures that your order remains private from the moment it leaves our facility until it arrives at your doorstep. No product names or branding will be visible on the outside packaging."
        />
        <GridSection
          number={2}
          title="Secure Shipping"
          body="We use trusted shipping partners to guarantee that your products are delivered safely and on time. Track your order every step of the way with our reliable shipping services."
        />
        <GridSection
          number={3}
          title="Environmentally Friendly"
          body="Our packaging materials are not only discreet but also eco-friendly. We use recyclable and biodegradable materials whenever possible to reduce our environmental impact."
        />
      </div>

      <TbTruckDelivery
        strokeWidth={1.5}
        className="absolute right-0 top-1/2 -z-10 size-[25rem] -translate-y-1/3 text-[#161C2E] md:right-5"
      />
    </div>
  );
};

const GridSection: FC<{ number: number; title: string; body: string }> = ({
  number,
  title,
  body,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="flex aspect-square size-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
          {number}
        </span>
        <h4 className="text-xl text-purple-400 md:text-2xl">{title}</h4>
      </div>
      <p className="text-justify text-sm text-slate-300">{body}</p>
    </div>
  );
};
export default SecurePackaging;
