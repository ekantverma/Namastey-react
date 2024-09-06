import { useState } from "react";

const Footer = () => {
    
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
      

    return (
    <footer className="bg-gray-800 text-gray-300 py-8 bottom-0">
      <div className="container mx-auto px-4">
        {/* Upper Section */}
        <div className="md:flex justify-between items-center mb-8">
          {/* Logo and About */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Foodie Web</h2>
            <p className="mt-2 text-gray-400">
              DelightFull tasty Food.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
              <ul>
                <li><a href="" className="hover:text-white">Foodie Web</a></li>
                <li><a href="" className="hover:text-white">Contact Email</a></li>
                <li><a href="" className="hover:text-white">Phone: +91 123 456 7890</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
              <ul className="flex space-x-4">
                <li><a href="https://www.instagram.com/ekantverma_13/" className="hover:text-white"><i className="fab fa-facebook"></i> Instagram</a></li>
                <li><a href="https://x.com/EkantVerma13" className="hover:text-white"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="https://www.linkedin.com/in/ekantverma/" className="hover:text-white"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
          <p className="text-gray-400">&copy; 2024 Foodie Web. All rights reserved.</p>
          <p className="text-gray-400">
            Developed by <a href="https://linkedin.com/in/ekantverma" className="hover:text-white">Ekant Verma</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
