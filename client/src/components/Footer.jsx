import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BsCursorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <img src={logo} alt="StayEase.com" className="w-40 mb-4" />
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-700" />
              <a
                href="tel:+919798088801"
                className="text-blue-700 hover:text-blue-600"
              >
                +919798088801
              </a>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-700" />
              <a
                href="mailto:stayease07@gmail.com"
                className="text-blue-700 hover:text-blue-600"
              >
                stayease07@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-700" />
              <a href="" className="text-blue-700 hover:text-blue-600">
                Aurangabad, Bihar, India
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-blue-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="text-blue-700 hover:text-blue-600"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-700 hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-blue-700 hover:text-blue-600"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-4">Stay Updated</h5>
          <form className="flex">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-l-lg w-full outline-none text-gray-700 border border-gray-300 focus:border-blue-700"
            />
            <button
              type="submit"
              className="bg-blue-700 p-3 rounded-r-lg hover:bg-blue-800"
            >
              <BsCursorFill className="text-white" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://stayease.vercel.app/"
            className="font-semibold text-blue-700 cursor-pointer"
          >
            StayEase.com
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
