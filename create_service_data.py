import json

# Service data for Qalyubia Governorate
services_data = {
    "hotels": [
        {
            "name": "فندق ومنتجع ايفان",
            "address": "ك 5، طريق بنها الزقازيق، تقاطع الطريق الدائرى الاقليمى، بنها",
            "phone": "0133262069",
            "rating": 4.2,
            "price_range": "متوسط",
            "amenities": ["حمامات سباحة", "مطاعم", "جيم", "ملاعب تنس", "ملاعب كرة قدم", "مناطق للأطفال"],
            "description": "منتجع متكامل يوفر تجربة إقامة مميزة مع مرافق ترفيهية متنوعة",
            "image": "/images/hotels/ivan_resort.jpg"
        },
        {
            "name": "فندق كلوب هاوس",
            "address": "بنها الجديدة، القليوبية",
            "phone": "0133260831",
            "rating": 3.8,
            "price_range": "اقتصادي",
            "amenities": ["مطعم", "خدمة الغرف", "موقف سيارات"],
            "description": "فندق اقتصادي يوفر إقامة مريحة في قلب بنها",
            "image": "/images/hotels/club_house.jpg"
        },
        {
            "name": "فندق النيل فيو",
            "address": "كورنيش النيل، بنها",
            "phone": "0133265432",
            "rating": 4.0,
            "price_range": "متوسط",
            "amenities": ["إطلالة على النيل", "مطعم", "كافيه", "خدمة الغرف"],
            "description": "فندق بإطلالة رائعة على نهر النيل",
            "image": "/images/hotels/nile_view.jpg"
        }
    ],
    "restaurants": [
        {
            "name": "مطعم الملك فاروق",
            "address": "شارع سعد زغلول، بنها",
            "phone": "0133261234",
            "cuisine": "مصري تقليدي",
            "rating": 4.5,
            "price_range": "متوسط",
            "specialties": ["الكباب", "الكفتة", "المشويات"],
            "description": "مطعم تراثي يقدم أشهى الأكلات المصرية الأصيلة",
            "image": "/images/restaurants/king_farouk.jpg"
        },
        {
            "name": "L'angoletto",
            "address": "بنها الجديدة، القليوبية",
            "phone": "0133267890",
            "cuisine": "إيطالي",
            "rating": 4.3,
            "price_range": "مرتفع",
            "specialties": ["البيتزا", "الباستا", "الريزوتو"],
            "description": "مطعم إيطالي أصيل يقدم أطباق البحر المتوسط",
            "image": "/images/restaurants/langoletto.jpg"
        },
        {
            "name": "مطعم كفتجي",
            "address": "شارع الجلاء، بنها",
            "phone": "0133264567",
            "cuisine": "مشويات",
            "rating": 4.4,
            "price_range": "متوسط",
            "specialties": ["الكفتة", "الحواوشي", "الشيش طاووق"],
            "description": "متخصص في المشويات والكفتة الطازجة",
            "image": "/images/restaurants/koftegy.jpg"
        },
        {
            "name": "كافيه سو فريش",
            "address": "بنها الجديدة، القليوبية",
            "phone": "0133268901",
            "cuisine": "مقهى",
            "rating": 4.1,
            "price_range": "اقتصادي",
            "specialties": ["القهوة المختصة", "العصائر الطبيعية", "الحلويات"],
            "description": "مقهى عصري يقدم أجود أنواع القهوة والمشروبات",
            "image": "/images/restaurants/so_fresh.jpg"
        },
        {
            "name": "Sky Food Court",
            "address": "النادي الرياضي، بنها",
            "phone": "0133269012",
            "cuisine": "متنوع",
            "rating": 4.0,
            "price_range": "متوسط",
            "specialties": ["الوجبات السريعة", "المأكولات الآسيوية", "البرجر"],
            "description": "فود كورت متنوع يضم عدة مطاعم تحت سقف واحد",
            "image": "/images/restaurants/sky_food_court.jpg"
        }
    ],
    "banks": [
        {
            "name": "البنك الأهلي المصري",
            "address": "78 شارع كورنيش النيل، بنها الجديدة",
            "phone": "19623",
            "services": ["حسابات توفير", "قروض", "تحويلات", "ماكينات صراف"],
            "working_hours": "الأحد - الخميس: 8:30 ص - 2:30 م",
            "atm_locations": ["كورنيش النيل", "شارع فريد ندا", "ميدان سعد زغلول"],
            "description": "أكبر البنوك المصرية مع شبكة واسعة من الفروع والخدمات",
            "image": "/images/banks/nbe.jpg"
        },
        {
            "name": "بنك مصر",
            "address": "شارع سعد زغلول، بنها",
            "phone": "19888",
            "services": ["حسابات جارية", "ودائع", "بطاقات ائتمان", "خدمات إلكترونية"],
            "working_hours": "الأحد - الخميس: 8:30 ص - 2:30 م",
            "atm_locations": ["شارع سعد زغلول", "ميدان المحطة", "بنها الجديدة"],
            "description": "بنك عريق يقدم خدمات مصرفية شاملة للأفراد والشركات",
            "image": "/images/banks/banque_misr.jpg"
        },
        {
            "name": "بنك القاهرة",
            "address": "شارع الجلاء، بنها",
            "phone": "16141",
            "services": ["حسابات شخصية", "قروض عقارية", "تمويل السيارات"],
            "working_hours": "الأحد - الخميس: 8:30 ص - 2:30 م",
            "atm_locations": ["شارع الجلاء", "بنها الجديدة"],
            "description": "بنك متخصص في التمويل الشخصي والعقاري",
            "image": "/images/banks/cairo_bank.jpg"
        },
        {
            "name": "بنك CIB",
            "address": "نيل فيو مول، شارع كمال الدين حسين، بنها",
            "phone": "19666",
            "services": ["الخدمات المصرفية الرقمية", "بطاقات ائتمان", "استثمار"],
            "working_hours": "الأحد - الخميس: 9:00 ص - 3:00 م",
            "atm_locations": ["نيل فيو مول", "أب تاون كلوب هاوس"],
            "description": "بنك حديث يركز على الخدمات المصرفية الرقمية",
            "image": "/images/banks/cib.jpg"
        }
    ],
    "transportation": [
        {
            "name": "محطة سكة حديد بنها",
            "address": "ميدان المحطة، بنها",
            "phone": "0133260123",
            "type": "قطارات",
            "routes": ["القاهرة - بنها", "بنها - المنصورة", "بنها - الزقازيق"],
            "schedule": "يومياً من 5:00 ص حتى 11:00 م",
            "ticket_prices": "5-25 جنيه حسب الوجهة",
            "description": "محطة رئيسية تربط بنها بالمحافظات المجاورة",
            "image": "/images/transportation/train_station.jpg"
        },
        {
            "name": "موقف أتوبيسات بنها",
            "address": "شارع سعد زغلول، بنها",
            "phone": "0133261456",
            "type": "أتوبيسات",
            "routes": ["بنها - القاهرة", "بنها - الإسكندرية", "بنها - طنطا"],
            "schedule": "يومياً من 5:30 ص حتى 10:30 م",
            "ticket_prices": "10-40 جنيه حسب الوجهة",
            "description": "موقف رئيسي للأتوبيسات المتجهة لجميع المحافظات",
            "image": "/images/transportation/bus_station.jpg"
        },
        {
            "name": "خدمة التاكسي",
            "address": "متوفرة في جميع أنحاء المحافظة",
            "phone": "متنوع",
            "type": "تاكسي",
            "routes": ["داخل المحافظة", "بين المدن"],
            "schedule": "24 ساعة",
            "ticket_prices": "حسب المسافة والتعريفة المحددة",
            "description": "خدمة تاكسي متاحة في جميع أنحاء المحافظة",
            "image": "/images/transportation/taxi.jpg"
        },
        {
            "name": "الميكروباص",
            "address": "خطوط متعددة داخل المحافظة",
            "phone": "متنوع",
            "type": "ميكروباص",
            "routes": ["بنها - شبين القناطر", "بنها - قليوب", "بنها - الخانكة"],
            "schedule": "يومياً من 6:00 ص حتى 10:00 م",
            "ticket_prices": "3-8 جنيه حسب المسافة",
            "description": "وسيلة نقل شعبية سريعة ومريحة",
            "image": "/images/transportation/microbus.jpg"
        }
    ]
}

# Save the data to JSON files
with open('src/assets/hotels_data.json', 'w', encoding='utf-8') as f:
    json.dump(services_data["hotels"], f, indent=2, ensure_ascii=False)

with open('src/assets/restaurants_data.json', 'w', encoding='utf-8') as f:
    json.dump(services_data["restaurants"], f, indent=2, ensure_ascii=False)

with open('src/assets/banks_data.json', 'w', encoding='utf-8') as f:
    json.dump(services_data["banks"], f, indent=2, ensure_ascii=False)

with open('src/assets/transportation_data.json', 'w', encoding='utf-8') as f:
    json.dump(services_data["transportation"], f, indent=2, ensure_ascii=False)

print("Service data files created successfully!")

