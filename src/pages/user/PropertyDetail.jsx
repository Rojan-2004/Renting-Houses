// import React from 'react';
// import { useParams, Link } from 'react-router-dom';

// const PropertyDetail = () => {
//   const { id } = useParams();

//   const similarHomes = [
//     { id: 1, image: '/similar1.png', title: 'Modern 2BHK Apartment', price: 'Rs 42,000' },
//     { id: 2, image: '/similar2.png', title: 'Spacious 3BHK Flat', price: 'Rs 55,000' },
//     { id: 3, image: '/similar3.png', title: 'Luxury Villa with Garden', price: 'Rs 75,000' },
//     { id: 4, image: '/similar4.png', title: 'Affordable Family House', price: 'Rs 36,000' }
//   ];

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
//           <li><Link to="/landlord" className="hover:text-blue-600">Landlord</Link></li>
//           <li><Link to="/tenants" className="hover:text-blue-600">Tenants</Link></li>
//           <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
//           <li><Link to="/login" className="hover:text-blue-600">Login/Sign-Up</Link></li>
//         </ul>
//       </nav>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row p-8 gap-6">
//         {/* Images */}
//         <div className="w-full md:w-1/2">
//           <img src="/house1.png" className="w-full h-96 object-cover rounded-md" alt="Main Property" />
//           <div className="flex gap-2 mt-2">
//             {["/house1.png", "/house2.png", "/house3.png"].map((src, index) => (
//               <img key={index} src={src} className="h-20 w-28 rounded object-cover border" alt={`Thumbnail ${index + 1}`} />
//             ))}
//           </div>
//         </div>

//         {/* Info */}
//         <div className="w-full md:w-1/2 space-y-4">
//           <h2 className="text-2xl font-bold">4 BHK WITH GOOD FURNISHING AND GOOD NEIGHBOURHOOD</h2>
//           <ul className="list-disc ml-6 text-sm space-y-1 text-gray-700">
//             <li>Spacious 4 BHK with natural light and city view.</li>
//             <li>Modular kitchen and fully-furnished hall.</li>
//             <li>Parking space, Wi-Fi, security, and garden.</li>
//           </ul>
//           <div className="flex flex-wrap gap-2 mt-4">
//             <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">4 Bedrooms</span>
//             <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">2 Bathrooms</span>
//             <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">1 Kitchen</span>
//           </div>
//           <p className="text-xl font-bold text-green-600 mt-4">Rs 56,000/month</p>
//           <button className="bg-orange-500 text-white px-6 py-2 mt-2 rounded hover:bg-orange-600">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="px-8 mb-8">
//         <h3 className="text-xl font-semibold mb-2">Description</h3>
//         <p className="text-sm text-gray-600">
//           This beautifully furnished 4BHK is perfect for families looking for a spacious and peaceful living environment.
//           It features modern amenities and is located in a safe, green neighborhood close to shops, schools, and hospitals.
//         </p>
//       </div>

//       {/* Similar Homes */}
//       <div className="px-8 mb-12">
//         <h3 className="text-xl font-semibold mb-4">Similar Homes</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {similarHomes.map((home) => (
//             <div key={home.id} className="border rounded shadow-sm overflow-hidden">
//               <img src={home.image} alt={home.title} className="w-full h-40 object-cover" />
//               <div className="p-3 space-y-1">
//                 <p className="text-sm font-medium">{home.title}</p>
//                 <p className="text-xs text-gray-500">{home.price}</p>
//                 <button className="text-blue-600 text-sm hover:underline">Book Now</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white py-6 px-8 border-t text-center">
//         <img src="/logo.png" alt="Logo" className="h-10 mx-auto mb-2" />
//         <p className="text-sm">44800 Bhaktapur,SrijanaNagar, Kathmandu Valley, Nepal</p>
//         <p className="text-sm">+977 123456789 | rentalbuddy@gmail.com</p>
//         <div className="mt-2 space-x-3 text-sm">
//           <a href="#" className="hover:underline">Privacy Policy</a>
//           <a href="#" className="hover:underline">Disclaimer</a>
//           <a href="#" className="hover:underline">Help</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PropertyDetail;


import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const propertyData = {
  1: {
    title: '4 BHK WITH GOOD FURNISHING AND GOOD NEIGHBOURHOOD',
    price: 'Rs 56,000/month',
    images: ['/house1.png', '/house2.png', '/house3.png'],
    features: [
      'Spacious 4 BHK with natural light and city view.',
      'Modular kitchen and fully-furnished hall.',
      'Parking space, Wi-Fi, security, and garden.',
    ],
    tags: ['4 Bedrooms', '2 Bathrooms', '1 Kitchen'],
  },
};

const similarHomes = [
  { id: 1, image: '/similar1.png', title: 'Modern 2BHK Apartment', price: 'Rs 42,000' },
  { id: 2, image: '/similar2.png', title: 'Spacious 3BHK Flat', price: 'Rs 55,000' },
  { id: 3, image: '/similar3.png', title: 'Luxury Villa with Garden', price: 'Rs 75,000' },
  { id: 4, image: '/similar4.png', title: 'Affordable Family House', price: 'Rs 36,000' },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = propertyData[id] || propertyData[1]; // fallback if invalid id

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">RENTAL BUDDY</span>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/landlord" className="hover:text-blue-600">Landlord</Link></li>
          <li><Link to="/tenants" className="hover:text-blue-600">Tenants</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
          <li><Link to="/login" className="hover:text-blue-600">Login/Sign-Up</Link></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row p-8 gap-6">
        {/* Images */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <motion.img
            whileHover={{ scale: 1.02 }}
            src={property.images[0]}
            className="w-full h-96 object-cover rounded-md shadow-lg"
            alt="Main Property"
          />
          <div className="flex gap-2 mt-2">
            {property.images.map((src, index) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                key={index}
                src={src}
                className="h-20 w-28 rounded object-cover border shadow"
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 space-y-4"
        >
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <ul className="list-disc ml-6 text-sm space-y-1 text-gray-700">
            {property.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {property.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs ${
                  i === 0
                    ? 'bg-red-100 text-red-600'
                    : i === 1
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xl font-bold text-green-600 mt-4">{property.price}</p>

          {/* ✅ Book Now Button Redirects */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/booking/${id}`)}
            className="bg-orange-500 text-white px-6 py-2 mt-2 rounded hover:bg-orange-600 transition"
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-8 mb-8"
      >
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-sm text-gray-600">
          This beautifully furnished property is perfect for families looking for a spacious and peaceful living environment.
          It features modern amenities and is located in a safe, green neighborhood close to shops, schools, and hospitals.
        </p>
      </motion.div>

      {/* Similar Homes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-8 mb-12"
      >
        <h3 className="text-xl font-semibold mb-4">Similar Homes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {similarHomes.map((home) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={home.id}
              className="border rounded shadow-sm overflow-hidden bg-white"
            >
              <img src={home.image} alt={home.title} className="w-full h-40 object-cover" />
              <div className="p-3 space-y-1">
                <p className="text-sm font-medium">{home.title}</p>
                <p className="text-xs text-gray-500">{home.price}</p>
                <button className="text-blue-600 text-sm hover:underline" onClick={() => navigate(`/booking/${home.id}`)}>Book Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white py-6 px-8 border-t text-center"
      >
        <img src="/logo.png" alt="Logo" className="h-10 mx-auto mb-2" />
        <p className="text-sm">44800 Bhaktapur, SrijanaNagar, Kathmandu Valley, Nepal</p>
        <p className="text-sm">+977 123456789 | rentalbuddy@gmail.com</p>
        <div className="mt-2 space-x-3 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Disclaimer</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default PropertyDetail;
