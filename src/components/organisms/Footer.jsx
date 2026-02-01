const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} DBI Research Group. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
