import os
import xml.etree.ElementTree as ET

directory = r"C:\Users\admin\.gemini\antigravity\scratch\chandra-visuals-logo"

files_to_check = [
    "chandra_visuals_logo_emblem.svg",
    "chandra_visuals_logo_stacked.svg",
    "chandra_visuals_logo_horizontal.svg",
    "chandra_visuals_logo_instagram.svg",
    "chandra_visuals_logo_watermark.svg",
    "chandra_visuals_logo_emblem_vector.svg",
    "chandra_visuals_logo_stacked_vector.svg",
    "chandra_visuals_logo_horizontal_vector.svg",
    "chandra_visuals_logo_instagram_vector.svg",
    "chandra_visuals_logo_watermark_vector.svg",
    "logo_showcase.html"
]

print("Starting verification of Chandra Visuals Logo Package...\n")

all_ok = True

for file_name in files_to_check:
    file_path = os.path.join(directory, file_name)
    if not os.path.exists(file_path):
        print(f"[FAIL] Missing file: {file_name}")
        all_ok = False
        continue
    
    size = os.path.getsize(file_path)
    print(f"[PASS] File exists: {file_name} ({size} bytes)")
    
    # If it is an SVG, validate XML and content
    if file_name.endswith(".svg"):
        try:
            tree = ET.parse(file_path)
            root = tree.getroot()
            print(f"  - Valid XML structure")
            
            # Check for namespace
            ns = {"svg": "http://www.w3.org/2000/svg"}
            
            # Check for correct paths
            paths = root.findall(".//svg:path", ns)
            if not paths:
                # fallback for missing default namespace handling in simple search
                paths = root.findall(".//{http://www.w3.org/2000/svg}path")
                
            path_contents = [p.attrib.get("d", "") for p in paths]
            
            if "watermark" in file_name:
                expected_paths = [
                    "M 87.6 38.2 A 33.6 33.6 0 1 0 132.4 38.2 A 28 28 0 1 1 87.6 38.2 Z",
                    "M 132.4 38.2 A 33.6 33.6 0 0 1 143.6 62"
                ]
            else:
                expected_paths = [
                    "M 78 76 A 48 48 0 1 0 142 76 A 40 40 0 1 1 78 76 Z",
                    "M 142 76 A 48 48 0 0 1 158 112"
                ]
            
            for expected in expected_paths:
                found = any(expected in p.replace("\n", " ").replace("  ", " ").strip() for p in path_contents)
                if found:
                    print(f"  - Found expected path: '{expected[:30]}...'")
                else:
                    print(f"  - [WARN] Could not find path: '{expected}'")
                    all_ok = False
        except Exception as e:
            print(f"  - [FAIL] XML validation error: {e}")
            all_ok = False

print("\nVerification complete.")
if all_ok:
    print("[SUCCESS] All files are present and mathematically correct!")
else:
    print("[FAIL] Verification issues were found.")
