import GalleryGrid from "../components/GalleryGrid";
import { gallery } from "../data/gallery";

export default function Gallery() {
  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="h1">Gallery</h1>
        <p className="p max-w-2xl mx-auto">
          Some of my favorite scenes with you. Tap any photo to view it larger.
        </p>
      </header>

      <GalleryGrid images={gallery} />
    </div>
  );
}
