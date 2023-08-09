import Link from "next/link";

const NotFound = ({ children }) => {
  return (
    <div className="not-found">
      <div className="container">
        <h1>Oeps! Er ging iets mis</h1>
        {children}
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/occasions">Occasions</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/customs">Customs</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NotFound;
