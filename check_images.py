import json
import os

json_file_path = 'src/assets/qalyubia_landmarks_data.json'
images_dir = 'public/images'

missing_images = []

with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    image_filename = os.path.basename(item.get('image', ''))
    if image_filename:
        full_image_path = os.path.join(images_dir, image_filename)
        if not os.path.exists(full_image_path):
            missing_images.append(image_filename)

if missing_images:
    print(f"Missing images: {missing_images}")
else:
    print("No missing images.")


