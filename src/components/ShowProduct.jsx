import React from 'react';
import { Link } from 'react-router-dom';

const ShowProduct = ({ data }) => {
  return (
    <div className="product-card max-w-sm w-[250px] lg:w-[300px] rounded-xl overflow-hidden mb-8 mx-3 border">

      <Link to={`/productdetails/${data.id}`}>
        <div className="w-full flex justify-center">
          <img
            className="product-image w-full p-5 lg:p-7 aspect-[1] object-contain"
            // className="w-full h-60 object-cover"

            src={data.image}
            alt={data.category}
          />
        </div>
      </Link>

      <div className="px-6 py-3">
        <div className="product-title font-bold">
          {data.title}
        </div>
        <p className="product-category text-sm mt-2">
          {data.category}
        </p>
        <div className="font-bold text-lg mt-3 text-gray-900">
          $ {data.price}
        </div>
      </div>

      <div className="px-6 pb-5 pt-1 flex gap-2 flex-wrap">
        <span className="rating-pill inline-block rounded-full px-3 py-1 text-xs font-semibold">
          {data.rating.rate} ⭐
        </span>
        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-600">
          {data.rating.count} Ratings
        </span>
      </div>
    </div>
  );
};

export default ShowProduct;
