import axios from 'axios';
import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const getDataByID = async () => {
      const response = await axios.get(`http://localhost:3002/api/product/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
      setStock(response.data.stock);
    };
    getDataByID();
  }, [id]);

  const emptyData = () => {
    setName('');
    setPrice('');
    setStock('');
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/api/product/${id}`, {
        name,
        price,
        stock,
      });
      alert('Data berhasil diupdate');
      emptyData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Produk..." label="Nama" />
          <Input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga Produk..." label="Harga" />
          <Input name="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock Produk..." label="Stock" />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
