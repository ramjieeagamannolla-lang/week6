import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

  //form submit
  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      //make HTTP POST req
      let res = await fetch("https://week6-backend-w7no.onrender.com/emp-api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        //navigate to employees component programatically
        navigate("/list");
      } else {
        let errorRes = await res.json();
       // console.log("error responce is ", errorRes);
        throw new Error(errorRes.reason);
      }
    } catch (err) {
     // console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //console.log(error);

  if (loading) {
    return <p className="text-center text-xl font-bold text-slate-600">Saving employee...</p>;
  }
  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase text-cyan-700">New profile</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Create employee</h1>
        <p className="mt-3 text-slate-600">Add contact, role, and company information.</p>
      </div>

      <form
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8"
        onSubmit={handleSubmit(onFormSubmit)}
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
          Add employee
        </button>
      </form>
    </div>
  );
}

export default CreateEmp;
