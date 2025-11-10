// src/components/Card.jsx (Modified)

import React from "react";
import { useNavigate } from "react-router";

// Define a constant for the maximum description length
const MAX_DESCRIPTION_LENGTH = 120;

const Card = ({ id, name, description, amount, stock, price, categoryId, authorId, imgUrl }) => {
  const navigate = useNavigate();

  // --- Truncation Logic ---
  const truncatedDescription = 
    description.length > MAX_DESCRIPTION_LENGTH 
      ? description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : description;
  // -------------------------

  return (
<div className="border-4 border-black bg-white shadow-[8px_8px_0_0_#000] rounded-none overflow-hidden transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] h-[700px] flex flex-col">

      {imgUrl && (
        <div className="border-b-4 border-black">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col justify-between h-full">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">{name}</h2>
        <p 
          className="text-base font-medium text-gray-800 mb-4 h-[4.5em] overflow-hidden" 
          title={description.length > MAX_DESCRIPTION_LENGTH ? description : undefined}
        >
          {truncatedDescription}
        </p>

        <div className="flex flex-col gap-1 text-sm">
          <p><span className="font-bold">Amount:</span> {amount}</p>
          <p><span className="font-bold">Stock:</span> {stock}</p>
          <p><span className="font-bold">Price:</span> ${price}</p>
          <p><span className="font-bold">Category:</span> {categoryId}</p>
          <p><span className="font-bold">By:</span> {authorId}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => navigate(`/${id}`)} 
            className="flex-1 border-4 border-black bg-blue-300 text-black font-bold py-2 hover:bg-black hover:text-blue-300 transition-colors"
          >Details</button>
        </div>
      </div>
    </div>
  );
};

export default Card;