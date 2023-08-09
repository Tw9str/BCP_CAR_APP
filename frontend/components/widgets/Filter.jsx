import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io"
export default function Filter({filters: {val1, val2, title1, title2}}){

  return (
    <div className="filter">
      <div className="filter-name">
        Sorteren
        <IoMdArrowDropdown size={24}/>
      </div>
      <ul>
        <li><Link href="?sort=price&direction=asc">Prijs oplopend</Link></li>
        <li><Link href="?sort=price&direction=desc">Prijs aflopend</Link></li>
        {val1 && <li><Link href={`?sort=${val1}&direction=asc`}>{title1} oplopend</Link></li>}
        {val1 && <li><Link href={`?sort=${val1}&direction=desc`}>{title1} aflopend</Link></li>}
        {val2 && <li><Link href={`?sort=${val2}&direction=asc`}>{title2} oplopend</Link></li>}
        {val2 && <li><Link href={`?sort=${val2}&direction=desc`}>{title2} aflopend</Link></li>}
      </ul>
    </div>
  );
};
