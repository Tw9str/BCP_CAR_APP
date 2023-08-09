import Link from 'next/link';
import { useRouter } from 'next/router';
import {FaChevronLeft} from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

const Breadcrumb = ({ make, slug }) => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');
  const shouldRenderBreadcrumb = router.pathname !== "/";

  return (
    shouldRenderBreadcrumb && 
    <div className="breadcrumb">
      <nav>
        <ul>
          <li><button aria-label="Terug" onClick={() => history.go(-1)}><FaChevronLeft size={24} /></button></li>
          <li><Link aria-label="Homepage" href="/"><BiHomeAlt /></Link></li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            {slug === segment ? segment = make : segment}
            if (segment.includes("?sort=")) return;
            const formattedSegment = segment.replace(/-/g, ' ');
            return (
              <li key={index}>
                <MdOutlineKeyboardArrowRight />
                <span><Link href={path}>{formattedSegment.charAt(0).toUpperCase() + formattedSegment.slice(1)}</Link></span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;