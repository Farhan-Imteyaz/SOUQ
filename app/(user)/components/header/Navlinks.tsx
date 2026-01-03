import Link from "next/link";
const Navlinks = ({
  isLoggedIn,
  scrolled,
}: {
  isLoggedIn: boolean;
  scrolled: boolean;
}) => {
  const links = [
    { link: "/how-it-works", label: "How It Works" },
    { link: "/services", label: "Services" },
    { link: "/pricing", label: "Pricing" },
    { link: "/contact", label: "Contact" },
  ];
  return (
    <ul
      className={`hidden lg:flex  items-center transition-colors duration-100 space-x-6 ${
        scrolled ? "text-black!" : "text-white"
      }`}
    >
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            href={link.link}
            className="hover:bg-yellow-100 hover:text-slate-950 px-3 rounded-lg py-2 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;
