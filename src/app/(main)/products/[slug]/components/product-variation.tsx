"use client";

import { ProductWithDetails } from "@/@types/product";
import { useProductWithDetails } from "@/lib/products";
import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FC } from "react";
import AddToCartButton from "./addtocart-button";
import { Separator } from "@/components/ui/separator";

const ProductVariations: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: product, isLoading, isFetched } = useProductWithDetails(slug);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function selectVariation(variant: ProductWithDetails["variations"][0]) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const combinations = variant.combinations as Record<string, string>;
    for (const combinate of Object.keys(combinations)) {
      current.set(combinate, combinations[combinate]);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`, {
      scroll: false,
    });
  }

  if (!product) return null;
  const chosenVariant = product.attributes
    .map((attribute) => {
      const selectedValue =
        searchParams.get(attribute.name) || attribute.values[0].name;

      return [attribute.name, selectedValue].join(":");
    })
    .sort()
    .join(" - ");

  const choosenVariantObject =
    product.variations.find((variant) => variant.key === chosenVariant) ||
    product.variations[0];

  if (isLoading) return null;
  return (
    <div className="text-white md:py-12">
      <div className="padding-x flex gap-6 bg-slate-900 py-12 max-md:flex-col">
        <div className="flex w-full flex-col gap-4">
          <h3 className="max-w-md text-xl font-semibold md:text-3xl">
            Made with <span className="text-purple-300">100%</span> Natural
            Ingredients
          </h3>
        </div>
        <div
          style={{
            boxShadow: "0 0 10px #030712",
          }}
          className="flex w-full flex-col gap-6 rounded-md border-2 border-slate-700 bg-slate-800 p-6 shadow-md lg:w-2/3"
        >
          <div className="flex flex-col gap-3">
            <h4 className="text-lg">Variations</h4>
            <div className="flex flex-col gap-2">
              {product.variations.map((variation, index) => (
                <button
                  key={variation.key + index}
                  onClick={() => selectVariation(variation)}
                  className={cn(
                    "group flex justify-between gap-3 rounded-md border-2 bg-transparent px-3 py-4",
                    variation.key === choosenVariantObject.key
                      ? "border-purple-600 bg-purple-950/40 hover:border-purple-500"
                      : "border-slate-600 hover:border-slate-500 hover:bg-slate-700",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2",
                      variation.key === choosenVariantObject.key
                        ? "border-purple-600 bg-purple-950/60 text-purple-600"
                        : "border-slate-500 text-transparent group-hover:bg-purple-950/60 group-hover:text-purple-600",
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="break-words text-slate-400 md:text-[16px]">
                    {variation.key
                      .split(" - ")
                      .map((value) => value.split(":")[1])
                      .join(" x ")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {choosenVariantObject ? (
            !!choosenVariantObject?.discount ? (
              <div className="flex items-baseline gap-2 text-lg md:text-xl">
                <span>
                  &#36;
                  {choosenVariantObject?.price *
                    ((100 - (choosenVariantObject?.discount || 0)) / 100)}
                </span>
                <s className="text-slate-500">
                  &#36;
                  {choosenVariantObject?.price}
                </s>
                <span className="font-bold text-green-600">
                  ({choosenVariantObject?.discount}% OFF)
                </span>
              </div>
            ) : (
              <span className="text-lg md:text-xl">
                &#36;{choosenVariantObject?.price}
              </span>
            )
          ) : (
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-4 w-4" />
              <span>Variation not available</span>
            </div>
          )}

          <Separator />
          <AddToCartButton
            productId={product.id}
            variationId={choosenVariantObject.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductVariations;
