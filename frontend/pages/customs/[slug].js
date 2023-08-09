import CustomDetails from "@/components/customs/CustomDetails";
import NotFound from "../404";

export default function CarDetailsPage({ custom, error }) {
  if (!custom) {
    return <NotFound>Car not found.</NotFound>;
  }

  if (error) {
    return <NotFound>{error}</NotFound>;
  }

  return <CustomDetails custom={custom} />;
}

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customs/custom/${slug}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch custom details");
    }
    const custom = await res.json();
    return { props: { custom } };
  } catch (error) {
    return {
      props: { custom: [], error: "Failed to fetch custom details." },
    };
  }
};
