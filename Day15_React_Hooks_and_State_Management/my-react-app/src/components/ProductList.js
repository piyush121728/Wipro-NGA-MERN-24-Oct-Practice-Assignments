
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateProduct } from "../store/productsSlice";

export default function ProductList() {
  const { items, loading, error } = useSelector(s => s.products);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row">
      {items.slice(0, 12).map(p => (
        <div className="col-md-4 mb-3" key={p.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text fw-bold">Price: ${p.price}</p>
              <button 
                className="btn btn-primary"
                onClick={() => dispatch(updateProduct({ ...p, price: p.price + 1 }))}>
                Increase Price +1
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
