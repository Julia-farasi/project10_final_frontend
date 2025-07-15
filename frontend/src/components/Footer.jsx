function Footer() {
  return (
    // <footer className="bg-gradient-to-r from-emerald-900 to-green-800 text-white py-6 px-4">
    <footer className="bg-gradient-to-r from-emerald-800 to-gray-900 text-gray-400 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="text-xs md:text-left">
          <a
            href="#"
            className="hover:text-emerald-300 transition-transform duration-500"
          >
            Let's Connect in LinkedIn: Julia-Kretschmer
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-right">
          © {new Date().getFullYear()} Julia's MindMoney WebApp
        </div>
      </div>
    </footer>
  );
}

export default Footer;
