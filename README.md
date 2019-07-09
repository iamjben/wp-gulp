## WP Gulp
A basic gulp.js + wordpress workflow

#### WP Gulp uses the following tasks:
##### STYLES
- SASS to CSS conversion
- Concatenation
- Compression
- Error handling
- Separating of vendor and custom SASS/CSS files
- Sourcemaps(disabled by default)

##### SCRIPTS
- Concatenation
- Compression
- Error handling
- Separating of vendor and custom JS files
- Sourcemaps(disabled by default)

##### IMAGES
- Optimization of images
- File types: .png, .jpg, .jpeg, .gif, .svg

##### WATCHING
- Changes in files to recompile
- File types: .css, .html, .php, .js

### How to use?
#### To install
- add **gulpfile.js** and **package.json** in your root folder
- run **npm install**

#### WP Gulp uses 2 types of tasks:
- Theme task - run **gulp theme**
- Admin task - run **gulp admin**

#### Sourcemaps are enabled by default
To enable it, uncomment the following codes:
- .pipe(sourcemaps.init())
- .pipe(sourcemaps.write(''))
