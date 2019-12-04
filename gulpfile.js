const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const nodemon = require("gulp-nodemon");
const path = require('path');
const del = require('del');
const MAIN_FILE = 'app.js';
const SOURCES = ['src/**/*.js']
const DIST = './dist'
const MAIN_SCRIPT = path.join(DIST,MAIN_FILE);

// gulp babel pipeline to use 
gulp.task('build', () =>
	gulp.src(SOURCES)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(DIST))
);

// start the nodemon and trigger the gulp task build whenever a change in the sorce code   
gulp.task('watch', function(){
    var stream = nodemon({
        script: MAIN_SCRIPT,
        ignore: [
            DIST+'/',
            'node_modules/'
        ],
        tasks : ['clean','build']
    })
    return stream
        .on('start', function (){
            console.log('Server started!!!!');
        })
        .on('restart', function (){
            console.log('Server restarted!!!!');
        })
        .on('crash', function () {
            console.log('OMG, this guy crashed!!!!');
            stream.emit('restart', 5); // restart in the next 5 seconds
        })
        .on('exit', function() {
            console.log('Server terminated properly');
        });
});

// default task which starts first builds and then starts it
// gulp 4 supported syntax- gulp.series 
gulp.task('default',gulp.series('build','watch'));