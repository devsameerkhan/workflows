var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV|| 'production';

if (env==='development'){
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else{
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest(outputDir +'js'))
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir +'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    
    .pipe(gulp.dest(outputDir+'css'))
});

gulp.task('watch',function () {
  gulp.watch(coffeeSources,['coffee'])
  gulp.watch(jsSources,['js'])
  gulp.watch('components/sass/*.scss',['compass'])

});

gulp.task('default', ['coffee', 'js', 'compass','watch']);
