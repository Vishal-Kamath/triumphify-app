import { ProductWithDetails } from "@/@types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShareButton from "../display/share";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LikeButton from "../components/like";
import AddToCartButton from "./addtocart-button";

const BuyProductDetails: FC<{ product: ProductWithDetails }> = ({
  product,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentLink = new URLSearchParams(Array.from(searchParams.entries()));
  const searchLink = currentLink.toString();
  const link = `${process.env.APP_WEBSITE}${pathname}${searchLink ? `?${searchLink}` : ""}`;

  function selectAttribute(parent: string, value: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(parent);
    } else {
      current.set(parent, value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  const chosenAttributes = product.attributes.map((attribute) => {
    const selectedValue =
      searchParams.get(attribute.name) || attribute.values[0].name;

    return [attribute.name, selectedValue].join(":");
  });

  let variationsSplit = product.variations.map((variation) => ({
    ...variation,
    key: variation.key.split(" - "),
  }));
  chosenAttributes.forEach((attribute) => {
    variationsSplit = variationsSplit.filter((variation) =>
      variation.key.includes(attribute),
    );
  });

  const choosenVariant = variationsSplit[0];

  return (
    <div className="flex flex-col gap-6 pt-12 lg:w-2/3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-light text-slate-600">
            {product.brand_name}
          </p>

          <div className="flex gap-3">
            <LikeButton productId={product.id} />
            <ShareButton link={link} />
          </div>
        </div>
        <h3 className="break-words text-2xl font-semibold lg:text-3xl">
          {product.name}
        </h3>
      </div>

      {choosenVariant ? (
        !!choosenVariant?.discount ? (
          <div className="flex items-baseline gap-2 text-lg">
            <span>
              &#8377;
              {choosenVariant?.price *
                ((100 - (choosenVariant?.discount || 0)) / 100)}
            </span>
            <s className="text-gray-500">
              &#8377;
              {choosenVariant?.price}
            </s>
            <span className="font-bold text-green-600">
              ({choosenVariant?.discount}% OFF)
            </span>
          </div>
        ) : (
          <span className="text-lg">&#8377;{choosenVariant?.price}</span>
        )
      ) : null}

      <Accordion
        type="multiple"
        defaultValue={product.attributes.map((attr) => attr.name)}
      >
        {product.attributes.map((attribute, index) => {
          const selectedValue =
            searchParams.get(attribute.name) || attribute.values[0].name;

          return (
            <AccordionItem key={attribute.name + index} value={attribute.name}>
              <AccordionTrigger className="flex gap-3">
                <span>{attribute.name}</span>
                <Badge className="mr-auto bg-purple-900">{selectedValue}</Badge>
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-3 text-xs">
                {attribute.values.map((value, index) => (
                  <Button
                    key={value.name + index}
                    className={cn(
                      "rounded-full",
                      value.name === selectedValue
                        ? "border-purple-600 bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                        : "",
                    )}
                    onClick={() => selectAttribute(attribute.name, value.name)}
                    variant="outline"
                  >
                    {value.name}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex w-full gap-3">
        <AddToCartButton
          productId={product.id}
          variationId={choosenVariant?.id}
        />
        <Link
          href={`/products/${product.slug}`}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-full rounded-full",
          )}
        >
          Learn more
        </Link>
      </div>

      <div className="text-sm text-gray-900">{product.description}</div>

      <Accordion type="single" collapsible>
        {product.product_accordians.map((description, index) => (
          <AccordionItem key={description.title + index} value={"item" + index}>
            <AccordionTrigger>{description.title}</AccordionTrigger>
            <AccordionContent className="text-xs">
              {description.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BuyProductDetails;
