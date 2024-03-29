export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_name: string;
  category: string;
  description: string;
  product_accordians: {
    title: string;
    description: string;
  }[];
  product_images: string[];

  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface Variation {
  id: string;
  key: string;
  combinations: unknown;
  quantity: number;
  discount: number;
  price: number;
}

export interface ProductWithDetails extends Product {
  attributes: {
    name: string;
    values: {
      name: string;
    }[];
  }[];
  variations: Variation[];
}

export type TemplateAContent = {
  title: string;
  description: string;
  template_image: string;
};
interface TemplateAShema {
  template: "A";
  content: TemplateAContent;
}

export type TemplateBContent = {
  title0: string;
  description0: string;
  template_image0: string;
  title1: string;
  description1: string;
  template_image1: string;
  title2: string;
  description2: string;
  template_image2: string;
};
interface TemplateBShema {
  template: "B";
  content: TemplateBContent;
}

export type TemplateCContent = {
  title0: string;
  description0: string;
  template_image0: string;
  title1: string;
  description1: string;
  template_image1: string;
};
interface TemplateCShema {
  template: "C";
  content: TemplateCContent;
}

export type Showcase = {
  id: string;
  product_id: string;
  index: number;
  created_at: Date;
  updated_at: Date | null;
} & (TemplateAShema | TemplateBShema | TemplateCShema);

export interface ProductReview {
  id: string;
  product_id: string;
  user_username: string;
  user_image: string;
  review_title: string;
  review_description: string;
  rating: number;

  created_at: Date;
  updated_at: Date | null;
}

export interface ProductReviewStats {
  ratings: {
    rating: number;
    count: number;
  }[];
  total_reviews: number;
  average_rating: number;
}