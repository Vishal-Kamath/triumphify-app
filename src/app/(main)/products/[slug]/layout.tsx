import axios from "axios";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const slug = params.slug;
    const product_meta = await axios.get<{
      data: {
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
      };
    }>(`${process.env.ENDPOINT}/api/products/meta/${slug}`);

    if (product_meta.status !== 200)
      return {
        title: "Something went wrong",
      };

    const { meta_title, meta_description, meta_keywords } =
      product_meta.data.data;
    return {
      title: meta_title,
      description: meta_description,
      keywords: meta_keywords,
    };
  } catch (err) {
    return {
      title: "Something went wrong",
    };
  }
}

const ProductLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default ProductLayout;
