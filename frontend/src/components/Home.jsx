import { Link } from "react-router";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="py-6 sm:py-12">
        <div className="mb-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
          Team records in one place
        </div>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Manage employee profiles with a cleaner, faster workspace.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Create, review, and update employee details from a focused dashboard built
          for quick scanning and daily admin work.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/create-emp"
            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-cyan-700"
          >
            Add employee
          </Link>
          <Link
            to="/list"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm hover:border-cyan-400 hover:text-cyan-700"
          >
            View directory
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-white bg-white/70 p-5 shadow-2xl shadow-slate-200/80">
        <div className="rounded-lg bg-slate-950 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-200">Employee snapshot</p>
              <h2 className="mt-2 text-2xl font-black">Directory overview</h2>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              Live
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Profiles", "CRUD"],
              ["Updates", "Fast"],
              ["Records", "Secure"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase text-slate-300">{label}</p>
                <p className="mt-2 text-xl font-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center rounded-lg bg-white p-8">
            <img
              src={heroImage}
              alt="Layered dashboard illustration"
              className="h-52 w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
