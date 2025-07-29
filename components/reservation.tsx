"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, Users } from "lucide-react"

export function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    section: "indoor",
    guests: "",
    requests: "",
  })

  const TIME_OPTIONS = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ]

  // Remove times state and loadingTimes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        alert("Teşekkürler! Rezervasyon talebiniz gönderildi.")
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          section: 'indoor',
          guests: '',
          requests: '',
        })
      } else {
        console.error(await res.text())
        alert('Rezervasyon gönderilemedi.')
      }
    } catch (err) {
      console.error(err)
      alert('Rezervasyon gönderilemedi.')
    }
  }

const handleInputChange = (field: string, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
    ...(field === 'date' || field === 'section' || field === 'guests' ? { time: '' } : {}),
  }))
}

  // Remove useEffect for slot availability

  return (
    <section id="reservation" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">Rezervasyon Yap</h2>
          <p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Unutulmaz bir yemek deneyimi için masanızı rezerve edin. Özellikle hafta sonu akşamları için önceden rezervasyon yapmanızı öneririz.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="text-lg sm:text-2xl flex items-center">
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Rezervasyon Detayları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium text-sm sm:text-base">
                        Ad Soyad *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium text-sm sm:text-base">
                        E-posta *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-medium text-sm sm:text-base">
                      Telefon Numarası *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="date" className="text-slate-700 font-medium text-sm sm:text-base">
                        Tarih *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        className="mt-1"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-slate-700 font-medium text-sm sm:text-base">
                        Saat *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("time", value)} value={formData.time} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Saat seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guests" className="text-slate-700 font-medium text-sm sm:text-base">
                        Kişi Sayısı *
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="section" className="text-slate-700 font-medium text-sm sm:text-base">
                      Bölüm
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("section", value)} value={formData.section}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indoor">İç Mekan</SelectItem>
                        <SelectItem value="outdoor">Dış Mekan</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="requests" className="text-slate-700 font-medium text-sm sm:text-base">
                      Özel İstekler
                    </Label>
                    <Textarea
                      id="requests"
                      value={formData.requests}
                      onChange={(e) => handleInputChange("requests", e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Özel istekler..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-lg"
                  >
                    Rezervasyon Yap
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                  <CardTitle className="text-base sm:text-xl flex items-center">
                    <Clock className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm sm:text-base">Pazartesi - Perşembe</span>
                      <span className="text-slate-600 text-sm sm:text-base">17:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm sm:text-base">Cuma - Cumartesi</span>
                      <span className="text-slate-600 text-sm sm:text-base">17:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm sm:text-base">Pazar</span>
                      <span className="text-slate-600 text-sm sm:text-base">16:00 - 21:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <CardTitle className="text-base sm:text-xl flex items-center">
                    <Users className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Rezervasyon Politikası
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                    
                    <li>• 6 kişiden fazla gruplar için önceden arama yapın</li>
                    <li>• Özel etkinlikler için 48 saat önceden haber verin</li>
                    <li>• İptal için en az 2 saat önceden bilgi verin</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
