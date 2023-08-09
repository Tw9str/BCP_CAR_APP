import React, { useState } from "react";
import { useRouter } from "next/router";
import AddCar from "@/components/add/AddCar";
import AddProduct from "@/components/add/AddProduct";
import AddCustom from "@/components/add/AddCustom";
import AddReview from "@/components/add/AddReview";
import NotFound from "../404";

export default function Add() {
  const router = useRouter();

  const { type } = router.query;

  return type === "car" ? (
    <AddCar />
  ) : type === "product" ? (
    <AddProduct />
  ) : type === "custom" ? (
    <AddCustom />
  ) : type === "review" ? (
    <AddReview />
  ) : (
    <NotFound />
  );
}
