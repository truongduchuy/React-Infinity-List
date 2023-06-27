import './App.scss';

import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { API_URL } from '@/constants/apiUrl';
import { IProduct, IProductListResponse } from '@/types/product';
import axiosInstance from '@/utils/api';

import { Product, SearchField } from './components';

const PAGE_SIZE = 20;

const initFilters = {
  limit: PAGE_SIZE,
  skip: 0,
};

function App() {
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState<{
    products: IProduct[];
    total: number;
  }>({
    products: [],
    total: 0,
  });

  const debouncedSearch = debounce((searchValue: string) => {
    setFilters({ searchValue, ...initFilters });
    setProductData({
      products: [],
      total: 0,
    });
  }, 500);

  const [filters, setFilters] = useState({ ...initFilters, searchValue: '' });

  const getData = async () => {
    setLoading(true);
    try {
      const { searchValue, ...restFilter } = filters;
      const endpoint = searchValue ? API_URL.searchProducts : API_URL.products;
      const { data } = await axiosInstance.get<IProductListResponse>(endpoint, {
        params: searchValue
          ? {
              q: searchValue,
            }
          : restFilter,
      });

      if (data) {
        const { products, total } = data;

        if (searchValue) {
          setProductData({
            products,
            total,
          });
        } else {
          setProductData((prevData) => ({
            products: [...prevData.products, ...products],
            total,
          }));
        }
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const listRef = useRef<HTMLInputElement>(null);

  const handleScrollDown = () => {
    const { scrollTop, scrollHeight = 0, offsetHeight = 0 } = listRef.current || {};
    const isReachedBottom = Number(scrollTop) > scrollHeight - offsetHeight - 50;

    if (isLoading) return;
    if (filters.skip < productData.total && isReachedBottom) {
      setFilters({ ...filters, skip: filters.skip + PAGE_SIZE });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div className="app">
      <div className="list-box">
        <h3>Product List</h3>
        <div className="search-box">
          <SearchField onChange={handleSearch} />
        </div>
        <div className="card-list" ref={listRef} onScroll={handleScrollDown}>
          {productData.products?.map((product) => (
            <Product key={product.id} item={product} />
          ))}
          <div className="loader-box">
            <ClipLoader loading={isLoading} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
