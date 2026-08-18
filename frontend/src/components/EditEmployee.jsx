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
    const res = await axios.put(`https://employee-4-ra8f.onrender.com/emp-api/employees/${employee._id}`, modifiedEmp);
    if (res.status === 200) {
      //navigate to ListOfEMps
      navigate("/list");
    }
  };

  if (!employee) {
    return null;
  }

  return (
    <div>
      <h1 className="text-5xl text-center text-yellow-600">Edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10" onSubmit={handleSubmit(saveModifiedEmp)}>
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3  p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3  p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName")}
          className="mb-3 borde-2 p-3 w-full rounded-2xl"
        />

        <button type="submit" className="text-2xl rounded-2xl bg-green-800 text-white block mx-auto p-4">
          Save
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
