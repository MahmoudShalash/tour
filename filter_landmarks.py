import json
import os

json_file_path = 'src/assets/qalyubia_landmarks_data.json'
images_dir = 'public/images'

# List of missing images identified in the previous step
missing_images_list = [
    'youth_center_qaliub.jpg',
    'culture_house_toukh.jpg',
    'art_creativity_center.jpg',
    'memorial_garden_benha.jpg',
    'fakhoura_garden.jpg',
    'hope_garden.jpg',
    'jasmine_garden.jpg',
    'model_garden.jpg',
    'children_garden_shobra.jpg',
    'youth_garden_qaliub.jpg',
    'tel_el_yahudiya.jpg',
    'greek_roman_baths.jpg',
    'ibrahim_abu_ola_shrine.jpg',
    'shawarbi_shrine.jpg',
    'ashraf_cemetery.jpg',
    'old_city_wall.jpg',
    'pharaonic_temple.jpg',
    'historic_gate.jpg',
    'pharaonic_inscriptions.jpg',
    'benha_city_mall.jpg',
    'mecca_market.jpg',
    'friday_market_benha.jpg',
    'popular_shopping_center.jpg',
    'central_vegetable_market.jpg',
    'commercial_complex.jpg',
    'furniture_market.jpg',
    'handicrafts_center.jpg',
    'popular_clothes_market.jpg',
    'benha_stadium.jpg',
    'benha_sports_club.jpg',
    'national_guard_fields.jpg',
    'sami_rashid_field.jpg',
    'youth_sports_center.jpg',
    'khanka_sports_field.jpg',
    'water_games_center.jpg',
    'wahdan_land.jpg',
    'waterfalls_area.jpg',
    'ahl_masr_walkway.jpg',
    'villas_corniche.jpg',
    'pedestrian_bridge.jpg',
    'fishing_area.jpg',
    'palm_forest.jpg',
    'benha_university.jpg',
    'agriculture_college.jpg',
    'technology_institute.jpg',
    'applied_arts_school.jpg',
    'azhar_institute.jpg',
    'nursing_school.jpg',
    'computer_institute.jpg',
    'vocational_training_center.jpg',
    'languages_institute.jpg',
    'historic_train_station.jpg',
    'historic_governorate_building.jpg',
    'small_opera_house.jpg',
    'telecommunications_tower.jpg',
    'heritage_textile_factory.jpg',
    'heritage_industries_center.jpg',
    'equestrian_center.jpg'
]

filtered_data = []

with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    image_filename = os.path.basename(item.get('image', ''))
    if image_filename not in missing_images_list:
        filtered_data.append(item)

with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(filtered_data, f, indent=2, ensure_ascii=False)

print("Landmarks with missing images have been removed from the JSON file.")


