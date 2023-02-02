import Input from '../../components/Input';
import './index.scss';
import axios from 'axios';
import { useState } from 'react';

const Tambah = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [active, setActive] = useState();
  const [validationObj, setValidationObj] = useState({});

  const emptyData = () => {
    setName('');
    setPrice('');
    setStock('');
  };

  const validation = () => {
    const tempValidation = {};
    let isValid = true;
    if (name === '') {
      tempValidation.name = 'Nama produk tidak boleh kosong';
      isValid = false;
    }
    if (price === '') {
      tempValidation.price = 'Harga produk tidak boleh kosong';
      isValid = false;
    }
    if (stock === '') {
      tempValidation.stock = 'Stock produk tidak boleh kosong';
      isValid = false;
    }

    if (Object.keys(tempValidation) !== 0) {
      setValidationObj(tempValidation);
    }
    return isValid;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid && active === true) {
      try {
        console.log(isValid);
        await axios.post('http://localhost:3002/api/product', {
          name,
          price,
          stock,
        });
        alert('Data berhasil ditambahkan');
        emptyData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProduct}>
          <Input style={{ borderColor: validationObj.name ? 'red' : 'black' }} name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Produk..." label="Nama" />
          {validationObj.name ? <div style={{ fontSize: '13px', color: 'red', textAlign: 'center' }}>{validationObj.name}</div> : <div />}
          <Input style={{ borderColor: validationObj.price ? 'red' : 'black' }} name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga Produk..." label="Harga" />
          {validationObj.price ? <div style={{ fontSize: '13px', color: 'red', textAlign: 'center' }}>{validationObj.price}</div> : <div />}
          <Input style={{ borderColor: validationObj.stock ? 'red' : 'black' }} name="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock Produk..." label="Stock" />
          {validationObj.stock ? <div style={{ fontSize: '13px', color: 'red', textAlign: 'center' }}>{validationObj.stock}</div> : <div />}
          <Input name="status" type="checkbox" onChange={() => setActive(true)} label="Active" />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
