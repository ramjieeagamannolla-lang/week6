import { Link, useLocation } from "react-router";

function Employee() {
  //read state received in navigation
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70">
        <h1 className="text-2xl font-black text-slate-950">Employee not selected</h1>
        <p className="mt-2 text-slate-600">Choose an employee from the directory.</p>
        <Link
          to="/list"
          className="mt-6 inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700"
        >
          View employees
        </Link>
      </div>
    );
  }

  const details = [
    ["Email", state.email],
    ["Mobile", state.mobile],
    ["Designation", state.designation],
    ["Company", state.companyName],
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div className="grid size-20 place-items-center rounded-lg bg-cyan-100 text-3xl font-black text-cyan-700">
          {state.name?.charAt(0)?.toUpperCase() || "E"}
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-cyan-700">Employee profile</p>
          <h1 className="mt-1 text-4xl font-black text-slate-950">{state.name}</h1>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-1 break-words text-lg font-bold text-slate-900">{value || "Not added"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employee;
