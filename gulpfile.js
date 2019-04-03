var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var inlineCss = require('gulp-inline-css');

var src = './src';
var dist = './dist';

var options = {
  inlineCss : {
      applyStyleTags: false,
      removeStyleTags: false
  }
}

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: dist,
            index  : "index.html"
       }
    });
    gulp.watch(src+'/**/*.html', gulp.series('inlineCss','bs-reload'));
});

gulp.task('inlineCss', () => {
    return gulp.src(src + '/**/*.html')
    .pipe(inlineCss(options.inlineCss))
    .pipe(gulp.dest(dist))
});

gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', gulp.task('serve'));
