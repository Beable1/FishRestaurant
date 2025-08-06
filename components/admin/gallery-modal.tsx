"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Upload, Save, Loader2 } from "lucide-react"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  image?: any
  onSave: (imageData: any) => void
}

export function GalleryModal({ isOpen, onClose, image, onSave }: GalleryModalProps) {
  const [formData, setFormData] = useState({
    title: image?.title || "",
    description: image?.description || "",
    category: image?.category || "",
    imageUrl: image?.imageUrl || "",
    featured: image?.featured || false
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {image ? "Resim Düzenle" : "Yeni Resim Ekle"}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-slate-700 font-medium">
                Başlık *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="mt-1"
                placeholder="Resim başlığını girin"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-slate-700 font-medium">
                Kategori *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dishes">Yemeklerimiz</SelectItem>
                  <SelectItem value="outdoor">Dış Mekan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-700 font-medium">
                Açıklama
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1"
                rows={3}
                placeholder="Resim açıklamasını girin"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl" className="text-slate-700 font-medium">
                Resim URL *
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                required
                className="mt-1"
                placeholder="/dishes/resim.jpg veya /outdoor/resim.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
              <p className="text-sm text-slate-500 mt-1">
                Resim dosyasını public/dishes veya public/outdoor klasörüne ekleyin ve URL'yi buraya yazın.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured" className="text-slate-700 font-medium">
                Öne Çıkan Resim
              </Label>
            </div>

            <div className="flex justify-between items-center">
              
              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Kaydet
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 