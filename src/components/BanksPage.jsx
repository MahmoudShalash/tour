import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ArrowRight, MapPin, Phone, Clock, CreditCard, Banknote, Building2 } from 'lucide-react';
import banksData from '../assets/banks_data.json';

function BanksPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-arabic">بنوك وماكينات ATM - محافظة القليوبية</h1>
          </div>
        </div>
      </div>

      {/* Banks Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banksData.map((bank, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={bank.image || '/api/placeholder/400/200'}
                  alt={bank.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/200';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-arabic">
                  {bank.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{bank.address}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <p className="text-gray-600 text-sm">{bank.phone}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <p className="text-gray-600 text-sm">{bank.working_hours}</p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {bank.description}
                </p>
                
                {/* Services */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">الخدمات المتاحة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bank.services.map((service, i) => (
                      <div key={i} className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                        <CreditCard className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* ATM Locations */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">مواقع ماكينات الصراف:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bank.atm_locations.map((location, i) => (
                      <div key={i} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                        <Banknote className="h-3 w-3 text-blue-600" />
                        <span className="text-xs text-blue-700">{location}</span>
                      </div>
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

export default BanksPage;

