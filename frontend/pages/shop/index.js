import Shop from "@/components/shop";
import { useRouter } from "next/router";

export default function ShopPage({ products }) {
  const router = useRouter();

  return <Shop key={router.asPath} products={products} />;
}

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
    );
    const products = await res.json();
    if (query.sort && query.direction) {
      const sortedProducts = products.sort((a, b) => {
        if (query.direction === "asc") {
          return a[query.sort] - b[query.sort];
        } else {
          return b[query.sort] - a[query.sort];
        }
      });
      return { props: { products: sortedProducts } };
    } else {
      return { props: { products } };
    }
  } catch (error) {
    return { props: { products: [] } };
  }
};
