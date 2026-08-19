import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function EditEmployee() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

  const navigate = useNavigate();

  //get empObj from navigate hook
  const { state: employee } = useLocation();
  // console.log(state);

  useEffect(() => {
    if (!employee) {
      navigate("/list");
      return;
    }

    setValue("name", employee.name);
    setValue("email", employee.email);
    setValue("mobile", employee.mobile);
    setValue("designation", employee.designation);
    setValue("companyName", employee.companyName);
  }, [employee, navigate, setValue]);

  const saveModifiedEmp = async (modifiedEmp) => {
    // console.log(modifiedEmp);
    //make HTTP PUT req
    const res = await axios.put(`https://week6-backend-w7no.onrender.com/emp-api/employees/${employee._id}`, modifiedEmp);
    if (res.status === 200) {
      //navigate to ListOfEMps
      navigate("/list");
    }
  };

  if (!employee) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase text-amber-600">Update profile</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Edit employee</h1>
        <p className="mt-3 text-slate-600">Keep employee contact and role details current.</p>
      </div>

      <form
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8"
        onSubmit={handleSubmit(saveModifiedEmp)}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Full name</span>
            <input type="text" placeholder="Enter name" {...register("name")} className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Email address</span>
            <input type="email" placeholder="Enter email" {...register("email")} className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Mobile number</span>
            <input type="number" placeholder="Enter mobile number" {...register("mobile")} className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Designation</span>
            <input type="text" placeholder="Enter designation" {...register("designation")} className={inputClass} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-bold text-slate-700">Company</span>
            <input
              type="text"
              placeholder="Enter company name"
              {...register("companyName")}
              className={inputClass}
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-cyan-700 sm:w-auto"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
/*
  const res=await fetch()
  const obj=await res.json()

*/

/*
  const res=await axios.get()
  const obj=res.data

*/
