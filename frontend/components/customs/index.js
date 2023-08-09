import React, { useState } from "react";
import Link from "next/link";
import Social from "../widgets/Social";
import { useSelector } from "react-redux";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Breadcrumb from "../widgets/Breadcrumb";
import Filter from "../widgets/Filter";
import Custom from "./Custom";

export default function Customs({ customs }) {
  const [customList, setCustomList] = useState(customs);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  function handleCustomRemove(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/custom/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setCustomList((prevCustoms) =>
          prevCustoms.filter((custom) => custom._id !== id)
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCustomSold(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/custom/update/${id}`, {
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
    <div className="customs-page">
      <div className="container">
        <div className="panel-wrapper">
          <Breadcrumb />
          <Filter filters={filters} />
        </div>
        <h1 className="heading">Customs</h1>
        <div className="customs">
          {customList.length < 1 && (
            <p className="no-results">Er zijn momenteel geen producten...</p>
          )}
          {customList.length > 0 &&
            customList.map(
              ({
                _id,
                title,
                description,
                price,
                imagesPath,
                slug,
                inStock,
              }) => (
                <Custom
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  price={price}
                  imagesPath={imagesPath}
                  slug={slug}
                  inStock={inStock}
                  onCustomRemove={handleCustomRemove}
                  onCustomSold={handleCustomSold}
                />
              )
            )}
          {token && isAdmin && (
            <Link
              aria-label="Toevoegen"
              className="plus-icon"
              href="/add/custom"
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
