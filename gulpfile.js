const gulp = require("gulp");
const ts = require("gulp-typescript");
const concat = require('gulp-concat');
const minify = require("gulp-uglify");
var sourcemaps = require('gulp-sourcemaps');

const OUT_DIR = "build/";

gulp.task("default", ["compile-ts", "generate-dts"]);

gulp.task('watch', ["default"], () => {
  return gulp.watch("./src/**/*.ts", ["default"]);
});

gulp.task("compile-ts", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write('.', { sourceRoot: "../src" }))
    //.pipe(concat("index.min.js"))
    //.pipe(minify())
    .pipe(gulp.dest(OUT_DIR));
});

gulp.task("generate-dts", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src()
    .pipe(tsProject())
    .dts
    .pipe(concat("index.d.ts"))
    .pipe(gulp.dest(OUT_DIR));
});
