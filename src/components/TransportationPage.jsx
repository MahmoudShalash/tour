import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ArrowRight, MapPin, Phone, Clock, Train, Bus, Car, Navigation } from 'lucide-react';
import transportationData from '../assets/transportation_data.json';

function TransportationPage() {
  const navigate = useNavigate();

  const getTransportIcon = (type) => {
    switch (type) {
      case 'قطارات': return <Train className="h-5 w-5 text-blue-600" />;
      case 'أتوبيسات': return <Bus className="h-5 w-5 text-green-600" />;
      case 'تاكسي': return <Car className="h-5 w-5 text-yellow-600" />;
      case 'ميكروباص': return <Navigation className="h-5 w-5 text-purple-600" />;
      default: return <Bus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'قطارات': return 'bg-blue-50 text-blue-700';
      case 'أتوبيسات': return 'bg-green-50 text-green-700';
      case 'تاكسي': return 'bg-yellow-50 text-yellow-700';
      case 'ميكروباص': return 'bg-purple-50 text-purple-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-arabic">وسائل النقل - محافظة القليوبية</h1>
          </div>
        </div>
      </div>

      {/* Transportation Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transportationData.map((transport, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={transport.image || '/api/placeholder/400/200'}
                  alt={transport.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/200';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 p-2 rounded-full">
                    {getTransportIcon(transport.type)}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getTypeColor(transport.type)}`}>
                    {transport.type}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-arabic">
                  {transport.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{transport.address}</p>
                </div>
                
                {transport.phone !== 'متنوع' && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <p className="text-gray-600 text-sm">{transport.phone}</p>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <p className="text-gray-600 text-sm">{transport.schedule}</p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {transport.description}
                </p>
                
                {/* Routes */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">الخطوط المتاحة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {transport.routes.map((route, i) => (
                      <span key={i} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Ticket Prices */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">أسعار التذاكر:</h4>
                  <p className="text-gray-600 text-sm">{transport.ticket_prices}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransportationPage;

