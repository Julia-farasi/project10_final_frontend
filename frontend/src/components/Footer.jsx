function Footer() {
  return (
    // <footer className="bg-gradient-to-r from-emerald-900 to-green-800 text-white py-6 px-4">
    <footer className="bg-gradient-to-r from-gray-900 to-emerald-600 text-amber-50 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="text-sm">
          <a
            href="#"
            className="text-amber-50 hover:text-emerald-300 transition-transform duration-500"
          >
            Impressum
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-amber-50 text-center md:text-right">
          © {new Date().getFullYear()} Julia's MindMoney WebApp
        </div>
      </div>
    </footer>
  );
}

export default Footer;
