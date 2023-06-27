/* eslint-disable jsx-a11y/no-static-element-interactions */
import './index.scss';

import { IProduct } from '@/types/product';

type Props = {
  item: IProduct;
};

export default function Product({ item }: Props) {
  const { title, price } = item;

  return (
    <div className="product-item">
      <div className="name">{title}</div>
      <div className="price">{price}$</div>
    </div>
  );
}
