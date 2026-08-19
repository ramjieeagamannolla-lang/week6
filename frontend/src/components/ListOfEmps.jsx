import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "https://week6-backend-w7no.onrender.com/emp-api/employees";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const gotoEmployee = (empObj) => {
    //navigate to /employee along with selected emp obj
    navigate("/employee", { state: empObj });
  };

  const gotoEditEmployee = (empObj) => {
    //navigate to /employee along with selected emp obj
    navigate("/edit-emp", { state: empObj });
  };

  useEffect(() => {
    async function getEmps() {
      try {
        setLoading(true);
        let res = await fetch(API_URL);
        if (res.status === 200) {
          let resObj = await res.json();
          setEmps(resObj.payload);
        } else {
          throw new Error("Could not load employees");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getEmps();
  }, []);

  const deleteEmployee = async (empObj) => {
    const shouldDelete = window.confirm(`Delete ${empObj.name}?`);
    if (!shouldDelete) return;

    const res = await fetch(`${API_URL}/${empObj._id}`, { method: "DELETE" });
    if (res.status === 200) {
      setEmps((currentEmps) => currentEmps.filter((emp) => emp._id !== empObj._id));
    }
  };

  if (loading) {
    return <p className="text-center text-xl font-bold text-slate-600">Loading employees...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-cyan-700">Directory</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Employees</h1>
          <p className="mt-2 text-slate-600">{emps.length} employee profiles found</p>
        </div>
        <button
          onClick={() => navigate("/create-emp")}
          className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-cyan-700"
        >
          Add employee
        </button>
      </div>

      {emps.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-10 text-center">
          <h2 className="text-2xl font-black text-slate-950">No employees yet</h2>
          <p className="mt-2 text-slate-600">Create your first employee profile to begin.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {emps.map((empObj) => (
            <article
              key={empObj._id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-cyan-100 text-lg font-black text-cyan-700">
                  {empObj.name?.charAt(0)?.toUpperCase() || "E"}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black text-slate-950">{empObj.name}</h2>
                  <p className="truncate text-sm font-medium text-slate-500">{empObj.email}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-lg bg-slate-50 p-4 text-sm">
                <div>
                  <p className="font-bold text-slate-500">Designation</p>
                  <p className="font-semibold text-slate-800">{empObj.designation || "Not added"}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-500">Company</p>
                  <p className="font-semibold text-slate-800">{empObj.companyName || "Not added"}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  onClick={() => gotoEmployee(empObj)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
                >
                  View
                </button>
                <button
                  onClick={() => gotoEditEmployee(empObj)}
                  className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-bold text-white hover:bg-amber-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(empObj)}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfEmps;
