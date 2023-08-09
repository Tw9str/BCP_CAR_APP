import React, { useState } from "react";
import Product from "./Product";
import Link from "next/link";
import Social from "../widgets/Social";
import { useSelector } from "react-redux";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Breadcrumb from "../widgets/Breadcrumb";
import Filter from "../widgets/Filter";

export default function Shop({ products }) {
  const [productList, setProductList] = useState(products);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  function handleProductRemove(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setProductList((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((err) => console.error(err));
  }

  function handleProductSold(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => console.error(err));
  }

  const filters = {
    val1: false,
    val2: false,
    title1: false,
    title2: false,
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="panel-wrapper">
          <Breadcrumb />
          <Filter filters={filters} />
        </div>
        <h1 className="heading">Shop</h1>
        <div className="products">
          {productList.length < 1 && (
            <p className="no-results">Er zijn momenteel geen producten...</p>
          )}
          {productList.length > 0 &&
            productList.map(
              ({
                _id,
                title,
                description,
                price,
                imagesPath,
                slug,
                inStock,
              }) => (
                <Product
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  price={price}
                  imagesPath={imagesPath}
                  slug={slug}
                  inStock={inStock}
                  onProductRemove={handleProductRemove}
                  onProductSold={handleProductSold}
                />
              )
            )}
          {token && isAdmin && (
            <Link
              aria-label="Toevoegen"
              className="plus-icon"
              href="/add/product"
            >
              <AiOutlinePlusSquare />
            </Link>
          )}
        </div>
        <div className="social">
          <div>Volg ons</div>
          <Social />
        </div>
      </div>
    </div>
  );
}
