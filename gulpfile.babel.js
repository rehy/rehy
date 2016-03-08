import _ from 'lodash'
import glob from 'glob'

import gulp from 'gulp'
import babel from 'gulp-babel'
import cache from 'gulp-cached'
import changed from 'gulp-changed'
import install from 'gulp-install'
import shell from 'gulp-shell'

const paths = {
  packages: 'packages/*',
  packageJSONs: ['package.json', 'packages/*/package.json'],
  scripts: _.map(glob.sync('packages/*'), (packageRoot) => {
    return `${packageRoot}/src/**/*.js`
  }),
}

const resolvePackageRoot = (file) => {
  // TODO find better way to output package root
  const pathParts = file.path.split('/')
  const packageRoot = _.join(_.take(pathParts, pathParts.lastIndexOf('packages') + 2), '/')
  return `${packageRoot}/lib`
}

gulp.task('install', () => {
  return gulp.src(_.tail(paths.packageJSONs))
    .pipe(install())
})

gulp.task('ncu', () => {
  return gulp.src(paths.packageJSONs, {read: false})
    .pipe(shell([
      'ncu -a --packageFile <%= file.path %>',
    ], {
      env: {
        FORCE_COLOR: '1',
      },
    }))
})

gulp.task('publish', () => {
  return gulp.src(paths.packages, {read: false})
    .pipe(shell([
      'cd <%= file.path %>; npm publish',
    ], {
      env: {
        FORCE_COLOR: '1',
      },
    }))
})

gulp.task('build', () => {
  return gulp.src(paths.scripts)
    .pipe(cache('build'))
    .pipe(changed(resolvePackageRoot))
    .pipe(babel())
    .pipe(gulp.dest(resolvePackageRoot))
})

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['build'])
})

gulp.task('default', ['watch'])
