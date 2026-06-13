import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Trash2, Star, Loader2, ImageIcon } from "lucide-react";

export default function GalleryManager() {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "men", is_featured: false });

  useEffect(() => {
    base44.entities.GalleryPhoto.list("-created_date", 100).then(setPhotos);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const newPhoto = await base44.entities.GalleryPhoto.create({
      photo_url: file_url,
      title: form.title || file.name.replace(/\.[^/.]+$/, ""),
      category: form.category,
      is_featured: form.is_featured,
    });
    setPhotos(prev => [newPhoto, ...prev]);
    setForm({ title: "", category: "men", is_featured: false });
    e.target.value = "";
    setUploading(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.GalleryPhoto.delete(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeatured = async (photo) => {
    const updated = await base44.entities.GalleryPhoto.update(photo.id, { is_featured: !photo.is_featured });
    setPhotos(prev => prev.map(p => p.id === photo.id ? updated : p));
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4">
        <p className="font-body text-sm font-medium text-foreground">Upload New Photo</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Title (optional)"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
          />
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="other">Other</option>
          </select>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-input border border-border/50 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              className="accent-primary"
            />
            <span className="font-body text-sm text-foreground">Featured</span>
          </label>
        </div>
        <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/60 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? (
            <><Loader2 className="h-4 w-4 text-primary animate-spin" /><span className="font-body text-sm text-muted-foreground">Uploading...</span></>
          ) : (
            <><Upload className="h-4 w-4 text-primary" /><span className="font-body text-sm text-muted-foreground">Click to select a photo</span></>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
        </label>
      </div>

      {/* Gallery Grid */}
      {photos.length === 0 ? (
        <div className="py-16 text-center bg-card border border-border/50 rounded-2xl">
          <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-body text-sm text-muted-foreground">No photos yet. Upload your first one above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
              <img src={photo.photo_url} alt={photo.title || "Gallery"} className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <span className="font-body text-xs px-2 py-0.5 rounded-full bg-black/40 text-white capitalize">{photo.category}</span>
                  <button onClick={() => toggleFeatured(photo)} title="Toggle featured" className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors ${photo.is_featured ? "bg-primary text-primary-foreground" : "bg-black/40 text-white hover:bg-primary/70"}`}>
                    <Star className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  {photo.title && <p className="font-body text-xs text-white truncate flex-1 mr-2">{photo.title}</p>}
                  <button onClick={() => handleDelete(photo.id)} className="h-7 w-7 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors flex-shrink-0">
                    <Trash2 className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}