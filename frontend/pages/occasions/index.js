import Listings from "@/components/listingsPage";
import { useRouter } from "next/router";

export default function ListingsPage({ cars, error }) {
  const router = useRouter();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cars) {
    return <div>Not found.</div>;
  }

  return <Listings key={router.asPath} cars={cars} />;
}

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cars`);
    const cars = await res.json();

    if (query.sort && query.direction) {
      const sortedCars = cars.sort((a, b) => {
        if (query.direction === "asc") {
          return a[query.sort] - b[query.sort];
        } else {
          return b[query.sort] - a[query.sort];
        }
      });

      return { props: { cars: sortedCars } };
    } else {
      return { props: { cars } };
    }
  } catch (error) {
    return { props: { cars: [] } };
  }
};
