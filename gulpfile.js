const gulp = require("gulp"),
	connect = require("gulp-connect"),
	sass = require("gulp-sass");
//启动服务器
gulp.task("connect", function(){
	connect.server({
		root:"dist", //webserver 的根目录
		livereload:true //浏览器自动刷新用到的东西
	});
});

//复制 HTML 文件到 dist 目录下,让HTML页面修改后能够重新加载
gulp.task("html", function(){
	gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
});

//复制 js 文件到 dist 目录下，让js修改后能够重新加载
gulp.task("js", function(){
	gulp.src("src/js/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

//复制 lib 目录到 dist 下
gulp.task("copy-lib", function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});

//复制图片到 dist 下
gulp.task("copy-images", function(){
	gulp.src("src/images/**/*.*")
		.pipe(gulp.dest("dist/images"));
});

//复制假数据到 dist 下
gulp.task("copy-mock", function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});

gulp.task("copy", ["copy-lib", "copy-images", "copy-mock"]);

//编译 *.scss 文件为 *.css 文件
gulp.task("sass", function(){
	gulp.src("src/sass/*.scss")
	.pipe(sass({outputStyle:"expanded"}))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
});

//监视文件的修改
gulp.task("watch", function(){
	gulp.watch("src/sass/*.scss", ["sass"]);
	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch("src/js/**/*.js", ["js"]);
});

//定制默认 （缺省） 任务
gulp.task("default", ["html", "js", "sass", "copy", "connect", "watch"]);