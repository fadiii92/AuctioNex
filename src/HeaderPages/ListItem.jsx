import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for validation
const auctionSchema = z.object({
  itemTitle: z.string().min(3, 'Item title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  startingBid: z.number().positive('Starting bid must be a positive number'),
  auctionDuration: z.string().nonempty('Please select a valid auction duration'),
  category: z.enum(['Electronics', 'Clothing', 'Furniture', 'Books', 'Other']),
  images: z.any().refine((files) => files?.length > 0, 'Please upload at least one image'),
});

const AuctionForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(auctionSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Item Title */}
      <div>
        <label>Item Title</label>
        <input
          type="text"
          {...register('itemTitle')}
          className="border p-2 rounded w-full"
        />
        {errors.itemTitle && <p className="text-red-500">{errors.itemTitle.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label>Description</label>
        <textarea
          {...register('description')}
          className="border p-2 rounded w-full"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      {/* Starting Bid */}
      <div>
        <label>Starting Bid</label>
        <input
          type="number"
          {...register('startingBid', { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.startingBid && <p className="text-red-500">{errors.startingBid.message}</p>}
      </div>

      {/* Auction Duration */}
      <div>
        <label>Auction Duration</label>
        <input
          type="datetime-local"
          {...register('auctionDuration')}
          className="border p-2 rounded w-full"
        />
        {errors.auctionDuration && <p className="text-red-500">{errors.auctionDuration.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label>Category</label>
        <select {...register('category')} className="border p-2 rounded w-full">
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      {/* Images */}
      <div>
        <label>Images</label>
        <input
          type="file"
          {...register('images')}
          multiple
          className="border p-2 rounded w-full"
        />
        {errors.images && <p className="text-red-500">{errors.images.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Auction
      </button>
    </form>
  );
};

export default AuctionForm;
