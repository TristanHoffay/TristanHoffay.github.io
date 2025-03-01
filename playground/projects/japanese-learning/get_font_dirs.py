import os
import json
import re

FONT_DIR = "fonts/"
TEXT_DIR = "fontdirs.json"

fonts = {}
for p in os.listdir(FONT_DIR):
    for f in os.listdir(FONT_DIR + p + '/'):
        if f.endswith('.ttf'):
            fonts[f[:-4]] = FONT_DIR + p + '/' + f
with open(TEXT_DIR, 'w') as out:
    out.write(json.dumps(fonts, indent=4))

# do hiragana stuff
input_txt = "hiragana.txt"
char_data = []
with open(input_txt, 'r') as txt:
    pairs = re.split(r'[\n\t]', txt.read())
    for pair in pairs:
        if len(pair) > 1:
            newd = {}
            spl = pair.split()
            newd["hiragana"] = spl[0]
            newd["romaji"] = spl[1]
            char_data.append(newd)
with open("hiragana.json", 'w') as out:
    out.write(json.dumps(char_data, indent=4))
