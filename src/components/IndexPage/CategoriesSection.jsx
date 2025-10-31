import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/store/categories`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <section className="max-w-6xl mx-auto px-2 pb-6">
        {/* Heading */}
        <div className="text-center mb-12 pt-4">
          <h2 className="text-4xl font-bold text-gray-800">Categories</h2>
          <p className="text-gray-600 mt-2 text-lg">Explore what we offer</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categoryproduct/${cat.id}`)}
              className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={cat.image ? cat.image : "/img/default.png"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

              {/* Text + Button (Bottom Right) */}
              <div className="absolute bottom-4 right-4 text-white 
                              flex flex-col items-end space-y-2">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-gray-200">{cat.description ?? ""}</p>
                <button onClick={() => navigate(`/categoryproduct/${cat.id}`)} 
                        className="py-2 px-4 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CategoriesSection;
