"""
Generates 'colorful-theme.css' to facilitate theme changing.
Solution logic:
1. Read 'main.css'.
2. Extract contents between ':root{\n' and '}\n'.
    1. For every line within, swap ': ... ;' contents with '/* ... */'.
3. Combine new ":root..." data with old stylesheet.

This is a helper program used to update and maintain the website.
This program is not needed for the functioning of the website once new theme stylesheet has been generated.

@author Vincent Zhang
@since 07 May 2022
"""

import re

def main():
    with open("main.css", encoding="UTF-8") as f:
        data = f.read()

    START = ":root {\n"
    END = "}\n"

    idx_start = data.index(START) + len(START)
    idx_end = data.index(END, idx_start)

    list_process = data[idx_start:idx_end].split("\n")

    # Replace format in  ':...;' with format in '/* */'.
    str_change = ''
    for line in list_process:
        # Check for invalid lines.
        new = re.search(r'\/\*.*\*\/', line)
        old = re.search(r':.*;', line)
        if new and old:
            # If valid, replace.
            old_s = line.index(":")+1
            old_e = line.rindex(";")
            new_s = line.index("/*")+2
            new_e = line.rindex("*/")-1

            replaced = line[:old_s] + (line[new_s:new_e]) + line[old_e:new_s] + (line[old_s:old_e]) + line[new_e:]
            line = replaced
        str_change += line + "\n"
    
    output = data[:idx_start] + str_change + data[idx_end:]
    with open("colorful-theme.css", 'w', encoding='UTF-8') as f:
        f.write(output)

if __name__=="__main__":
    main()
