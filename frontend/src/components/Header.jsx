import { NavLink } from "react-router";

function Header() {
  const navLinkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold",
      isActive
        ? "bg-slate-950 text-white shadow-sm"
        : "text-slate-600 hover:bg-white hover:text-slate-950",
    ].join(" ");

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white shadow-sm">
            E
          </span>
          <span>
            <span className="block text-lg font-black text-slate-950">EmpTrack</span>
            <span className="block text-xs font-medium text-slate-500">Employee manager</span>
          </span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 p-1">
          <NavLink to="" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="create-emp" className={navLinkClass}>
            Add employee
          </NavLink>
          <NavLink to="list" className={navLinkClass}>
            Employees
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
