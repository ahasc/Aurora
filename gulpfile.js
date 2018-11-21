const gulp = require("gulp");
const ts = require("gulp-typescript");
const concat = require('gulp-concat');

gulp.task("default", ["compile-ts", "generate-dts"]);

gulp.task("compile-ts", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("lib"));

});

gulp.task("generate-dts", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return tsProject.src()
    .pipe(tsProject())
    .dts
    .pipe(concat("index.d.ts"))
    .pipe(gulp.dest("lib"));
});
