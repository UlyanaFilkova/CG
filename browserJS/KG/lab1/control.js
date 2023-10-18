var rs = document.getElementById('r-slider');
var gs = document.getElementById('g-slider');
var bs = document.getElementById('b-slider');
var cs = document.getElementById('c-slider');
var ms = document.getElementById('m-slider');
var ys = document.getElementById('y-slider');
var ks = document.getElementById('k-slider');
var hs = document.getElementById('h-slider');
var ss = document.getElementById('s-slider');
var vs = document.getElementById('v-slider');

var colorPicker = document.getElementById('color-picker');
var colorPreview = document.getElementById('color-preview');

colorPicker.addEventListener('input', function () {
    var color = colorPicker.value;
    colorPreview.style.backgroundColor = color;
    let rgb = convertHexToRGB(color);
    let cmyk = convertRGBToCMYK(rgb.r, rgb.g, rgb.b);
    let hsv = convertRGBToHSV(rgb.r, rgb.g, rgb.b);
    rgb = convertHSVtoRGB(hsv.h, hsv.s, hsv.v)
    rgb = convertCMYKtoRGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k)

});

let slidersContainer = document.getElementById('sliders');
slidersContainer.addEventListener('input', function (event) {
    if (event.target.type === 'range') {
        let slider = event.target;
        const newValue = slider.value;
        let span = slider.nextElementSibling;
        span.textContent = newValue;

        // выбираем слайдер
        let letter = slider.id.charAt(0);
        let rgb;
        let cmyk;
        let hsv;

        switch (letter) {
            case 'r':
            case 'g':
            case 'b':
                rgb = {
                    r: rs.value,
                    g: gs.value,
                    b: bs.value
                };
                cmyk = convertRGBToCMYK(rgb.r, rgb.g, rgb.b);
                hsv = convertRGBToHSV(rgb.r, rgb.g, rgb.b);
                cs.value = cmyk.c;
                cs.nextElementSibling.textContent = cmyk.c;
                ms.value = cmyk.m;
                ms.nextElementSibling.textContent = cmyk.m;
                ys.value = cmyk.y;
                ys.nextElementSibling.textContent = cmyk.y;
                ks.value = cmyk.k;
                ks.nextElementSibling.textContent = cmyk.k;
                hs.value = hsv.h;
                hs.nextElementSibling.textContent = hsv.h;
                ss.value = hsv.s;
                ss.nextElementSibling.textContent = hsv.s;
                vs.value = hsv.v;
                vs.nextElementSibling.textContent = hsv.v;
                break;
            case 'c':
            case 'm':
            case 'y':
            case 'k':
                cmyk = {
                    c: cs.value,
                    m: ms.value,
                    y: ys.value,
                    k: ks.value
                };
                rgb = convertCMYKtoRGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k)
                hsv = convertRGBToHSV(rgb.r, rgb.g, rgb.b);
                rs.value = rgb.r;
                rs.nextElementSibling.textContent = rgb.r;
                gs.value = rgb.g;
                gs.nextElementSibling.textContent = rgb.g;
                bs.value = rgb.b;
                bs.nextElementSibling.textContent = rgb.b;
                hs.value = hsv.h;
                hs.nextElementSibling.textContent = hsv.h;
                ss.value = hsv.s;
                ss.nextElementSibling.textContent = hsv.s;
                vs.value = hsv.v;
                vs.nextElementSibling.textContent = hsv.v;
                break;
            case 'h':
            case 's':
            case 'v':
                hsv = {
                    h: hs.value,
                    s: ss.value,
                    v: vs.value
                };
                rgb = convertHSVtoRGB(hsv.h, hsv.s, hsv.v);
                cmyk = convertRGBToCMYK(rgb.r, rgb.g, rgb.b);
                rs.value = rgb.r;
                rs.nextElementSibling.textContent = rgb.r;
                gs.value = rgb.g;
                gs.nextElementSibling.textContent = rgb.g;
                bs.value = rgb.b;
                bs.nextElementSibling.textContent = rgb.b;
                cs.value = cmyk.c;
                cs.nextElementSibling.textContent = cmyk.c;
                ms.value = cmyk.m;
                ms.nextElementSibling.textContent = cmyk.m;
                ys.value = cmyk.y;
                ys.nextElementSibling.textContent = cmyk.y;
                ks.value = cmyk.k;
                ks.nextElementSibling.textContent = cmyk.k;
                break;
        }
        let rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        colorPreview.style.backgroundColor = rgbColor;
        let hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
        colorPicker.value = hexColor;
    }
});