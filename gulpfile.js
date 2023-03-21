// Gulp is used to automate tasks, sass is used to write better css and gulp-sass is used to connect gulp with sass
const { src, dest, watch, parallel } = require('gulp')

// CSS
const sass = require('gulp-sass')(require('sass'))
// This dependency prevents the workflow from stopping when an error is found
const plumber = require('gulp-plumber')

// IMAGES
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

// CREATING CSS FROM SCSS FILE

// What´s inside .pipe() will execute after the previous pipe had finished executing
const css = (done) => {
  // There are three steps to compile a sass file as a css file
  src('src/scss/**/*.scss') // Identifying sass file
    .pipe(plumber()) // Using plumber
    .pipe(sass()) // Compiling the sass file
    .pipe(dest('build/css')); // Storing the css

  // Callback that indicates gulp that the execution has finished correctly
  done()
}

// OPTIMIZE IMAGES

// Imagemin
function optimizeImg(done) {
  // Configuration object for imagemin function
  const options = {
    optimizationLvel: 3
  }
  src('src/img/**/*.{png,jpg}')
  .pipe(cache(imagemin(options)))
  .pipe(dest('build/img'))

  done()
}

function convertWebp(done) {
  // This is a configuration object for the webp function
  const options = {
    quality: 50
  }
  // To convert an image into a webp image file
  src('src/img/**/*.{png,jpg}') // Locate the images
    .pipe(webp(options)) // Using the webp function
    .pipe(dest('build/img')); // Storing the result images

  done()
}

function convertAvif(done) {
  const options = {
    quality: 50
  }
  src('src/img/**/*.{png,jpg}')
  .pipe(avif(options))
  .pipe(dest('build/img'))

  done()
}

const dev = (done) => {
  // Imported from gulp, this watch function keeps listening to "src/scss/app.scss" waiting for changes to re-execute the css function.
  // **/* allows us to detect changes in any .scss file inside src/scss folders
  watch('src/scss/**/*.scss', css)

  done()
};

exports.css = css
exports.optimizeImg = optimizeImg
exports.convertWebp = convertWebp
exports.convertAvif = convertAvif
// Parallel executes several functions making just one call
exports.dev = parallel(optimizeImg, convertWebp, convertAvif, dev)
