interface IProduct {
  id: string;
  title: string;
  price: number;
}

interface IProductListResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export type { IProduct, IProductListResponse };
