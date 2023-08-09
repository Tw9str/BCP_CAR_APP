import React from "react";
import Landing from "@/components/homePage/Landing";
import Categories from "@/components/homePage/Categories";
import Listings from "@/components/homePage/Listings";
import Review from "@/components/homePage/Review";

const Home = ({ cars, pageContent }) => {
  return (
    <>
      <Landing pageContent={pageContent} />
      <Listings cars={cars} />
      <Categories pageContent={pageContent} />
      <Review />
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const carRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cars`
    );
    const cars = await carRes.json();

    const pageContentRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pageContent`
    );
    const pageContentArray = await pageContentRes.json();
    const pageContent = pageContentArray[0];

    return { props: { cars, pageContent } };
  } catch (error) {
    return { props: { cars: [], pageContent: [] } };
  }
};

export default Home;
