import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postItem, editItem } from "../redux/itemActions";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const auctionSchema = (isEditMode) =>
  z.object({
    itemTitle: z
      .string()
      .min(3, "Item title must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    startingBid: z.number().positive("Starting bid must be a positive number"),
    auctionDuration: z
      .string()
      .nonempty("Please select a valid auction duration"),
    category: z.enum([
      "Electronics",
      "Clothing",
      "Furniture",
      "Books",
      "Other",
    ]),
    images: isEditMode
      ? z.any()
      : z
          .any()
          .refine(
            (files) => files?.length > 0,
            "Please upload at least one image"
          ),
  });

const AuctionForm = () => {
  const { pathname, state } = useLocation();
  const itemId = useParams();
  const isEditMode = pathname.includes("editItem");

  // console.log(pathname, state)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      itemTitle: state?.itemTitle || "",
      description: state?.description || "",
      startingBid: state?.startingBid || "",
      auctionDuration: state?.auctionDuration || "",
      category: state?.category || "",
    },
    resolver: zodResolver(auctionSchema(isEditMode)),
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [postmsg, setpostMsg] = useState("");

  const onSubmit = async (data) => {
    if (pathname.includes("listitem")) {
      await postItem({
        itemOwner: currentUser.uid,
        ...data,
      });
      navigate("/myitems");
    } else {
      try {
        await editItem(itemId.id, data);
        navigate("/myitems");
      } catch {
        setpostMsg("Could not edit items");
      }
    }
  };

  const validateImageFiles = (event) => {
    const files = event.target.files;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const invalidFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validImageTypes.includes(file.type)) {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      setError(`Invalid file types: ${invalidFiles.join(", ")}`);
      event.target.value = "";
      return false;
    }

    setError("");
    return true;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 bg-white rounded-lg shadow-md"
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Item Title
        </label>
        <input
          type="text"
          {...register("itemTitle")}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.itemTitle && (
          <p className="text-red-500">{errors.itemTitle.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Starting Bid
        </label>
        <input
          type="number"
          {...register("startingBid", { valueAsNumber: true })}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.startingBid && (
          <p className="text-red-500">{errors.startingBid.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Auction Duration
        </label>
        <input
          type="datetime-local"
          {...register("auctionDuration")}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.auctionDuration && (
          <p className="text-red-500">{errors.auctionDuration.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Category
        </label>
        <select
          {...register("category")}
          disabled={isEditMode}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Images</label>
        <input
          type="file"
          {...register("images")}
          multiple
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={validateImageFiles}
        />
        {error && <p className="text-red-500">{error}</p>}
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}

        {pathname.includes("editItem") &&
          state.imgUrls &&
          state.imgUrls.length > 0 && (
            <div className="flex space-x-2 mt-2">
              {state.imgUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border border-gray-300 shadow-sm"
                />
              ))}
            </div>
          )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`py-2 px-4 text-white rounded transition ${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Loading..." : "Submit Auction"}
      </button>

      {postmsg && <p className="text-red-500">{postmsg}</p>}
    </form>
  );
};

export default AuctionForm;
