```
# This command will:
# - create a new folder called ../web-images
# - resize all images to a max width of 1200px (maintaining aspect ratio)
# - set JPEG quality to 85 (great for web)
# - convert them to JPG format
# - process all files ending in .png
mogrify -path ../web-images -resize 1200x -quality 85 -format jpg *.png
```