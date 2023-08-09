import Customs from "@/components/customs";
import { useRouter } from "next/router";

export default function CustomsPage({ customs }) {
  const router = useRouter();

  return <Customs key={router.asPath} customs={customs} />;
}

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customs`
    );
    const customs = await res.json();

    if (query.sort && query.direction) {
      const sortedCustoms = customs.sort((a, b) => {
        if (query.direction === "asc") {
          return a[query.sort] - b[query.sort];
        } else {
          return b[query.sort] - a[query.sort];
        }
      });

      return { props: { customs: sortedCustoms } };
    } else {
      return { props: { customs } };
    }
  } catch (error) {
    return { props: { customs: [] } };
  }
};
