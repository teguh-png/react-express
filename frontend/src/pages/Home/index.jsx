import { Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:3002/api/product');
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={(e) => setSearch(e.target.value)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => {
              if (search === '') {
                return true;
              } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td className="text-right">
                  Rp.{` `}
                  {product.price}
                </td>
                <td className="text-center">
                  <Link to={`detail/${product._id}`} className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to={`edit/${product._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="#" className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
