import ProductDetails from "@/components/shop/ProductDetails";
import NotFound from "../404";

export default function CarDetailsPage({ product, error }) {
  if (!product) {
    return <NotFound>Car not found.</NotFound>;
  }

  if (error) {
    return <NotFound>{error}</NotFound>;
  }

  return <ProductDetails product={product} />;
}

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/product/${slug}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await res.json();
    return { props: { product } };
  } catch (error) {
    return {
      props: { product: [], error: "Failed to fetch product details." },
    };
  }
};
