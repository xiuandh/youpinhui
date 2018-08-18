//引入
let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let babel = require('gulp-babel');
var browserSync = require('browser-sync');
let pump = require('pump');

//创建合并压缩js任务
// gulp.task('compressJs',()=>{
// 	pump([
// 		gulp.src('./src/js/*.js'),
// 		//合并文件
// 		concat('all.js',{newLine: ';'}),

// 		//js的es5、es6的转换
// 		babel({
// 			presets: ['env'],
// 		}),
		
// 		gulp.dest('./dlist'),
// 		//压缩文件
// 		urlify(),
// 		//给文件重新命名
// 		rename({
// 			suffix: '.min'
// 		}),
// 		gulp.dest('./dlist'),
// 	])
// })

// 创建scss->css的任务
gulp.task('index',function(){
	gulp.src(['./src/sass/*.scss'])
	.pipe(sass({outputStyle:'compact'}).on('error',sass.logError))
	.pipe(gulp.dest('./src/css/'))
})
//实时监测sass的改动
gulp.task('autoSass',function(){
	// 监听文件修改，如果有修改，则执行index任务
	gulp.watch('./src/sass/*.scss',['index']);
});

//浏览器同步测试
gulp.task('server',function(){
	browserSync({
		port:1120,
		proxy:'http://localhost:18041',
		files:['./src/**/*.html','./src/css/*.css']
	});
	gulp.watch('./src/sass/*.scss',['index']);
});