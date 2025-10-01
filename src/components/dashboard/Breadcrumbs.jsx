import { useLocation, Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function Breadcrumb() {
  const location = useLocation();

  // Mapping path ke label yang lebih friendly
  const pathMap = {
    dashboard: "Beranda",
    quiz: "Kuis Seru",
    character: "Karakter",
    profile: "Profil",
    create: "Buat Baru",
    edit: "Edit",
    results: "Hasil",
  };

  const paths = location.pathname.split("/").filter((path) => path);

  const breadcrumbItems = [
    {
      label: "Beranda",
      path: "/dashboard",
      icon: FaHome,
      isCurrent: location.pathname === "/dashboard",
    },
    ...paths.map((path, index) => {
      const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1),
        path: fullPath,
        isCurrent: index === paths.length - 1,
      };
    }),
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <FaChevronRight className="text-gray-400" size={12} />}

          {item.isCurrent ? (
            <span
              className={`flex items-center space-x-1 ${
                item.isCurrent
                  ? "text-[#4F46E5] font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item.icon && <item.icon size={14} />}
              <span>{item.label}</span>
            </span>
          ) : (
            <Link
              to={item.path}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#4F46E5] transition-colors"
            >
              {item.icon && <item.icon size={14} />}
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
