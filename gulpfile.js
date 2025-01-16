const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const tsProject = ts.createProject('tsconfig.json');
const distFolder = 'dist';

// Build the source code
const buildSrc = () => {
  const tsResult = tsProject
    .src()
    .pipe(sourcemaps.init({ identityMap: true, loadMaps: true }))
    .pipe(tsProject())
    .on('error', () => {});

  return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(distFolder));
};

// Copy static assets from src
const buildCopy = () => {
  return gulp
    .src(path.join('src', `**/*.{json,html,csv,yaml,xml}`))
    .pipe(gulp.dest(`${distFolder}/`));
};

// Clean the build folder
const buildClean = async () => {
  const { deleteAsync } = await import('del'); // Dynamically import 'del'
  await deleteAsync([distFolder]);
};

// Trigger build tasks
const build = gulp.series(buildClean, gulp.parallel(buildSrc, buildCopy));
const buildServer = gulp.series(buildClean, gulp.parallel(buildSrc, buildCopy));

// Export tasks
module.exports = {
  buildSrc,
  buildCopy,
  buildClean,
  build,
  buildServer,
};
