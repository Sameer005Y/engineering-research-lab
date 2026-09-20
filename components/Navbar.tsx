import Link from "next/link";

const navItems = [
  { label: "Research", href: "/research" },
  { label: "Engineering", href: "/engineering" },
  { label: "AI", href: "/ai" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          Engineering Research Lab
        </Link>

        <div className="flex items-center gap-8 text-sm text-gray-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}