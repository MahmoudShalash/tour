import json
import os
import shutil

json_file_path = 'src/assets/qalyubia_landmarks_data.json'
public_images_dir = 'public/images'
search_images_dir = '/home/ubuntu/upload/search_images'

# Load existing landmark data
with open(json_file_path, 'r', encoding='utf-8') as f:
    landmarks_data = json.load(f)

updated_landmarks_data = []

# Get a list of all downloaded images
if os.path.exists(search_images_dir):
    downloaded_images = os.listdir(search_images_dir)
else:
    downloaded_images = []

# Iterate through landmarks and update image paths if a new image was downloaded
for landmark in landmarks_data:
    original_image_path = landmark.get('image')
    if original_image_path:
        original_image_filename = os.path.basename(original_image_path)
        
        # Check if a new image was downloaded for this landmark
        found_new_image = False
        for downloaded_img_name in downloaded_images:
            # Simple heuristic: check if landmark name is part of the downloaded image name (case-insensitive)
            # This is a very basic check and might need refinement for better accuracy
            if landmark['name'].replace(' ', '_').lower() in downloaded_img_name.lower():
                new_image_src_path = os.path.join(search_images_dir, downloaded_img_name)
                new_image_dest_path = os.path.join(public_images_dir, downloaded_img_name)
                
                # Move the new image to the public/images directory
                if not os.path.exists(new_image_dest_path):
                    shutil.copy(new_image_src_path, new_image_dest_path)
                    print(f"Copied {downloaded_img_name} to {public_images_dir}")
                
                # Update the image path in the JSON data
                landmark['image'] = f'/images/{downloaded_img_name}'
                found_new_image = True
                break
        
        # If no new image was found, ensure the existing image path is valid
        if not found_new_image:
            current_image_full_path = os.path.join('public', original_image_path.lstrip('/'))
            if not os.path.exists(current_image_full_path):
                print(f"Warning: Image {original_image_path} for {landmark['name']} is still missing after search. This landmark will be removed.")
                continue # Skip adding this landmark to updated_landmarks_data
    
    updated_landmarks_data.append(landmark)

# Write the updated data back to the JSON file
with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(updated_landmarks_data, f, indent=2, ensure_ascii=False)

print("Image paths updated and new images moved. Landmarks with persistently missing images have been removed.")


