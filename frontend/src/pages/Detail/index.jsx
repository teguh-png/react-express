import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.scss';

const Detail = () => {
  const [products, setProducts] = useState();
  const { id } = useParams();

  useEffect(() => {
    getDataByID();
  }, []);

  const getDataByID = async () => {
    const response = await axios.get(`http://localhost:3002/api/product/${id}`);
    setProducts(response.data);
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        {products && (
          <tbody>
            <tr>
              <td>ID</td>
              <td>: {products._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>: {products.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: Rp. {products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {products.stock}</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Detail;
