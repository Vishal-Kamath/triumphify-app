import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ProductLoadingPage: FC = () => {
  return (
    <div className="padding-x flex w-full items-start gap-9 max-lg:flex-col">
      <Skeleton className="aspect-square h-full w-full rounded-[2rem]" />
      <div className="flex w-full flex-col gap-6 pt-12 lg:w-2/3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-[10rem]" />
            <Skeleton className="ml-auto h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <h3 className="flex flex-col gap-2 break-words text-2xl font-semibold lg:text-3xl">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-[5rem]" />
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>

        <Accordion type="single" collapsible>
          {[0, 1, 2].map((_, index) => (
            <AccordionItem key={index} value={"item" + index}>
              <AccordionTrigger>
                <Skeleton className="h-4" />
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductLoadingPage;
