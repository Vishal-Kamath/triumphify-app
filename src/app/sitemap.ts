import { Product } from "@/@types/product";
import axios from "axios";

const getProducts = (): Promise<Product[] & { type: string }> =>
  axios
    .get<{ data: Product[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/details/`,
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

const getBlogs = (
  status?: Blog["status"],
): Promise<Blog[] & { type: string }> =>
  axios
    .get<{ data: Blog[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/blogs${status ? `?status=${status}` : ""}`,
      { withCredentials: true },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export default async function sitemap() {
  const products = await getProducts();

  // main routes
  const routes = [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/testimonials",
    "/faqs",
    "/terms",
  ];
  const mainLinks = routes.map((route) => ({
    url: route,
    lastModified: new Date().toISOString(),
  }));

  // policies
  const policies = ["/policies/privacy", "/policies/terms", "/policies/cookie"];
  const policiesLinks = policies.map((route) => ({
    url: route,
    lastModified: new Date().toISOString(),
  }));

  // products
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const productLinks = productRoutes.map((route) => ({
    url: route,
    lastModified: new Date().toISOString(),
  }));

  // blogs
  const blogs = await getBlogs();
  const blogRoutes = blogs.map((blog) => `/blogs/${blog.slug}`);
  const blogLinks = blogRoutes.map((route) => ({
    url: route,
    lastModified: new Date().toISOString(),
  }));

  return [...mainLinks, ...policiesLinks, ...productLinks, ...blogLinks];
}
