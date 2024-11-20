import React from 'react'

function ImageContainer({currentItem, mainImage, setMainImage}) {

  return (
    <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-lg h-full flex flex-col justify-between">
          {mainImage && (
            <div className="h-[500px] w-full flex justify-center items-center bg-white">
              <img
                src={mainImage}
                alt={currentItem?.itemTitle}
                className="object-contain w-[400px] h-[400px] max-w-full max-h-full shadow-md"
              />
            </div>
          )}

          {/* Thumbnail Images */}
          {currentItem?.imgUrls && currentItem.imgUrls.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 p-2 bg-gray-200 rounded-md shadow-inner">
              {currentItem.imgUrls.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail-${index}`}
                  onClick={() => setMainImage(url)}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-md transition duration-200 ease-in-out transform ${mainImage === url
                    ? "border-blue-500 scale-110"
                    : "border-gray-300 hover:border-blue-400"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
  )
}

export default ImageContainer
