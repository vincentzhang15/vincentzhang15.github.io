/*
Personal Website Project
@author Vincent Zhang
@since 28 December 2021 - 04 January 2022
*/


const SEP_MAJOR = " ";
const SEP_MINOR = ",";

const tools_src = {
    "py": "images/logo/PythonLogo.svg",
    "go": "images/logo/GoLogo.svg",
    "java": "images/logo/JavaLogo.svg",
    "js": "images/logo/JSLogo.svg",
    "c": "images/logo/CLogo.svg",
    "cpp": "images/logo/CppLogo.svg",
    "php": "images/logo/PHPLogo.svg",
    "hs": "images/logo/HaskellLogo.svg",
    "cs": "images/logo/CsLogo.svg",
    "pl": "images/logo/PerlLogo.svg",
    "bat": "images/logo/DOSBatchLanguage.png",
    "html": "images/logo/HTMLLogo.svg",
    "css": "images/logo/CSSLogo.svg",
    "t": "images/logo/TuringLogo.gif",
    "tf": "images/logo/TensorflowLogo.svg",
    "react": "images/logo/ReactLogo.svg",
    "vue": "images/logo/VueLogo.svg",
    "mysql": "images/logo/MySQLLogo.png",
    "node": "images/logo/NodeJSLogo.png",
    "jq": "images/logo/jQueryLogo.png",
};

const icon_src = {
    "icon_award": '<i class="fas fa-award"></i>',
    "icon_grad": '<i class="fas fa-graduation-cap"></i>',
}

const img_src = {
    "img_ib": "images/logo/IBLogo.svg",
    "img_ut": "images/logo/UofTLogo.svg",
    "img_euclid": "images/experience/WaterlooEuclidDistinction.png",
}

const locations_src = {
    "yt": '<i class="fab fa-youtube"></i>',
    "github": '<i class="fab fa-github"></i>',
    "devpost": '<span class="iconify icon-devpost" data-icon="simple-icons:devpost"></span>',
    "web": '<span class="iconify visit-web" data-icon="mdi:web"></span>',
};

// Tailored to the About and Skills sections.
class Square extends HTMLElement {
    connectedCallback() {
        var label = this.attributes.label.value;
        var img = this.attributes.img.value;
        var img_html = "";

        // Allow custom formatting to images.
        var cls = "";
        if(this.hasAttribute("cls"))
        {
            cls = this.attributes.cls.value;
        }

        // Find corresponding image location.
        if(img in tools_src) {
            img_html = `<img class="${cls}" src="${tools_src[img]}" />`;
        }
        else if(img in img_src) {
            img_html = `<img class="${cls}" src="${img_src[img]}" />`;
        }
        else if(img in icon_src) {
            img_html = icon_src[img];
        }
        else {
            console.log(`ERROR the source ${img} does not match any records.`);
        }

        this.innerHTML =
        `
            <div class="block">
                ${img_html}
                <h1>${label}</h1>
            </div>
        `
    }
}
customElements.define("square-elem", Square);


// Tailored to the Experience, Projects, and Education sections to dynamically adapt to all three variations.
class Card extends HTMLElement {
    connectedCallback() {
        var title = this.attributes.title.value;
        var subtitle = this.attributes.subtitle.value;
        var glow = this.hasAttribute("glow") ? "gradient-border" : "";

        var description = this.attributes.description.value;
        if(description) {
            description = description.replaceAll(/\n\s*- /g, "<br />- "); // Automatically add new line before bullets points.
            // Regex match new line then 0 or more whitespaces then "- " so that only bullets after the first line in the html tag attribute value has a new line before it.
        }

        // Group courses by term for clarity.
        var date = this.attributes.date.value;
        var fall2021 = date.includes("Dec, 2021") || date.includes("Aug, 2022") ? "fall2021" : "";

        // If image not provided, use the specified data, e.g., icon.
        var imgsrc = this.attributes.imgsrc.value;
        var img_html = imgsrc.substring(0, 1) === "<" ? imgsrc : `<img src="${imgsrc}" />`;

        // Automatically apply gradient color to perfect scores.
        var grade = this.attributes.grade.value;
        var idx_grade = grade.indexOf(SEP_MAJOR);
        var no_grade = "";
        if (idx_grade >= 0) {
            var grade_name = grade.substring(0, idx_grade);
            var grade_value = grade.substring(idx_grade + 1);
            var grade_primary = grade_value.split(" ")[0];
            var perfect = (grade_primary === "4.0/4.0" || grade_primary === "100%" || grade_primary === "A+") ? "perfect" : "";
        }
        else {
            // Experience and project sections have no grades so grades div should not be displayed.
            no_grade = "remove";
        }

        // List of tools: Python, Java, etc.
        var tools = this.attributes.tools.value.split(SEP_MAJOR);
        var tools_html = "";
        for (const tool of tools) {
            if (tool in tools_src) {
                tools_html += `<img src="${tools_src[tool]}" />`
            }
            else if (tool !== "") {
                console.log(`ERROR: image with src '${tool}' not found.`)
            }
        }

        // Distribution location: Github, YouTube, Devpost.
        var locations = this.attributes.locations.value.split(SEP_MAJOR);
        var locations_html = "";

        // Location specified with "type,link type,link" so SEP_MINOR is comma.
        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            var location_arr = location.split(SEP_MINOR);
            var location_name = location_arr[0];
            var location_value = location_arr[1];
            if (location_name in locations_src) {
                locations_html += `<a href="${location_value}">${locations_src[location_name]}</a>`;
            }
            else if (location_name !== "") {
                console.log(`ERROR: location with src '${location_name}' not found.`)
            }

        }

        // The HTML code.
        this.innerHTML =
        `
            <div class="item ${fall2021} ${glow}">
                
                <div class="top">
                    <div class="title">
                        <h1>${title}</h1>
                    </div>
                    <div class="grade ${perfect} ${no_grade}">
                        <h4>${grade_name}<br />${grade_value}</h4>
                    </div>
                </div>
            
                <h2>${subtitle}</h2>
                <div class="tech">
                    ${tools_html}
                </div>
                <p>${description}</p>

                <div class="bottom">
                ${img_html}
                    <div class="footer">
                        ${locations_html}
                        <h3>${date}</h3>
                    </div>
                </div>
            
            </div>
        `;

    }
}
customElements.define("card-elem", Card);
