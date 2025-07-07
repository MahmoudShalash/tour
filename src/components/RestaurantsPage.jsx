import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ArrowRight, MapPin, Phone, Star, Utensils, Coffee, ChefHat } from 'lucide-react';
import restaurantsData from '../assets/restaurants_data.json';

function RestaurantsPage() {
  const navigate = useNavigate();

  const getCuisineIcon = (cuisine) => {
    if (cuisine.includes('مقهى') || cuisine.includes('قهوة')) return <Coffee className="h-4 w-4" />;
    if (cuisine.includes('إيطالي')) return <ChefHat className="h-4 w-4" />;
    return <Utensils className="h-4 w-4" />;
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
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-arabic">مطاعم ومقاهي محافظة القليوبية</h1>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantsData.map((restaurant, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={restaurant.image || '/api/placeholder/400/200'}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/200';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold bg-white ${getPriceColor(restaurant.price_range)}`}>
                    {restaurant.price_range}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    {getCuisineIcon(restaurant.cuisine)}
                    <span className="text-xs font-medium text-gray-700">{restaurant.cuisine}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-arabic">
                  {restaurant.name}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(restaurant.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 mr-2">{restaurant.rating}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{restaurant.address}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <p className="text-gray-600 text-sm">{restaurant.phone}</p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {restaurant.description}
                </p>
                
                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">التخصصات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
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

export default RestaurantsPage;

