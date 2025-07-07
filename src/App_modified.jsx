import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { MapPin, Search, Star, Clock, Phone, Globe, Camera, Heart, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import landmarksData from './assets/qalyubia_landmarks_data.json'
import './App.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLandmark, setSelectedLandmark] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)

  // Categories for landmarks (removed دينية, طبيعية, تسوق)
  const landmarkCategories = ['الكل', 'تراثية', 'ثقافية', 'ترفيهية']
  
  // Service categories (removed مستشفيات وصيدليات, مراكز شرطة, نقاط إسعاف)
  const serviceCategories = [
    { name: 'فنادق', icon: '🏨', color: 'bg-blue-500' },
    { name: 'مطاعم ومقاهي', icon: '🍽️', color: 'bg-orange-500' },
    { name: 'بنوك وماكينات ATM', icon: '🏦', color: 'bg-green-500' },
    { name: 'وسائل انتقال', icon: '🚌', color: 'bg-purple-500' },
    { name: 'مراكز تسوق', icon: '🛍️', color: 'bg-pink-500' }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  // Filter landmarks based on category and search term
  const filteredLandmarks = landmarksData.filter(landmark => {
    const matchesCategory = selectedCategory === 'الكل' || landmark.category === selectedCategory
    const matchesSearch = landmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         landmark.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get services from landmarks data
  const services = landmarksData.filter(item => 
    ['فنادق', 'مطاعم ومقاهي', 'بنوك وماكينات ATM', 
     'وسائل انتقال', 'مراكز تسوق'].includes(item.type)
  )

  const toggleFavorite = (landmarkId) => {
    setFavorites(prev => 
      prev.includes(landmarkId) 
        ? prev.filter(id => id !== landmarkId)
        : [...prev, landmarkId]
    )
  }

  const shareLocation = (landmark) => {
    if (navigator.share) {
      navigator.share({
        title: landmark.name,
        text: landmark.shortDescription,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${landmark.name}: ${landmark.shortDescription}`)
      alert('تم نسخ الرابط!')
    }
  }

  const handleServiceClick = (service) => {
    setSelectedService(service)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-600 to-yellow-500">
        <div className="text-center">
          <div className="loading-spinner w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white font-arabic">جاري تحميل بوابة السياحة...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-arabic fade-in-up">
            <span className="gradient-text">بوابة السياحة</span>
            <br />
            في القليوبية
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto slide-in-right">
            اكتشف كنوز التاريخ والحضارة في محافظة القليوبية - من القصور التاريخية إلى الحدائق الخلابة
          </p>
          <div className="flex justify-center scale-in">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full pulse-glow">
              <MapPin className="ml-2 h-5 w-5" />
              استكشف الآن
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-arabic text-gray-800">تصنيفات المعالم</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {landmarkCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter px-6 py-3 rounded-full font-semibold ${
                  selectedCategory === category 
                    ? 'active bg-yellow-500 text-black hover:bg-yellow-600' 
                    : 'hover:border-yellow-500 hover:text-yellow-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Landmarks Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">
              {selectedCategory === 'الكل' ? 'جميع المعالم' : `المعالم ${selectedCategory}`}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredLandmarks.length} معلم متاح
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredLandmarks.map((landmark, index) => (
              <Card key={index} className="card-hover overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={landmark.image || '/api/placeholder/300/200'}
                    alt={landmark.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/200'
                    }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-yellow-500 text-black font-semibold">
                      {landmark.category || landmark.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(index)
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${favorites.includes(index) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        shareLocation(landmark)
                      }}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-arabic text-gray-800 group-hover:text-yellow-600 transition-colors">
                    {landmark.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {landmark.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                      onClick={() => setSelectedLandmark(landmark)}
                    >
                      <Camera className="ml-2 h-4 w-4" />
                      اقرأ المزيد
                    </Button>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="mr-1 text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Services Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">الخدمات السياحية</h2>
            <p className="text-gray-600 text-lg">كل ما تحتاجه لرحلة مريحة وممتعة</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="services-swiper"
          >
            {serviceCategories.map((serviceCategory, index) => {
              const categoryServices = services.filter(service => 
                service.type === serviceCategory.name
              )
              
              return (
                <SwiperSlide key={index}>
                  <div className="service-card p-6 rounded-2xl h-full">
                    <div className={`${serviceCategory.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                      {serviceCategory.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4 font-arabic text-gray-800">
                      {serviceCategory.name}
                    </h3>
                    <div className="space-y-3">
                      {categoryServices.slice(0, 3).map((service, serviceIndex) => (
                        <div 
                          key={serviceIndex} 
                          className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleServiceClick(service)}
                        >
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{service.name}</h4>
                          <p className="text-gray-600 text-xs line-clamp-2">{service.shortDescription}</p>
                        </div>
                      ))}
                      {categoryServices.length > 3 && (
                        <div className="text-center">
                          <Button variant="outline" size="sm" className="text-xs">
                            عرض المزيد ({categoryServices.length - 3})
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="floating-animation">
              <h3 className="text-4xl font-bold text-yellow-500 mb-2">{landmarksData.length}+</h3>
              <p className="text-gray-300">معلم سياحي</p>
            </div>
            <div className="floating-animation" style={{ animationDelay: '1s' }}>
              <h3 className="text-4xl font-bold text-yellow-500 mb-2">4</h3>
              <p className="text-gray-300">تصنيفات متنوعة</p>
            </div>
            <div className="floating-animation" style={{ animationDelay: '2s' }}>
              <h3 className="text-4xl font-bold text-yellow-500 mb-2">5</h3>
              <p className="text-gray-300">خدمات سياحية</p>
            </div>
            <div className="floating-animation" style={{ animationDelay: '3s' }}>
              <h3 className="text-4xl font-bold text-yellow-500 mb-2">24/7</h3>
              <p className="text-gray-300">دعم متواصل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-arabic text-yellow-500">بوابة السياحة في القليوبية</h3>
              <p className="text-gray-300 mb-4">
                اكتشف جمال وتاريخ محافظة القليوبية من خلال دليلك الشامل للمعالم السياحية والخدمات.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-400">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-400">
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-arabic">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-500 transition-colors">المعالم التراثية</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">المعالم الثقافية</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">الأماكن الترفيهية</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">الخدمات السياحية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-arabic">معلومات الاتصال</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 ml-2 text-yellow-500" />
                  محافظة القليوبية، مصر
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 ml-2 text-yellow-500" />
                  +20 123 456 7890
                </p>
                <p className="flex items-center">
                  <Globe className="h-4 w-4 ml-2 text-yellow-500" />
                  info@qalyubia-tourism.gov.eg
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 بوابة السياحة في القليوبية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Landmark Detail Modal */}
      {selectedLandmark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay">
          <div className="modal-content bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedLandmark.image || '/api/placeholder/800/400'}
                alt={selectedLandmark.name}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = '/api/placeholder/800/400'
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2"
                onClick={() => setSelectedLandmark(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <Badge className="absolute top-4 right-4 bg-yellow-500 text-black font-semibold">
                {selectedLandmark.category || selectedLandmark.type}
              </Badge>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">
                {selectedLandmark.name}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedLandmark.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(landmarksData.indexOf(selectedLandmark))}
                    className="flex items-center gap-2"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(landmarksData.indexOf(selectedLandmark)) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    {favorites.includes(landmarksData.indexOf(selectedLandmark)) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareLocation(selectedLandmark)}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    مشاركة
                  </Button>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="mr-2 font-semibold">4.8 (127 تقييم)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay">
          <div className="modal-content bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedService.image || '/api/placeholder/600/300'}
                alt={selectedService.name}
                className="w-full h-48 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = '/api/placeholder/600/300'
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2"
                onClick={() => setSelectedService(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <Badge className="absolute top-4 right-4 bg-yellow-500 text-black font-semibold">
                {selectedService.type}
              </Badge>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 font-arabic text-gray-800">
                {selectedService.name}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedService.longDescription || selectedService.shortDescription}
              </p>
              {selectedService.address && (
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin className="h-4 w-4 ml-2 text-yellow-500" />
                  <span>{selectedService.address}</span>
                </div>
              )}
              {selectedService.phone && (
                <div className="flex items-center mb-4 text-gray-600">
                  <Phone className="h-4 w-4 ml-2 text-yellow-500" />
                  <span>{selectedService.phone}</span>
                </div>
              )}
              {selectedService.hours && (
                <div className="flex items-center mb-6 text-gray-600">
                  <Clock className="h-4 w-4 ml-2 text-yellow-500" />
                  <span>{selectedService.hours}</span>
                </div>
              )}
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="mr-2 font-semibold">4.5 (89 تقييم)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

