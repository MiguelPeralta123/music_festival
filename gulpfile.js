// Gulp is used to automate tasks, sass is used to write better css and gulp-sass is used to connect gulp with sass

const { src, dest, watch } = require("gulp")
const sass = require('gulp-sass')(require('sass'))
// This dependency prevents the workflow from stopping when an error is found
const plumber = require('gulp-plumber')

// What´s inside .pipe() will execute after the previous pipe had finished executing
const css = (done) => {
    // There are three steps to compile a sass file as a css file
    src('src/scss/**/*.scss') // Identifying sass file
    .pipe(plumber()) // Using plumber
    .pipe(sass()) // Compiling it
    .pipe(dest('build/css')) // Storing it as css

    // Callback that indicates gulp that the execution has finished correctly
    done()
}

const dev = (done) => {
    // Imported from gulp, this watch function keeps listening to "src/scss/app.scss" waiting for changes to re-execute the css function.
    // **/* allows us to detect changes in any .scss file inside src/scss folders
    watch('src/scss/**/*.scss', css)
    done()
}

exports.dev = dev