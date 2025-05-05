import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CINEMAX</h3>
            <p className="text-gray-400 mb-4">
              The ultimate movie experience with state-of-the-art technology and
              premium comfort.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/cinemas"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cinemas
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Offers & Promotions
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>info@cinemax.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}

      <div className="border-t border-gray-800 mt-8 py-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} CINEMAX. All rights reserved.</p>
      </div>
      {/* </div> */}
    </footer>
  );
}
