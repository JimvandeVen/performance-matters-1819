const gulp = require("gulp");
const rev = require("gulp-rev");

const inputDir = "public/";
const manifestFilename = "rev-manifest.json";



gulp.src([
    inputDir + "**/*.{css,js}"
])
.pipe(rev())
.pipe(gulp.dest(inputDir))
.pipe(rev.manifest(manifestFilename))
.pipe(gulp.dest(inputDir));

// gulp.task('default', () =>
//     // By default, Gulp would pick `assets/css` as the base,
//     // so we need to set it explicitly:
//     gulp.src(['**/*.css', '**/*.js'], {base: 'assets'})
//         .pipe(gulp.dest('build/assets'))  // copy original assets to build dir
//         .pipe(rev())
//         .pipe(gulp.dest('build/assets'))  // write rev'd assets to build dir
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('build/assets'))  // write manifest to build dir
// );