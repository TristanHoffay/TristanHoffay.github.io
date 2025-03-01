const house = document.getElementById("house");
const answer = document.getElementById("answer");
const font_dirs = {
    "DelaGothicOne-Regular": "fonts/Dela_Gothic_One/DelaGothicOne-Regular.ttf",
    "NotoSansJP-VariableFont_wght": "fonts/Noto_Sans_JP/NotoSansJP-VariableFont_wght.ttf",
    "YujiBoku-Regular": "fonts/Yuji_Boku/YujiBoku-Regular.ttf",
    "PottaOne-Regular": "fonts/Potta_One/PottaOne-Regular.ttf",
    "MPLUS1Code-VariableFont_wght": "fonts/M_PLUS_1_Code/MPLUS1Code-VariableFont_wght.ttf",
    "RampartOne-Regular": "fonts/Rampart_One/RampartOne-Regular.ttf",
    "MPLUSRounded1c-Bold": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Bold.ttf",
    "MPLUSRounded1c-Medium": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Medium.ttf",
    "MPLUSRounded1c-Thin": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Thin.ttf",
    "MPLUSRounded1c-Regular": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf",
    "MPLUSRounded1c-Black": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Black.ttf",
    "MPLUSRounded1c-ExtraBold": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-ExtraBold.ttf",
    "MPLUSRounded1c-Light": "fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.ttf",
    "YujiMai-Regular": "fonts/Yuji_Mai/YujiMai-Regular.ttf",
    "Stick-Regular": "fonts/Stick/Stick-Regular.ttf",
    "DotGothic16-Regular": "fonts/DotGothic16/DotGothic16-Regular.ttf",
    "HachiMaruPop-Regular": "fonts/Hachi_Maru_Pop/HachiMaruPop-Regular.ttf",
    "ReggaeOne-Regular": "fonts/Reggae_One/ReggaeOne-Regular.ttf",
    "RocknRollOne-Regular": "fonts/RocknRoll_One/RocknRollOne-Regular.ttf",
    "NotoSerifJP-VariableFont_wght": "fonts/Noto_Serif_JP/NotoSerifJP-VariableFont_wght.ttf",
    "KiwiMaru-Regular": "fonts/Kiwi_Maru/KiwiMaru-Regular.ttf",
    "KiwiMaru-Medium": "fonts/Kiwi_Maru/KiwiMaru-Medium.ttf",
    "KiwiMaru-Light": "fonts/Kiwi_Maru/KiwiMaru-Light.ttf",
    "ShipporiMincho-SemiBold": "fonts/Shippori_Mincho/ShipporiMincho-SemiBold.ttf",
    "ShipporiMincho-Bold": "fonts/Shippori_Mincho/ShipporiMincho-Bold.ttf",
    "ShipporiMincho-Medium": "fonts/Shippori_Mincho/ShipporiMincho-Medium.ttf",
    "ShipporiMincho-Regular": "fonts/Shippori_Mincho/ShipporiMincho-Regular.ttf",
    "ShipporiMincho-ExtraBold": "fonts/Shippori_Mincho/ShipporiMincho-ExtraBold.ttf"
}

var fonts = []
var f_index = 0;
var style_fonts = document.createElement("style");
for (let font in font_dirs) {
    fpath = font_dirs[font];
    style_fonts.innerHTML += `
    @font-face {
        font-family: '${font}';
        src: url('${fpath}');
    }\n`;
    document.body.appendChild(style_fonts);
    fonts.push(font);
}
function randomFont() {
    house.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
}
var range_input = document.getElementById("speed_range");
function changeFont() {
    f_index++;
    if (f_index > fonts.length)
        f_index = 0;
    let newFont = fonts[f_index];
    house.style.fontFamily = newFont;
}
range_input.addEventListener('input', function() {
    clearInterval(timer);
    timer = setInterval(randomFont, 1000 / range_input.value);
})
var timer = setInterval(randomFont, 1000);


//  Text entry logic and stuff


const hiragana = [
    {
        "hiragana": "\u3042",
        "romaji": "a"
    },
    {
        "hiragana": "\u3044",
        "romaji": "i"
    },
    {
        "hiragana": "\u3046",
        "romaji": "u"
    },
    {
        "hiragana": "\u3048",
        "romaji": "e"
    },
    {
        "hiragana": "\u304a",
        "romaji": "o"
    },
    {
        "hiragana": "\u304b",
        "romaji": "ka"
    },
    {
        "hiragana": "\u304d",
        "romaji": "ki"
    },
    {
        "hiragana": "\u304f",
        "romaji": "ku"
    },
    {
        "hiragana": "\u3051",
        "romaji": "ke"
    },
    {
        "hiragana": "\u3053",
        "romaji": "ko"
    },
    {
        "hiragana": "\u304c",
        "romaji": "ga"
    },
    {
        "hiragana": "\u304e",
        "romaji": "gi"
    },
    {
        "hiragana": "\u3050",
        "romaji": "gu"
    },
    {
        "hiragana": "\u3052",
        "romaji": "ge"
    },
    {
        "hiragana": "\u3054",
        "romaji": "go"
    },
    {
        "hiragana": "\u3055",
        "romaji": "sa"
    },
    {
        "hiragana": "\u3057",
        "romaji": "shi"
    },
    {
        "hiragana": "\u3059",
        "romaji": "su"
    },
    {
        "hiragana": "\u305b",
        "romaji": "se"
    },
    {
        "hiragana": "\u305d",
        "romaji": "so"
    },
    {
        "hiragana": "\u3056",
        "romaji": "za"
    },
    {
        "hiragana": "\u3058",
        "romaji": "ji"
    },
    {
        "hiragana": "\u305a",
        "romaji": "zu"
    },
    {
        "hiragana": "\u305c",
        "romaji": "ze"
    },
    {
        "hiragana": "\u305e",
        "romaji": "zo"
    },
    {
        "hiragana": "\u305f",
        "romaji": "ta"
    },
    {
        "hiragana": "\u3061",
        "romaji": "chi"
    },
    {
        "hiragana": "\u3064",
        "romaji": "tsu"
    },
    {
        "hiragana": "\u3066",
        "romaji": "te"
    },
    {
        "hiragana": "\u3068",
        "romaji": "to"
    },
    {
        "hiragana": "\u3060",
        "romaji": "da"
    },
    {
        "hiragana": "\u3062",
        "romaji": "di"
    },
    {
        "hiragana": "\u3065",
        "romaji": "du"
    },
    {
        "hiragana": "\u3067",
        "romaji": "de"
    },
    {
        "hiragana": "\u3069",
        "romaji": "do"
    },
    {
        "hiragana": "\u306a",
        "romaji": "na"
    },
    {
        "hiragana": "\u306b",
        "romaji": "ni"
    },
    {
        "hiragana": "\u306c",
        "romaji": "nu"
    },
    {
        "hiragana": "\u306d",
        "romaji": "ne"
    },
    {
        "hiragana": "\u306e",
        "romaji": "no"
    },
    {
        "hiragana": "\u306f",
        "romaji": "ha"
    },
    {
        "hiragana": "\u3072",
        "romaji": "hi"
    },
    {
        "hiragana": "\u3075",
        "romaji": "fu"
    },
    {
        "hiragana": "\u3078",
        "romaji": "he"
    },
    {
        "hiragana": "\u307b",
        "romaji": "ho"
    },
    {
        "hiragana": "\u3070",
        "romaji": "ba"
    },
    {
        "hiragana": "\u3073",
        "romaji": "bi"
    },
    {
        "hiragana": "\u3076",
        "romaji": "bu"
    },
    {
        "hiragana": "\u3079",
        "romaji": "be"
    },
    {
        "hiragana": "\u307c",
        "romaji": "bo"
    },
    {
        "hiragana": "\u3071",
        "romaji": "pa"
    },
    {
        "hiragana": "\u3074",
        "romaji": "pi"
    },
    {
        "hiragana": "\u3077",
        "romaji": "pu"
    },
    {
        "hiragana": "\u307a",
        "romaji": "pe"
    },
    {
        "hiragana": "\u307d",
        "romaji": "po"
    },
    {
        "hiragana": "\u307e",
        "romaji": "ma"
    },
    {
        "hiragana": "\u307f",
        "romaji": "mi"
    },
    {
        "hiragana": "\u3080",
        "romaji": "mu"
    },
    {
        "hiragana": "\u3081",
        "romaji": "me"
    },
    {
        "hiragana": "\u3082",
        "romaji": "mo"
    },
    {
        "hiragana": "\u3084",
        "romaji": "ya"
    },
    {
        "hiragana": "\u3086",
        "romaji": "yu"
    },
    {
        "hiragana": "\u3088",
        "romaji": "yo"
    },
    {
        "hiragana": "\u3089",
        "romaji": "ra"
    },
    {
        "hiragana": "\u308a",
        "romaji": "ri"
    },
    {
        "hiragana": "\u308b",
        "romaji": "ru"
    },
    {
        "hiragana": "\u308c",
        "romaji": "re"
    },
    {
        "hiragana": "\u308d",
        "romaji": "ro"
    },
    {
        "hiragana": "\u308f",
        "romaji": "wa"
    },
    {
        "hiragana": "\u3092",
        "romaji": "wo"
    },
    {
        "hiragana": "\u3093",
        "romaji": "n"
    },
    {
        "hiragana": "\u304d\u3083",
        "romaji": "kya"
    },
    {
        "hiragana": "\u304d\u3085",
        "romaji": "kyu"
    },
    {
        "hiragana": "\u304d\u3087",
        "romaji": "kyo"
    },
    {
        "hiragana": "\u304e\u3083",
        "romaji": "gya"
    },
    {
        "hiragana": "\u304e\u3085",
        "romaji": "gyu"
    },
    {
        "hiragana": "\u304e\u3087",
        "romaji": "gyo"
    },
    {
        "hiragana": "\u3057\u3083",
        "romaji": "sha"
    },
    {
        "hiragana": "\u3057\u3085",
        "romaji": "shu"
    },
    {
        "hiragana": "\u3057\u3087",
        "romaji": "sho"
    },
    {
        "hiragana": "\u3058\u3083",
        "romaji": "ja/jya"
    },
    {
        "hiragana": "\u3058\u3085",
        "romaji": "ju/jyu"
    },
    {
        "hiragana": "\u3058\u3087",
        "romaji": "jo/jyo"
    },
    {
        "hiragana": "\u3061\u3083",
        "romaji": "cha"
    },
    {
        "hiragana": "\u3061\u3085",
        "romaji": "chu"
    },
    {
        "hiragana": "\u3061\u3087",
        "romaji": "cho"
    },
    {
        "hiragana": "\u306b\u3083",
        "romaji": "nya"
    },
    {
        "hiragana": "\u306b\u3085",
        "romaji": "nyu"
    },
    {
        "hiragana": "\u306b\u3087",
        "romaji": "nyo"
    },
    {
        "hiragana": "\u3072\u3083",
        "romaji": "hya"
    },
    {
        "hiragana": "\u3072\u3085",
        "romaji": "hyu"
    },
    {
        "hiragana": "\u3072\u3087",
        "romaji": "hyo"
    },
    {
        "hiragana": "\u3073\u3083",
        "romaji": "bya"
    },
    {
        "hiragana": "\u3073\u3085",
        "romaji": "byu"
    },
    {
        "hiragana": "\u3073\u3087",
        "romaji": "byo"
    },
    {
        "hiragana": "\u3074\u3083",
        "romaji": "pya"
    },
    {
        "hiragana": "\u3074\u3085",
        "romaji": "pyu"
    },
    {
        "hiragana": "\u3074\u3087",
        "romaji": "pyo"
    },
    {
        "hiragana": "\u307f\u3083",
        "romaji": "mya"
    },
    {
        "hiragana": "\u307f\u3085",
        "romaji": "myu"
    },
    {
        "hiragana": "\u307f\u3087",
        "romaji": "myo"
    },
    {
        "hiragana": "\u308a\u3083",
        "romaji": "rya"
    },
    {
        "hiragana": "\u308a\u3085",
        "romaji": "ryu"
    },
    {
        "hiragana": "\u308a\u3087",
        "romaji": "ryo"
    }
]
var current_index = 0;
var wrong_count = 0;
new_text();

function new_text() {
    current_index = Math.floor(Math.random() * hiragana.length);
    console.log(hiragana[current_index])
    house.innerHTML = hiragana[current_index]["hiragana"];
    answer.innerHTML = hiragana[current_index]["romaji"];
}

function flashColor(color) {
    document.body.style.transitionDuration = "50ms";
    document.body.style.backgroundColor = color;
    setTimeout(function() {document.body.style.transitionDuration = "500ms";
        document.body.style.backgroundColor = "white";}, 50)
}
function flashAnswer() {
    answer.style.transitionProperty = "opacity";
    answer.style.transitionDuration = "0ms";
    answer.style.opacity = `${wrong_count/10}`;
    setTimeout(function() {answer.style.transitionDuration = `${50*wrong_count}ms`;
        answer.style.opacity = "0.0";}, 10)
}

function check_input() {
    if (hiragana[current_index]["romaji"].split('/').includes(text_input.value.trim())) {
        text_input.value = "";
        flashColor("rgb(199, 255, 218)")
        answer.style.transitionDuration = "0ms";
        answer.style.opacity = "0.0";
        answer.style.transitionProperty = "none";
        wrong_count = 0;
        new_text()
    }
    else {
        flashColor("rgb(255, 206, 206)");
        wrong_count++;
        flashAnswer();
    }
}



var text_input = document.getElementById("text_entry");
text_input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        check_input();
    }
});