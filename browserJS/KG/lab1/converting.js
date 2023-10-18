function convertHexToRGB(color) {
    var hex = color.substring(1);
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}

function convertRGBToCMYK(rgbr, rgbg, rgbb) {
    var r = rgbr / 255;
    var g = rgbg / 255;
    var b = rgbb / 255;

    var k = 1 - Math.max(r, g, b);

    if (k === 1) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }

    var c = (1 - r - k) / (1 - k);
    var m = (1 - g - k) / (1 - k);
    var y = (1 - b - k) / (1 - k);

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function convertRGBToHSV(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // оттенок
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360), // оттенок в градусах (0-360)
        s: Math.round(s * 100), // насыщенность в процентах (0-100)
        v: Math.round(v * 100)  // значение в процентах (0-100)
    };
}



function convertHSVtoRGB(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {
        r: Math.round(r * 255), // красный компонент (0-255)
        g: Math.round(g * 255), // зеленый компонент (0-255)
        b: Math.round(b * 255)  // синий компонент (0-255)
    };
}

function convertCMYKtoRGB(c, m, y, k) {
    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return {
        r: Math.round(r), // красный компонент (0-255)
        g: Math.round(g), // зеленый компонент (0-255)
        b: Math.round(b)  // синий компонент (0-255)
    };
}

function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}