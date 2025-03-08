const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean_css = require('gulp-clean-css');
const html_min = require('gulp-htmlmin');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

async function load_imagemin() {
    const image_min = await import('gulp-imagemin');
    return image_min.default;
}

function css() {
    return src('src/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                console.error('Erro no CSS:', err.message);
                this.emit('end');
            }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(clean_css())
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'))
        .pipe(connect.reload())
        .on('end', () => console.log('CSS compilado e minificado!'));
}

function html() {
    return src('src/*.html')
        .pipe(plumber({
            errorHandler: function(err) {
                console.error('Erro no HTML:', err.message);
                this.emit('end');
            }
        }))
        .pipe(html_min({ collapseWhitespace: true }))
        .pipe(dest('./'))
        .pipe(connect.reload())
        .on('end', () => console.log('HTML minificado com sucesso!'));
}

function js() {
    return src('src/js/*.js')
        .pipe(plumber({
            errorHandler: function(err) {
                console.error('Erro no JavaScript:', err.message);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(dest('dist/js'))
        .pipe(connect.reload())
        .on('end', () => console.log('JavaScript compilado e minificado!'));
}

async function images() {
    const image_min = await load_imagemin();
    return src('src/image/*')
        .pipe(image_min({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(dest('dist/image'))
        .on('end', () => console.log('Imagens otimizadas com sucesso!'));
}

function serve(done) {
    connect.server({
        root: './',
        livereload: true,
        port: 8080
    });

    console.log('Servidor iniciado em http://localhost:8080');

    watch('src/scss/**/*.scss', css);
    watch('src/*.html', html);
    watch('src/js/*.js', js);
    watch('src/image/*', images);

    done();
}

exports.default = series(parallel(css, html, js, images));
exports.dev = series(parallel(css, html, js, images), serve);
