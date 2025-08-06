# Google İşletme Yorumları Entegrasyonu Kurulum Rehberi

Bu rehber, Google İşletme yorumlarını web sitenize entegre etmek için gerekli adımları açıklar.

## 1. Google Places API Anahtarı Alma

### Adım 1: Google Cloud Console'a Giriş
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. Yeni bir proje oluşturun veya mevcut projenizi seçin

### Adım 2: Places API'yi Etkinleştirme
1. Sol menüden "APIs & Services" > "Library" seçin
2. Arama kutusuna "Places API" yazın
3. "Places API" seçin ve "Enable" butonuna tıklayın

### Adım 3: API Anahtarı Oluşturma
1. Sol menüden "APIs & Services" > "Credentials" seçin
2. "Create Credentials" > "API Key" tıklayın
3. Oluşturulan API anahtarını kopyalayın

### Adım 4: API Anahtarını Kısıtlama (Önerilen)
1. Oluşturulan API anahtarına tıklayın
2. "Application restrictions" bölümünde "HTTP referrers" seçin
3. Sitenizin domain'ini ekleyin (örn: `*.yourdomain.com/*`)
4. "API restrictions" bölümünde "Restrict key" seçin
5. Sadece "Places API" seçin

## 2. Google İşletme Place ID'sini Bulma

### Yöntem 1: Google Maps'ten
1. [Google Maps](https://maps.google.com) adresine gidin
2. İşletmenizi arayın
3. İşletme sayfasını açın
4. URL'deki `place_id` parametresini kopyalayın
   - Örnek: `https://www.google.com/maps/place/.../@.../data=.../place_id/ChIJ...`

### Yöntem 2: Place ID Finder Tool
1. [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) adresine gidin
2. İşletmenizin adını ve adresini girin
3. Oluşturulan Place ID'yi kopyalayın

## 3. Environment Variables Ayarlama

### .env.local Dosyası Oluşturma
Proje ana dizininde `.env.local` dosyası oluşturun ve şu değişkenleri ekleyin:

```env
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

## 4. Place ID'yi Kodda Güncelleme

`app/page.tsx` dosyasında `YOUR_GOOGLE_PLACE_ID_HERE` yerine gerçek Place ID'nizi yazın:

```tsx
<Reviews placeId="ChIJ..." />
```

## 5. Test Etme

1. Uygulamayı başlatın: `npm run dev`
2. Ana sayfaya gidin
3. "Müşteri Yorumları" bölümünün yüklendiğini kontrol edin

## 6. Özellikler

### Yorumlar Bölümü Özellikleri:
- ✅ Google İşletme yorumlarını otomatik çekme
- ✅ Genel puan ve toplam değerlendirme sayısı
- ✅ Yıldızlı puanlama sistemi
- ✅ Sayfalama (pagination)
- ✅ Responsive tasarım
- ✅ Loading ve error durumları
- ✅ Google İşletme sayfasına yönlendirme

### Güvenlik:
- API anahtarı server-side'da saklanır
- Rate limiting ve error handling
- HTTPS referrer kısıtlaması

## 7. Sorun Giderme

### Yaygın Hatalar:

**"Google Places API key not configured"**
- `.env.local` dosyasında `GOOGLE_PLACES_API_KEY` değişkeninin doğru ayarlandığından emin olun

**"Google API Error: REQUEST_DENIED"**
- API anahtarının doğru olduğunu kontrol edin
- Places API'nin etkinleştirildiğini kontrol edin
- API kısıtlamalarını kontrol edin

**"Google API Error: NOT_FOUND"**
- Place ID'nin doğru olduğunu kontrol edin
- İşletmenin Google Maps'te mevcut olduğunu kontrol edin

**Yorumlar yüklenmiyor**
- İşletmenizin Google'da yorumları olduğunu kontrol edin
- Network sekmesinde API çağrılarını kontrol edin

## 8. Maliyet

Google Places API'nin ücretsiz kotası:
- Günlük 1,000 istek
- Aylık 28,500 istek

Çoğu küçük-orta ölçekli işletme için yeterlidir.

## 9. Destek

Sorun yaşarsanız:
1. Google Cloud Console'da API kullanımını kontrol edin
2. Browser'ın Network sekmesinde hata mesajlarını kontrol edin
3. Console'da JavaScript hatalarını kontrol edin 