import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-slate-900 text-white py-12 w-screen">
      <div className="mx-auto px-4  md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h5 className="text-2xl font-bold mb-4">GuruGram</h5>
            <p className="text-blue-100">
              Our mentoring platform connects candidates with industry experts
              to provide personalized guidance and support.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/gurugramofficial" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com/gurugram" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://www.linkedin.com/company/gurugram/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://www.instagram.com/gurugramofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              {["Home", "About Us", "Mentor Sign-up", "Candidate Sign-up", "Login"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-300 transition-colors no-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={20} className="mr-2" />
                <a href="mailto:info@gurugram.com" className="hover:text-blue-300 transition-colors no-underline">info@gurugram.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2" />
                <a href="tel:+91234567890" className="hover:text-blue-300 transition-colors no-underline">+91 789465463</a>
              </li>
              <li className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>123 Mentor Street, Knowledge City</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold mb-4">Newsletter</h5>
            <p className="mb-4 text-blue-100">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-200 bg-gray-100"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="my-4 text-blue-100">Get access to exclusive resources, connect with like-minded learners, and stay updated with the latest in your field.</p>
          </div>
        </div>
        <hr className="my-8 border-blue-400" />
        <div className="text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} GuruGram. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;