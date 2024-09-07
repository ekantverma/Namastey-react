import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-600 text-lg text-center mb-6">
          At <span className="font-semibold text-orange-500">Foodie Web</span>, we aim to deliver not just food but happiness. With thousands of restaurants
          to choose from, we bring a variety of cuisines to your doorstep, ensuring a delightful dining experience at the click of a button.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            {/* <img
              className="w-full h-64 object-cover rounded-lg"
              src="https://via.placeholder.com/400x300" // Replace with actual image URL
              alt="Our Journey"
            /> */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Our Journey</h3>
            <p className="text-gray-600 mt-2">
              Starting in 2024, we have grown from a small team of food enthusiasts to a massive food delivery network spanning multiple cities. We continue to
              evolve every day to make your experience smoother.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              To provide the best food delivery experience by bringing together great restaurants, food lovers, and seamless technology, making food ordering
              as easy and enjoyable as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <span className="text-4xl text-orange-500 mb-2 inline-block">🚀</span>
            <h4 className="text-xl font-semibold text-gray-800">Fast Delivery</h4>
            <p className="text-gray-600 mt-2">
              Our cutting-edge logistics ensure that your food reaches you hot and fresh in the least possible time.
            </p>
          </div>
          <div className="text-center">
            <span className="text-4xl text-orange-500 mb-2 inline-block">🍽️</span>
            <h4 className="text-xl font-semibold text-gray-800">Variety of Cuisines</h4>
            <p className="text-gray-600 mt-2">
              We offer a wide range of cuisines from multiple restaurants, giving you endless choices to satisfy your cravings.
            </p>
          </div>
          <div className="text-center">
            <span className="text-4xl text-orange-500 mb-2 inline-block">📱</span>
            <h4 className="text-xl font-semibold text-gray-800">Easy Ordering</h4>
            <p className="text-gray-600 mt-2">
              With our user-friendly app and website, placing an order is quick and convenient, giving you a hassle-free experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


// import UserClass from "./UserClass";

// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <UserClass/>
//         </div>
//     )
// }

// export default About;