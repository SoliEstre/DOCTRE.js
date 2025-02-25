/*

MIT License

Copyright (c) 2025 Estre Soliette (SoliEstre)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

     

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// DOCTRE.js - Document Object Cold Taste Refrigeration Effortlessness //
// 
// Cold(array object) assigning of HTML Tree for make to JSON string.
// 
// v0.2 / release 2025.02.25
// 
// cold = [] - Cold HTML child node list
// cold[0] - Tag name : string
// cold[1] - Classes, id, name, type = ".class1.class2#id@name$type" / "" : string
// cold[2] - Content data = cold HCNL : Array / text or html codes or empty: string / node list : NodeList / element : Element / node : Node
// cold[3] - Style codes : string
// cold[4] - Extra attributes : object
// cold[5] - Data attributes : object
//
// frost = '[["div", "box.float#app@root", null], "text node"]'
// 
// Match replace
// ex) Doctre.parse([["|tag|.|classes|#|id|", "empty content"], "|divider|"], { tag: () => isInline ? "span" | "div", classes: "test fixed", id: getId(), divider: it => '<hr class="' + it + '" />' })

class Doctre {

    static createElement(tagName, classIdNameType, contentData, style, attrs = {}, datas = {}) {
        if (tagName instanceof Array) return this.createElement(...tagName);

        const element = document.createElement(tagName);
        if (classIdNameType != null) {
            const process = (string, divider, element, attrName) => {
                const filter = new RegExp(divider + "[\w.-]*");
                const match = filter.exec(string);
                if (match != null) {
                    element.setAttribute(attrName, match[0].replace(new RegExp("^" + divider), ""));
                    return string.replace(filter, "");
                } else return string;
            };
            const classIdName = process(classIdNameType, "$", element, "type");
            const classId = process(classIdName, "@", element, "name");
            const classes = process(classId, "#", element, "id");
            if (classes.length > 0) element.setAttribute("class", classes === "." ? "" : classes.replace(/^\./, "").replace(/\./g, " ").replace(/\s+/g, " ").replace(/[^\w\s-]/g, ""));
        }
        if (attrs != null) for (const [key, value] of Object.entries(attrs)) switch (key) {
            case "id":
            case "name":
            case "type":
            case "class":
            case "style":
                break;

            default:
                element.setAttribute(key, value);
                break;
        }
        if (datas != null) for (const [key, value] of Object.entries(datas)) element.dataset[key] = value;
        if (contentData != null) switch (typeof contentData) {
            case "string":
                element.innerHTML = contentData;
                break;

            default:
                if (contentData instanceof Array) element.append(this.createFragment(contentData));
                else if (contentData instanceof NodeList) for (const node of contentData) element.appendChild(node);
                else if (contentData instanceof Node) element.appendChild(contentData);
                else element.append(contentData);
                break;
        };
        if (style != null) element.setAttribute("style", style);
        return element;
    }

    static createFragment(hcnlArray) {
        const df = document.createDocumentFragment();
        for (const val of hcnlArray) switch (typeof val) {
            case "string": 
                const tmp = document.createElement("template");
                tmp.innerHTML = val;
                for (const node of tmp.content.childNodes) df.appendChild(node);
                break;

            case "object":
            default:
                if (val instanceof Node) df.appendChild(val);
                else if (val instanceof Array) df.append(this.createElement(val));
                else df.append(val);
                break;
        };
        return df;
    }

    static matchReplace(frost, matchReplacer = {}) {
        if (matchReplacer != null) for (const key in matchReplacer) {
            const replacer = matchReplacer[key];
            switch (typeof replacer) {
                case "string":
                    frost.replace("|" + key + "|", replacer);
                    break;
                case "function":
                    frost.replace("|" + key + "|", replacer(key));
                    break;
            }
        }
        frost.replace(/\|([^\|]*)\|/g, "$1");
        return frost;
    }

    static parse(frost, matchReplacer = {}) {
        return this.createFragment(JSON.parse(this.matchReplace(frost, matchReplacer)));
    }

    static live(frostOrCold, matchReplacer = {}) {
        if (typeof frostOrCold == "string") return this.parse(frostOrCold, matchReplacer);
        else return this.createFragment(frostOrCold);
    }

    static takeOut(frostOrCold, matchReplacer = {}) {
        const element = document.createElement("tamplate");
        element.append(this.live(frostOrCold, matchReplacer));
        return element;
    }


    static packAttributes(attrs) {
        const pack = {};
        for (const attr of attrs) {
            const name = attr.name;
            switch (name) {
                case "id":
                case "name":
                case "type":
                case "class":
                case "style":
                    break;
                
                default:
                    if (!name.startsWith("data-")) pack[name] = attr.value;
                    break;
            }
        }
        return pack;
    }

    static frostNode(node, trimIndent = true) {
        if (node instanceof DocumentFragment) return this.coldify(node.childNodes);
        else if (node instanceof Element) {
            const frozen = [];
            frozen.push(node.tagName.toLowerCase());
            let classIdNameType = "";
            const className = node.getAttribute("class");
            if (className != null) classIdNameType += "." + className.replace(/ /g, ".");
            const id = node.getAttribute("id");
            if (id != null) classIdNameType += "#" + id;
            const name = node.getAttribute("name");
            if (name != null) classIdNameType += "@" + name;
            const type = node.getAttribute("type");
            if (type != null) classIdNameType += "$" + type;
            frozen.push(classIdNameType);
            frozen.push(this.coldify(node.childNodes));
            frozen.push(node.getAttribute("style"));
            frozen.push(this.packAttributes(node.attributes));
            frozen.push(node.dataset);
            return frozen;
        } else {
            const text = node.nodeValue;
            if (trimIndent) return text.split("\n").map(line => {
                let std = line.trimStart();
                if (std.length != line.length) std = " " + std;
                let etd = line.trimEnd();
                if (etd.lenth != std.length) etd += " ";
                return etd;
            }).join("\n");
            else return text;
        }
    }

    static coldify(nodeOrList, trimIndent = true) {
        const cold = [];
        if (nodeOrList instanceof Node) cold.push(this.frostNode(nodeOrList, trimIndent));
        else for (const node of nodeOrList) cold.push(this.frostNode(node, trimIndent));
        return cold;
    }

    static stringify(nodeOrListOrCold, prettyJson = false, trimIndent = true) {
        if (!(nodeOrListOrCold instanceof Array)) nodeOrListOrCold = this.coldify(nodeOrListOrCold, trimIndent);
        if (prettyJson == null || prettyJson === false) return JSON.stringify(nodeOrListOrCold);
        else return JSON.stringify(nodeOrListOrCold, null, typeof prettyJson == "number" ? prettyJson : 2);
    }


    static patch() {
        const attach = (cls, name, value) => Object.defineProperty(cls.prototype, name, { value, writable: true, configurable: true, enumerable: false });

        attach(NodeList, "coldify", function (trimIndent = true) { return Doctre.coldify(this, trimIndent); });
        attach(NodeList, "stringify", function (prettyJson = false, trimIndent = true) { return Doctre.stringify(this, prettyJson, trimIndent); });

        attach(Node, "coldify", function (trimIndent = true) { return Doctre.coldify(this, trimIndent); });
        attach(Node, "coldified", function (trimIndent = true) { const cold = this.coldify(trimIndent); this.remove(); return cold; });
        attach(Node, "stringify", function (prettyJson = false, trimIndent = true) { return Doctre.stringify(this, prettyJson, trimIndent); });
        attach(Node, "stringified", function (prettyJson = false, trimIndent = true) { const frost = this.stringify(prettyJson, trimIndent); this.remove(); return frost; });

        attach(Element, "cold", function (trimIndent = true) { return this.childNodes.coldify(trimIndent); });
        attach(Element, "takeCold", function (trimIndent = true) { const cold = this.cold(trimIndent); this.innerHTML = ""; return cold; });
        attach(Element, "frozen", function (prettyJson = false, trimIndent = true) { return this.childNodes.stringify(prettyJson, trimIndent); });
        attach(Element, "takeFrozen", function (prettyJson = false, trimIndent = true) { const frozen = this.frozen(prettyJson, trimIndent); this.innerHTML = ""; return frozen; });
        attach(Element, "alive", function (frostOrCold, matchReplacer = {}) { this.append(Doctre.live(frostOrCold, matchReplacer)); return this; });
        attach(Element, "alone", function (frostOrCold, matchReplacer = {}) { this.innerHTML = ""; return this.alive(frostOrCold, matchReplacer); });

        attach(Element, "freeze", function (dataName = "frozen") { this.dataset[dataName] = this.childNodes.stringify(); return this; });
        attach(Element, "solid", function (dataName = "frozen") { this.freeze(dataName); this.innerHTML = ""; return this; });
        attach(Element, "hot", function (matchReplacer = {}, dataName = "frozen") { return Doctre.live(this.dataset[dataName], matchReplacer); });
        attach(Element, "worm", function (matchReplacer = {}, dataName = "frozen") { const live = this.hot(matchReplacer, dataName); this.append(live); return live; });
        attach(Element, "melt", function (matchReplacer = {}, dataName = "frozen") { this.innerHTML = ""; return this.worm(matchReplacer, dataName); });
        attach(Element, "burn", function (matchReplacer = {}, dataName = "frozen") { const live = this.hot(matchReplacer, dataName); delete this.dataset.frozen; return live; });
        attach(Element, "wormOut", function (matchReplacer = {}, dataName = "frozen") { const frozen = this.dataset[dataName]; this.worm(frozen, matchReplacer); delete this.dataset.frozen; return frozen; });
        attach(Element, "meltOut", function (matchReplacer = {}, dataName = "frozen") { this.innerHTML = ""; return this.wormOut(matchReplacer, dataName); });
    }
}
