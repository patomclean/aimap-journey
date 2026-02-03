"use client";

interface InspirationGalleryProps {
  images: string[];
  destination: string;
}

export default function InspirationGallery({
  images,
  destination,
}: InspirationGalleryProps) {
  // Placeholder images if none provided
  const displayImages =
    images.length > 0
      ? images
      : [
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},travel,1`,
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},landmark,2`,
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},culture,3`,
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},food,4`,
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},nature,5`,
          `https://source.unsplash.com/400x300/?${encodeURIComponent(destination)},architecture,6`,
        ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#1E3A5F] mb-4">
        Inspiracion del viaje
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {displayImages.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-28 rounded-xl overflow-hidden bg-gray-100"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                backgroundColor: "#E5E7EB",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
