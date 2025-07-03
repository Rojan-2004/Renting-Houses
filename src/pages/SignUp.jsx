import React from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center p-4 border-b">
        <img src="/logo.png" alt="Rental Buddy" className="h-10" />
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/landlord" className="hover:underline">Landlord</Link>
          <Link to="/tenants" className="hover:underline">Tenants</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/signup" className="hover:underline">Login/Sign Up</Link>
        </div>
      </nav>

      <div className="flex flex-1">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/livingroom.jpg)' }}></div>

        <div className="w-1/2 bg-gray-100 flex flex-col justify-center px-16 py-10">
          <h2 className="text-2xl font-bold mb-2">Hello!<br />Nice to meet you!</h2>
          <p className="mb-4 font-semibold">Lets Sign Up</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" placeholder="User Name" {...register("username", { required: true })} className="w-full p-3 border rounded" />
            <input type="text" placeholder="Phone No." {...register("phone", { required: true })} className="w-full p-3 border rounded" />
            <input type="email" placeholder="Email ID" {...register("email", { required: true })} className="w-full p-3 border rounded" />
            <input type="password" placeholder="Password" {...register("password", { required: true })} className="w-full p-3 border rounded" />
            <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true })} className="w-full p-3 border rounded" />
            <button type="submit" className="w-full p-3 bg-indigo-500 text-white font-bold rounded">Sign In</button>
          </form>
          <p className="mt-2 text-sm">Already have an Account? <Link to="/login" className="font-semibold text-black">Login Now</Link></p>
        </div>
      </div>

      <footer className="bg-white py-6 border-t">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Rental Buddy" className="h-12 mb-2" />
          <p className="text-sm text-center">Bhotahity-449002, Sifalganj Nayafer, Kathmandu Valley</p>
          <p className="text-sm">(123) 456-7890 | (123) 456-7890</p>
          <div className="flex space-x-3 mt-2">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="mt-4 space-x-4 text-xs">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT US</Link>
            <Link to="/help">HELP</Link>
            <Link to="/privacy">PRIVACY POLICY</Link>
            <Link to="/disclaimer">DISCLAIMER</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default SignUp;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
