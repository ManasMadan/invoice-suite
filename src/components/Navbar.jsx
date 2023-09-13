import { IonIcon } from "@ionic/react";
import { logoTableau } from "ionicons/icons";
import { useLocation } from "react-router";
import { journal, analyticsOutline, documents, calendar } from "ionicons/icons";
import { Link } from "react-router-dom";
const links = [
  { icon: journal, title: "Dashboard", path: "/" },
  { icon: analyticsOutline, title: "Analytics", path: "/analytics" },
  { icon: documents, title: "Invoices", path: "/invoices" },
  { icon: calendar, title: "Calendar", path: "/calendar" },
];

const CustomLinkComponent = ({ link }) => {
  const location = useLocation();
  const activeClasses = "bg-[#37373f]";
  const nonActiveClasses = "text-[#72767f]";

  return (
    <Link to={link.path}>
      <div
        className={`flex gap-4 px-4 py-2 rounded-lg text-sm ${
          location.pathname == link.path ? activeClasses : nonActiveClasses
        }`}
      >
        <IonIcon icon={link.icon} size="small" />
        {link.title}
      </div>
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav className="flex flex-col h-full border-r-3 rounded-2xl border-[#2d2e33] w-[250px] items-center justify-between py-12">
      <div className="flex justify-center items-center gap-2">
        <IonIcon icon={logoTableau} size="large" />
        <h1 className="underline underline-offset-8 font-inconsolata text-xl uppercase font-medium tracking-wider">
          Invoice Generator
        </h1>
      </div>
      <div className="flex flex-col gap-2 px-3 w-full">
        {links.map((link) => (
          <CustomLinkComponent link={link} />
        ))}
      </div>
      <div>Login</div>
    </nav>
  );
}
