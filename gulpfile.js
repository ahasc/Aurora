const gulp = require("gulp");
const ts = require("gulp-typescript");
const concat = require('gulp-concat');
const minify = require("gulp-uglify");

const OUT_DIR = "build/";

gulp.task("default", ["compile-ts", "generate-dts"]);

gulp.task("compile-ts", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(concat("index.min.js"))
    .pipe(minify())
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
