cd ..
rm -force -confirm:$false -recurse _site
mkdir _site

# clone remote repo to "_site"
git clone --depth 1 https://github.com/GradyHooker/esportskingdom.git --branch gh-pages _site

# back up the old medium and tiny images
mkdir bak_files
cp -r _site/assets/logos/medium bak_files
rm -force -confirm:$false -recurse _site/assets/logos/medium
cp -r _site/assets/logos/tiny bak_files
rm -force -confirm:$false -recurse _site/assets/logos/tiny

# build with Jekyll into "_site"
$Env:JEKYLL_ENV = "production"
bundle exec jekyll build JEKYLL_ENV=production
$Env:JEKYLL_ENV = "development"

# copy cname file
cp CNAME _site

# create new images
mkdir _site/assets/logos/medium
mkdir _site/assets/logos/tiny
cd _site/assets/logos/original
mogrify -path ../medium -resize 80x80 -format png *.png
mogrify -path ../tiny -resize 24x24 -format png *.png
cd ../../../../

# copy back in any old ones we had
cp -r bak_files/medium _site/assets/logos
cp -r bak_files/tiny _site/assets/logos
rm -force -confirm:$false -recurse bak_files

# push
cd _site
git config user.name "Grady Bot"
git add --all
git commit -a -m "Grady Build"
git push --force origin gh-pages