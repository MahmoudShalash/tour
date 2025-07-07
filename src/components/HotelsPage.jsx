import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ArrowRight, MapPin, Phone, Star, Wifi, Car, Coffee, Utensils, Dumbbell } from 'lucide-react';
import hotelsData from '../assets/hotels_data.json';

function HotelsPage() {
  const navigate = useNavigate();

  const getAmenityIcon = (amenity) => {
    if (amenity.includes('مطعم') || amenity.includes('مطاعم')) return <Utensils className="h-4 w-4" />;
    if (amenity.includes('جيم')) return <Dumbbell className="h-4 w-4" />;
    if (amenity.includes('موقف') || amenity.includes('سيارات')) return <Car className="h-4 w-4" />;
    if (amenity.includes('كافيه') || amenity.includes('قهوة')) return <Coffee className="h-4 w-4" />;
    return <Wifi className="h-4 w-4" />;
  };

  const getPriceColor = (priceRange) => {
    switch (priceRange) {
      case 'اقتصادي': return 'text-green-600';
      case 'متوسط': return 'text-yellow-600';
      case 'مرتفع': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-arabic">فنادق محافظة القليوبية</h1>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsData.map((hotel, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={hotel.image || '/api/placeholder/400/200'}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/200';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold bg-white ${getPriceColor(hotel.price_range)}`}>
                    {hotel.price_range}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-arabic">
                  {hotel.name}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(hotel.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 mr-2">{hotel.rating}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{hotel.address}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <p className="text-gray-600 text-sm">{hotel.phone}</p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {hotel.description}
                </p>
                
                {/* Amenities */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">المرافق المتاحة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                        {getAmenityIcon(amenity)}
                        <span className="text-xs text-blue-700">{amenity}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{hotel.amenities.length - 4} المزيد
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;

