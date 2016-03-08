import _ from 'lodash'
import glob from 'glob'

import gulp from 'gulp'
import babel from 'gulp-babel'
import cache from 'gulp-cached'
import changed from 'gulp-changed'
import gulpif from 'gulp-if'
import install from 'gulp-install'
import plumber from 'gulp-plumber'
import shell from 'gulp-shell'

const paths = {
  packages: 'packages/*',
  packageJSONs: ['package.json', 'packages/*/package.json'],
  scripts: _.flatten(_.map(glob.sync('packages/*'), (packageRoot) => {
    return [
      `${packageRoot}/src/**/*.js`,
      `${packageRoot}/src/**/*.jsx`,
    ]
  })),
  statics: _.map(glob.sync('packages/*'), (packageRoot) => {
    return `${packageRoot}/src/**/*.nunjucks`
  }),
}

const resolvePackageRoot = (file) => {
  // TODO find better way to output package root
  const pathParts = file.path.split('/')
  const packageRoot = _.join(_.take(pathParts, pathParts.lastIndexOf('packages') + 2), '/')
  return `${packageRoot}/lib`
}

const isJS = (file) => {
  return _.endsWith(file.path, '.js') || _.endsWith(file.path, '.jsx')
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

gulp.task('publish', ['build'], () => {
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
  return gulp.src([
    ...paths.scripts,
    ...paths.statics,
  ])
  .pipe(plumber({
    errorHandler(err) {
      console.error(err)
      this.emit('end')
    },
  }))
  .pipe(cache('build'))
  .pipe(changed(resolvePackageRoot))
  .pipe(gulpif(isJS, babel()))
  .pipe(gulp.dest(resolvePackageRoot))
})

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['build'])
})

gulp.task('default', ['watch'])
