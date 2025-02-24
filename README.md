# Korean

# J-HOLy : JSON - HTML Object Lightly definition

JHOLy.js는 HTML 요소 Tree를 JS/JSON Array 형식으로 단순화하여여 정의하고,   
HTML 트리를 JSON 문자열로 변환 및 역변환하는 유틸리티 라이브러리입니다.


## 소개

JHOLy.js는 HTML 요소를 JSON Array 형식으로 표현하고, 이를 다시 HTML로 변환할 수 있는 기능을 제공합니다.   
이를 통해 HTML 구조를 보다 쉽게 조작하고 저장할 수 있습니다.

궁극적으로 HTML의 attribute에 DOM Tree를 보관할 수 있도록 하는 것을 목적으로 만들어졌습니다.

### 용어 설명

- **CHEP**: Cold HTML Element Presentation - Array 또는 argument 형식의 HTML 엘리먼트 표현을 지칭합니다.

- **HCNL**: HTML Cold Node List - 노드 목록의 JSON으로 변환 가능한 Array 객체 표현을 지칭하며,   
노드 목록 및 엘리먼트 모두 \[\](array)로 표현되므로 Cold 상태 라고 부릅니다.   
반드시 Array로 시작하므로 Element 위주라면 [["div"], ["span"], ["p"]]와 같은 형식이 됩니다.

- **JHOLy**: HCNL을 JSON으로 변환한 상태를 지칭합니다.   
마찬가지로 HCNL과 거의 동일하게 표현되므로 Frozen 상태라고 부릅니다.


## 로드

JHOLy.js는 클래식 javascript .js 파일로 제공됩니다.   
기본적으로 페이지에서 직접 로드하여 사용합니다.   

추가로 JHoly.patch()를 실행하여 몽키패칭을 할 수 있으며,   
NodeList, Node, Element 객체에서 바로 변환 할 수 있게 됩니다.

## 사용법

### 기본 사용법

```js

// HTML 요소 생성
const element = JHoly.createElement('div', 'box.float#app@root', 'Hello, World!');
document.body.appendChild(element);

// JSON 문자열로 변환
const jsonString = JHoly.stringify(element);
console.log(jsonString);

// JSON 문자열을 다시 HTML로 변환
const fragment = JHoly.parse(jsonString);
document.body.appendChild(fragment);
```

### 주요 메서드

#### `JHoly.createElement(tagName, classIdName, contentData, style, attrs, datas)`

주어진 CHEP으로 HTML 요소를 생성합니다.   
classIdName은 ".class1.class2#id@name" 형식을 사용합니다.   
\* 해당 function 주석 참조

<br />

#### `JHoly.createFragment(hcnlArray)`

주어진 HCNL 배열을 DocumentFragment로 변환합니다.

#### `JHoly.matchReplace(jholyString, matchReplacer)`

JHOLy 문자열에서 매치된 키워드를 대체합니다. (내부용)   

#### `JHoly.parse(jholyString, matchReplacer)`

JHOLy 문자열을 파싱하여 DocumentFragment로 변환합니다.

\* JHOLy 코드의 parse 과정에서 HCNL로 변환되기 전에 자동으로 matchReplacer 객체를 참조하여   
|keyName|에 일치하는 텍스트가 value 또는 function의 리턴값으로 대체됩니다.

#### `JHoly.live(jholyStringOrCold, matchReplacer)`

JHOLy 문자열 또는 HCNL 배열을 DocumentFragment로 변환합니다.

#### `JHoly.takeOut(jholyStringOrCold, matchReplacer)`

JHOLy 문자열 또는 배열을 템플릿 요소로 변환합니다.

<br />

#### `JHoly.packAttributes(attrs)`

속성 객체를 패킹합니다. (내부용)

#### `JHoly.frostNode(node, trimIndent)`

노드를 냉동(serialize)하여 HCNL 배열을 가져옵니다.

#### `JHoly.coldify(nodeOrList, trimIndent)`

노드 또는 노드 리스트를 냉동(serialize)하여 HCNL 배열을 가져옵니다.

#### `JHoly.stringify(nodeOrListOrCold, prettyJson, trimIndent)`

노드 또는 노드 리스트 또는 HCNL 배열을 JHOLy으로(JSON 문자열로) 변환합니다.

<br />

#### `JHoly.patch()`

Node, NodeList, Element 프로토타입에 JHOLy 메서드를 추가합니다.   
이 메서드를 호출하면 다음과 같은 메서드들을 각 객체에서 사용할 수 있습니다:

- `Node.coldify(trimIndent = true)`   
: 노드를 냉동(serialize)합니다.

- `Node.coldified(trimIndent = true)`   
: 노드를 냉동하여 가져오고 DOM에서 제거합니다.

<br />

- `Node.stringify(prettyJson = false, trimIndent = true)`   
: 노드를 JSON 문자열로 변환하여 가져옵니다.

- `Node.stringified(prettyJson = false, trimIndent = true)`   
: 노드를 JSON 문자열로 변환하여 가져오고 DOM에서 제거합니다.

<br />

- `NodeList.coldify(trimIndent = true)`   
: 노드 리스트를 냉동하여 가져옵니다.

- `NodeList.stringify(prettyJson = false, trimIndent = true)`   
: 노드 리스트를 JSON 문자열로 변환하여 가져옵니다.

<br />

- `Element.cold(trimIndent = true)`   
: 자식 노드들을 냉동하여 가져옵니다.

- `Element.takeCold(trimIndent = true)`   
: 자식 노드들을 냉동하여 가져오고 DOM에서 제거합니다.

<br />

- `Element.frozen(prettyJson = false, trimIndent = true)`   
: 자식 노드들을 JSON 문자열로 변환하여 가져옵니다.

- `Element.takeFrozen(prettyJson = false, trimIndent = true)`   
: 자식 노드들을 JSON 문자열로 변환하여 가져오고 DOM에서 제거합니다.

<br />

- `Element.alive(jholyStringOrCold, matchReplacer = {})`   
: JHOLy 문자열 또는 배열을 DocumentFragment로 변환하여 추가합니다.

- `Element.alone(jholyStringOrCold, matchReplacer = {})`   
: JHOLy 문자열 또는 배열을 DocumentFragment로 변환하여 자식 노드로 설정(overwrite)합니다.

<br />

- `Element.freeze(dataName = "frozen")`   
: 자식 노드들을 JSON 문자열로 변환하여 data 속성에 저장합니다.

- `Element.solid(dataName = "frozen")`   
: 자식 노드들을 JSON 문자열로 변환하여 data 속성에 저장하고 제거합니다.

<br />

- `Element.hot(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 가져옵니다.

- `Element.worm(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 추가합니다.

<br />

- `Element.melt(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 자식 노드로 설정합니다.

- `Element.burn(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 추가하고 data 속성을 제거합니다.

<br />

- `Element.wormOut(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 추가하고 data 속성을 제거합니다.

- `Element.meltOut(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 자식 노드로 설정하고 data 속성을 제거합니다.

<br />

## 라이선스

MIT License. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

<br />

# English

# J-HOLy : JSON - HTML Object Lightly definition

JHOLy.js is a utility library that defines HTML elements tree in JS/JSON Array format lightly, and converts and reverses HTML trees to JSON strings.

## Introduction

JHOLy.js provides the ability to represent HTML elements in JSON Array format and convert them back to HTML. This makes it easier to manipulate and store HTML structures.

Ultimately, it was created to store the DOM Tree in the attributes of HTML.

### Terminology

- **CHEP**: Cold HTML Element Presentation - Refers to the HTML element representation in Array or argument format.

- **HCNL**: HTML Cold Node List - Refers to the Array object representation that can be converted to JSON of the node list. Since both node lists and elements are represented as \[\](array), it is called Cold state. It always starts with an Array, so if it is element-oriented, it will be in the form of [["div"], ["span"], ["p"]].

- **JHOLy**: Refers to the state converted to JSON from HCNL. Similarly, it is called Frozen state because it is almost identical to HCNL.

## Load

JHOLy.js is provided as a classic javascript .js file. It is basically loaded directly from the page.

Additionally, you can execute JHoly.patch() to perform monkey patching, allowing direct conversion from NodeList, Node, and Element objects.

## Usage

### Basic Usage

```js
// Create HTML element
const element = JHoly.createElement('div', 'box.float#app@root', 'Hello, World!');
document.body.appendChild(element);

// Convert to JSON string
const jsonString = JHoly.stringify(element);
console.log(jsonString);

// Convert JSON string back to HTML
const fragment = JHoly.parse(jsonString);
document.body.appendChild(fragment);
```

### Main Methods

#### `JHoly.createElement(tagName, classIdName, contentData, style, attrs, datas)`

Creates an HTML element with the given CHEP. classIdName uses the format ".class1.class2#id@name". Refer to the function comments for details.

<br />

#### `JHoly.createFragment(hcnlArray)`

Converts the given HCNL array to a DocumentFragment.

#### `JHoly.matchReplace(jholyString, matchReplacer)`

Replaces matched keywords in the JHOLy string. (Internal use)

#### `JHoly.parse(jholyString, matchReplacer)`

Parses the JHOLy string and converts it to a DocumentFragment.

\* During the parse process of JHOLy code, before converting to HCNL, it automatically references the matchReplacer object and replaces the text matching |keyName| with the value or the return value of the function.

#### `JHoly.live(jholyStringOrCold, matchReplacer)`

Converts the JHOLy string or HCNL array to a DocumentFragment.

#### `JHoly.takeOut(jholyStringOrCold, matchReplacer)`

Converts the JHOLy string or array to a template element.

<br />

#### `JHoly.packAttributes(attrs)`

Packs the attribute object. (Internal use)

#### `JHoly.frostNode(node, trimIndent)`

Freezes (serializes) the node and retrieves the HCNL array.

#### `JHoly.coldify(nodeOrList, trimIndent)`

Freezes (serializes) the node or node list and retrieves the HCNL array.

#### `JHoly.stringify(nodeOrListOrCold, prettyJson, trimIndent)`

Converts the node, node list, or HCNL array to JHOLy (JSON string).

<br />

#### `JHoly.patch()`

Adds JHOLy methods to the Node, NodeList, and Element prototypes. When this method is called, the following methods can be used on each object:

- `Node.coldify(trimIndent = true)`   
: Freezes (serializes) the node.

- `Node.coldified(trimIndent = true)`   
: Freezes the node and retrieves it, removing it from the DOM.

<br />

- `Node.stringify(prettyJson = false, trimIndent = true)`   
: Converts the node to a JSON string and retrieves it.

- `Node.stringified(prettyJson = false, trimIndent = true)`   
: Converts the node to a JSON string and retrieves it, removing it from the DOM.

<br />

- `NodeList.coldify(trimIndent = true)`   
: Freezes the node list and retrieves it.

- `NodeList.stringify(prettyJson = false, trimIndent = true)`   
: Converts the node list to a JSON string and retrieves it.

<br />

- `Element.cold(trimIndent = true)`   
: Freezes the child nodes and retrieves them.

- `Element.takeCold(trimIndent = true)`   
: Freezes the child nodes and retrieves them, removing them from the DOM.

<br />

- `Element.frozen(prettyJson = false, trimIndent = true)`   
: Converts the child nodes to a JSON string and retrieves it.

- `Element.takeFrozen(prettyJson = false, trimIndent = true)`   
: Converts the child nodes to a JSON string and retrieves it, removing them from the DOM.

<br />

- `Element.alive(jholyStringOrCold, matchReplacer = {})`   
: Converts the JHOLy string or array to a DocumentFragment and adds it.

- `Element.alone(jholyStringOrCold, matchReplacer = {})`   
: Converts the JHOLy string or array to a DocumentFragment and sets it as the child node (overwrite).

<br />

- `Element.freeze(dataName = "frozen")`   
: Converts the child nodes to a JSON string and stores it in the data attribute.

- `Element.solid(dataName = "frozen")`   
: Converts the child nodes to a JSON string, stores it in the data attribute, and removes them.

<br />

- `Element.hot(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment and retrieves it.

- `Element.worm(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment and adds it.

<br />

- `Element.melt(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment and sets it as the child node.

- `Element.burn(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment, adds it, and removes the data attribute.

<br />

- `Element.wormOut(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment, adds it, and removes the data attribute.

- `Element.meltOut(matchReplacer = {}, dataName = "frozen")`   
: Converts the JSON string stored in the data attribute to a DocumentFragment, sets it as the child node, and removes the data attribute.

<br />

## License

MIT License. For more details, refer to the [LICENSE](LICENSE) file.