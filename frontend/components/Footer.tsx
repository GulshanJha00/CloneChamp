<footer className="bg-gray-900 text-white py-6 mt-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Left Side: Logo/Brand */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <img src="/path-to-your-logo.png" alt="CloneChamp Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-yellow-400">CloneChamp</span>
      </div>

      {/* Middle: Links */}
      <div className="flex space-x-8 mb-4 md:mb-0">
        <a href="/about" className="text-sm hover:text-yellow-400 transition-colors">About</a>
        <a href="/contact" className="text-sm hover:text-yellow-400 transition-colors">Contact</a>
        <a href="/terms" className="text-sm hover:text-yellow-400 transition-colors">Terms & Conditions</a>
        <a href="/privacy" className="text-sm hover:text-yellow-400 transition-colors">Privacy Policy</a>
      </div>

      {/* Right Side: Social Icons */}
      <div className="flex space-x-6">
        <a href="https://facebook.com" className="text-xl hover:text-yellow-400 transition-colors">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" className="text-xl hover:text-yellow-400 transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://github.com" className="text-xl hover:text-yellow-400 transition-colors">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com" className="text-xl hover:text-yellow-400 transition-colors">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>

    {/* Bottom Text */}
    <div className="text-center text-sm text-gray-400 mt-4">
      <p>&copy; {new Date().getFullYear()} CloneChamp. All rights reserved.</p>
    </div>
  </div>
</footer>
