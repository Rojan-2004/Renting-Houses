

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";

// export default function LoginPage() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [showModal, setShowModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const onSubmitLogin = (data) => {
//     alert(`Welcome back, ${data.email}!`);
//     setSuccessMessage(`Login successful for ${data.email}`);
//   };

//   const onSubmitForgot = (data) => {
//     alert(`OTP sent to ${data.email}`);
//     setShowModal(false);
//     reset();
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="flex items-center space-x-2">
//           <img src="/logo.png" alt="Logo" className="h-10 w-10" />
//           <span className="text-xl font-bold">RENTAL BUDDY</span>
//         </div>
//         <ul className="flex space-x-6 text-sm font-medium">
//           <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
//         </ul>
//       </nav>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row flex-grow">
//         {/* Login Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
//           <h1 className="text-2xl font-bold mb-2">Hello! Welcome!</h1>
//           <p className="mb-4">Let's Login To Your Account</p>

//           <form onSubmit={handleSubmit(onSubmitLogin)} className="w-full max-w-sm space-y-4">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email ID"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Invalid email"
//                   }
//                 })}
//                 className="w-full p-2 border rounded"
//               />
//               {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Minimum 6 characters" }
//                 })}
//                 className="w-full p-2 border rounded"
//               />
//               {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
//               <div className="text-right mt-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(true)}
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//               Login
//             </button>
//           </form>

//           {successMessage && (
//             <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
//           )}

//           <p className="mt-4">
//             Don’t have an Account? <Link to="/signup" className="text-blue-600">Sign In Now</Link>
//           </p>
//         </div>

//         {/* Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             src="/luxuryhouse.jpg"
//             alt="Luxury House"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg">
//             <h2 className="text-xl font-bold text-center mb-4">Reset Account Password</h2>
//             <p className="text-center text-sm mb-6">
//               Enter The Email Associated With Your Account And We'll Send You Password Reset Instructions.
//             </p>
//             <form onSubmit={handleSubmit(onSubmitForgot)} className="space-y-4">
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email ID"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "Invalid email"
//                     }
//                   })}
//                   className="w-full p-3 border rounded bg-gray-100"
//                 />
//                 {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black"
//               >
//                 Send OTP
//               </button>
//             </form>
//             <p
//               className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
//               onClick={() => setShowModal(false)}
//             >
//               Return to Signin
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
  // Separate forms
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
    reset: resetForgot,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState("");

  const onSubmitLogin = (data) => {
    alert(`Welcome back, ${data.email}`);
    setSuccessMessage(`Login successful for ${data.email}`);
  };

  const onSubmitForgot = (data) => {
    setOtpSentMessage(`OTP sent to ${data.email}`);
    setTimeout(() => {
      setShowModal(false);
      setOtpSentMessage("");
      resetForgot();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">RENTAL BUDDY</span>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-2xl font-bold mb-2">Hello! Welcome!</h1>
          <p className="mb-4">Let's Login To Your Account</p>

          <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="w-full max-w-sm space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email ID"
                {...registerLogin("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email"
                  }
                })}
                className="w-full p-2 border rounded"
              />
              {loginErrors.email && (
                <p className="text-red-600 text-sm">{loginErrors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...registerLogin("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full p-2 border rounded"
              />
              {loginErrors.password && (
                <p className="text-red-600 text-sm">{loginErrors.password.message}</p>
              )}

              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
          )}

          <p className="mt-4">
            Don’t have an Account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign In Now
            </Link>
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/luxuryhouse.jpg"
            alt="Luxury House"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">
              Reset Account Password
            </h2>
            <p className="text-center text-sm mb-6">
              Enter the email associated with your account and we’ll send you password reset instructions.
            </p>

            <form onSubmit={handleSubmitForgot(onSubmitForgot)} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email ID"
                  {...registerForgot("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email"
                    }
                  })}
                  className="w-full p-3 border rounded bg-gray-100"
                />
                {forgotErrors.email && (
                  <p className="text-red-600 text-sm">{forgotErrors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black"
              >
                Send OTP
              </button>

              {otpSentMessage && (
                <p className="text-green-600 text-center mt-3">{otpSentMessage}</p>
              )}
            </form>

            <p
              className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setShowModal(false);
                setOtpSentMessage("");
                resetForgot();
              }}
            >
              Return to Signin
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
