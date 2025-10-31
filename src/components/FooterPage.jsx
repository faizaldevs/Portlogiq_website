const FooterPage = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
          { title: "Support", links: ["Help Center", "Contact Us", "FAQs", "Terms of Service"] },
          { title: "Products", links: ["Pricing", "Features", "Integrations", "API"] },
          { title: "Resources", links: ["Docs", "Guides", "Community", "Security"] },
        ].map((col, index) => (
          <div key={index} className="text-right">
            <h3 className="text-white text-lg font-semibold mb-4">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 Portlogiq. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterPage;
