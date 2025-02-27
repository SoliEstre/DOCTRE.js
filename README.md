# Korean

# DOCTRE : Document Object Cold Taste Refrigeration Effortlessness definition

DOCTRE.js는 HTML 요소 Tree를 JS/JSON Array 형식으로 단순화하여 정의하고,   
HTML 트리를 JSON 문자열로 변환 및 역변환하는 유틸리티 라이브러리입니다.

## 소개

DOCTRE.js는 HTML 요소를 JSON Array 형식으로 표현하고, 이를 다시 HTML로 변환할 수 있는 기능을 제공합니다.   
이를 통해 HTML 구조를 보다 쉽게 조작하고 저장할 수 있습니다.

궁극적으로 HTML의 attribute에 DOM Tree를 보관할 수 있도록 하는 것을 목적으로 만들어졌습니다.

### 용어 설명

- **HECP**: HTML Element Cold Presentation - Array 또는 argument 형식의 HTML 엘리먼트 표현을 지칭합니다.
    - **v1**: 6개 항목의 배열로 Element를 표현합니다.   
    성능 상 유리하므로 JS에서 inline으로 element를 작성할 때 사용하는 것을 권장합니다.

    - **v2**: 5개 항목의 배열로 Element를 표현합니다.   
    CSS query와 비슷하게 tag와 class, id를 하나의 string으로 정의하며,   
    추가로 v1과 동일하게 name, type 속성도 함께 정의할 수 있습니다.   
    cold 상태로 변환 및 해석 시 기본값입니다.

- **HCNL**: HTML Cold Node List - 노드 목록의 JSON으로 변환 가능한 Array 객체 표현을 지칭하며,   
노드 목록 및 엘리먼트 모두 \[\](array)로 표현되므로 Cold 상태 라고 부릅니다.   
반드시 Array로 시작하므로 Element 위주라면 [["div"], ["span"], ["p"]]와 같은 형식이 됩니다.

- **HFNL**: HCNL을 JSON으로 변환한 상태를 지칭합니다.   
마찬가지로 HCNL과 거의 동일하게 표현되므로 Frozen 상태라고 부릅니다.

## 로드

DOCTRE.js는 클래식 javascript .js 파일로 제공됩니다.   
기본적으로 페이지에서 직접 로드하여 사용합니다.   

추가로 Doctre.patch()를 실행하여 몽키패칭을 할 수 있으며,   
NodeList, Node, Element 객체에서 바로 변환 할 수 있게 됩니다.

## 사용법

### 기본 사용법

```js
// HECP로 HTML 요소 생성
const element = Doctre.createElement('div', 'box.float#app@root', 'Hello, World!');
document.body.appendChild(element);

// JSON 문자열로 변환
const jsonString = Doctre.stringify(element);
console.log(jsonString);

// JSON 문자열을 다시 HTML로 변환
const fragment = Doctre.parse(jsonString);
document.body.appendChild(fragment);
```

### 주요 메서드

#### `Doctre.extractTagName(solidId)`

주어진 solidId에서 태그 이름과 주요 속성을 추출합니다. (내부용)

#### `Doctre.extractMajorAttrs(majorAttrs, to = {})`

주어진 주요 속성 문자열에서 속성을 추출하여 객체로 반환합니다. (내부용)

#### `Doctre.extractTagAndMajorAttrs(solidId)`

주어진 solidId에서 태그 이름과 주요 속성을 추출하여 객체로 반환합니다. (내부용)

<br />

#### `Doctre.createElement(tagName, majorAttrs, contentData, style, attrs, datas, matchReplacer = {})`

주어진 HECP v1으로 HTML 요소를 생성합니다.   
majorAttrs는 ".class1.class2#id@name$type" 형식을 사용합니다.   
matchReplacer를 사용하면 문자열 내의 |key| 형식의 패턴을 교체할 수 있습니다.   
\* 해당 function 주석 참조

#### `Doctre.createElementReplaced(matchReplacer, tagName, majorAttrs, contentData, style, attrs, datas, matchReplacerOrigin = {})`

matchReplacer를 적용하여 주어진 HECP v1으로 HTML 요소를 생성합니다.

<br />

#### `Doctre.createElementBy(solidId, contentData, style, attrs, datas, matchReplacer = {})`

주어진 HECP v2로 HTML 요소를 생성합니다. solidId는 "tag.class1.class2#id@name$type" 형식을 사용합니다.   
matchReplacer를 사용하면 문자열 내의 |key| 형식의 패턴을 교체할 수 있습니다.   
\* 해당 function 주석 참조

#### `Doctre.createElementReplacedBy(matchReplacer, solidId, contentData, style, attrs, datas, matchReplacerOrigin = {})`

matchReplacer를 적용하여 주어진 HECP v2로 HTML 요소를 생성합니다.

<br />

#### `Doctre.createFragment(hcnlArray, matchReplacer = {})`

HCNL 배열에서 DocumentFragment를 생성합니다.

<br />

#### `Doctre.matchReplace(frostOrString, matchReplacer = {})`

주어진 문자열이나 객체에서 |key| 형식의 패턴을 matchReplacer의 값으로 교체합니다. (내부용)

#### `Doctre.matchReplaceObject(object, matchReplacer = {})`

객체의 키와 값에 matchReplace를 적용합니다. (내부용)

<br />

#### `Doctre.parse(frost, matchReplacer = {})`

JSON 문자열(HFNL)을 DocumentFragment로 파싱합니다.

#### `Doctre.live(frostOrCold, matchReplacer = {})`

HFNL 문자열 또는 HCNL 배열을 DocumentFragment로 변환합니다.

#### `Doctre.takeOut(frostOrCold, matchReplacer = {})`

HFNL 문자열 또는 HCNL 배열을 template 요소 내에 포함시킨 Element로 변환합니다.

<br />

#### `Doctre.getSolidId(tagName, className, id, name, type)`

주어진 태그 이름과 주요 속성으로 solidId를 생성합니다. (내부용)

#### `Doctre.packTagAndMajorAttrs(element, asSolidId = false)`

주어진 요소에서 태그 이름과 주요 속성을 추출하여 객체로 반환합니다. asSolidId가 true이면 solidId로 반환합니다. (내부용)

#### `Doctre.getStyleObject(style)`

주어진 스타일 문자열을 객체로 변환합니다. (내부용)

#### `Doctre.packAttributes(attrs)`

요소의 속성 목록에서 주요 속성을 제외한 속성들을 객체로 추출합니다. (내부용)

#### `Doctre.getDataObject(dataset)`

주어진 데이터셋을 객체로 변환합니다. (내부용)

#### `Doctre.trimHecp(hecp)`

주어진 HECP 배열에서 빈 항목을 제거합니다.

<br />

#### `Doctre.frostElement(element, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`

주어진 요소를 냉동(serialize)하여 HCNL 배열을 가져옵니다.
trimBobbleNode가 true이면 의미 없는 텍스트 노드를 제거합니다.

#### `Doctre.trimTextIndent(text)`

주어진 텍스트의 들여쓰기를 제거합니다. (내부용)

#### `Doctre.frostNode(node, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`

주어진 노드를 냉동(serialize)하여 HCNL 배열을 가져옵니다.
trimBobbleNode가 true이면 의미 없는 텍스트 노드를 제거합니다.

#### `Doctre.coldify(nodeOrList, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`

주어진 노드 또는 노드 리스트를 냉동(serialize)하여 HCNL 배열을 가져옵니다.
trimBobbleNode가 true이면 의미 없는 텍스트 노드를 제거합니다.

#### `Doctre.stringify(nodeOrListOrCold, prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`

주어진 노드, 노드 리스트 또는 HCNL 배열을 HFNL으로(JSON 문자열로) 변환합니다.
trimBobbleNode가 true이면 의미 없는 텍스트 노드를 제거합니다.

<br />

#### `Doctre.patch()`

Node, NodeList, Element 프로토타입에 HFNL 메서드를 추가합니다.   
이 메서드를 호출하면 다음과 같은 메서드들을 각 객체에서 사용할 수 있습니다:

- `Node.coldify(trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 노드를 냉동(serialize)합니다.

- `Node.coldified(trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 노드를 냉동하여 가져오고 DOM에서 제거합니다.

<br />

- `Node.stringify(prettyJson = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 노드를 JSON 문자열로 변환하여 가져옵니다.

- `Node.stringified(prettyJson = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 노드를 JSON 문자열로 변환하여 가져오고 DOM에서 제거합니다.

<br />

- `NodeList.coldify(trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 노드 리스트를 냉동하여 가져옵니다.

- `NodeList.stringify(prettyJson = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 노드 리스트를 JSON 문자열로 변환하여 가져옵니다.

<br />

- `Element.cold(trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 자식 노드들을 냉동하여 가져옵니다.

- `Element.takeCold(trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 자식 노드들을 냉동하여 가져오고 DOM에서 제거합니다.

<br />

- `Element.frozen(prettyJson = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 자식 노드들을 JSON 문자열로 변환하여 가져옵니다.

- `Element.takeFrozen(prettyJson = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 자식 노드들을 JSON 문자열로 변환하여 가져오고 DOM에서 제거합니다.

<br />

- `Element.alive(frostOrCold, matchReplacer = {})`   
: HFNL 문자열 또는 배열을 DocumentFragment로 변환하여 추가합니다.

- `Element.alone(frostOrCold, matchReplacer = {})`   
: HFNL 문자열 또는 배열을 DocumentFragment로 변환하여 자식 노드로 설정(overwrite)합니다.

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

- `Element.melt(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 자식 노드로 설정합니다.

<br />

- `Element.burn(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 추가하고 data 속성을 제거합니다.

- `Element.wormOut(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 추가하고 data 속성을 제거합니다.

- `Element.meltOut(matchReplacer = {}, dataName = "frozen")`   
: data 속성에 저장된 JSON 문자열을 DocumentFragment로 변환하여 자식 노드로 설정하고 data 속성을 제거합니다.

<br />

### 인스턴스

#### 생성자

##### `new Doctre(solidIdOrExtracted, contentData, style = {}, attrs = {}, datas = {})`

- `solidIdOrExtracted` (string | object | array)   
: 태그 이름과 주요 속성을 포함한 문자열, 객체 또는 배열.
- `contentData` (string | array | NodeList | Element | Node)   
: 요소의 내용 데이터.
- `style` (object)   
: 스타일 객체.
- `attrs` (object)   
: 추가 속성 객체.
- `datas` (object)   
: 데이터 속성 객체.

주어진 태그 이름과 주요 속성, 내용 데이터, 스타일, 추가 속성 및 데이터 속성을 사용하여 Doctre 인스턴스를 생성합니다.
기본적으로 엘리먼트 편집 및 Node/Cold/Frozen으로의 상태 변환이 용이한 상태로 작업하기 위해 사용됩니다.

빈 생성자를 호출하면 template 태그를 가지는 Doctre 인스턴스를 생성합니다.

#### 프로퍼티

- `tagName` (string)   
: 태그 이름.
- `classes` (array)   
: 클래스 목록.
- `id` (string)   
: 요소의 ID.
- `name` (string)   
: 요소의 이름.
- `type` (string)   
: 요소의 타입.

<br />

- `childDoctres` (array)   
: 자식 Doctre 인스턴스 목록.
- `style` (object)   
: 스타일 객체.
- `attrs` (object)   
: 추가 속성 객체.
- `datas` (object)   
: 데이터 속성 객체.

- `matachReplacer` (object)
: Node/Cold/Frozen 상태 변환 시 대체시킬 내용의 사전정의.

#### 메서드

- `get className()`   
: 클래스 이름을 반환합니다.
- `set className(value)`   
: 클래스 이름을 설정합니다.

<br />

- `get majorAttrs()`   
: 주요 속성 객체를 반환합니다.
- `get solidId()`   
: solidId 문자열을 반환합니다.

<br />

- `get live()`   
: 요소를 생성하여 반환합니다.

- `fresh(matchReplacer)`   
: matchReplacer를 적용하여 요소를 생성하여 반환합니다.

<br />

- `frost(trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 요소를 냉동(serialize)하여 HCNL 배열을 반환합니다.
- `get icy()`   
: 냉동된 요소를 반환합니다.

<br />

- `toString(prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 요소를 JSON 문자열로 변환하여 반환합니다.

<br />
<br />

- `get chill()`   
: 자식 요소들을 DocumentFragment로 반환합니다.

<br />

- `cold(trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: 자식 요소들을 냉동(serialize)하여 HCNL 배열을 반환합니다.

<br />

- `frozen(prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: 자식 요소들을 JSON 문자열로 변환하여 반환합니다.

<br />

## 라이선스

MIT License. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

<br />

# English

# DOCTRE : Document Object Cold Taste Refrigeration Effortlessness definition

DOCTRE.js is a utility library that defines HTML elements tree in JS/JSON Array format lightly, and converts and reverses HTML trees to JSON strings.

## Introduction

DOCTRE.js provides the ability to represent HTML elements in JSON Array format and convert them back to HTML. This makes it easier to manipulate and store HTML structures.

Ultimately, it was created to store the DOM Tree in the attributes of HTML.

### Terminology

- **HECP**: HTML Element Cold Presentation - Refers to the HTML element representation in Array or argument format.
    - **v1**: Represents an Element as an array of 6 items.   
    It is recommended to use this format when creating elements inline in JS for performance benefits.

    - **v2**: Represents an Element as an array of 5 items.   
    Similar to CSS query, it defines tag, class, and id as a single string.   
    Additionally, name and type attributes can also be defined in the same way as v1.   
    This is the default format when converting and interpreting in cold state.

- **HCNL**: HTML Cold Node List - Refers to the Array object representation that can be converted to JSON of the node list. Since both node lists and elements are represented as \[\](array), it is called Cold state. It always starts with an Array, so if it is element-oriented, it will be in the form of [["div"], ["span"], ["p"]].

- **HFNL**: Refers to the state converted to JSON from HCNL. Similarly, it is called Frozen state because it is almost identical to HCNL.

## Load

DOCTRE.js is provided as a classic javascript .js file. It is basically loaded directly from the page.

Additionally, you can execute Doctre.patch() to perform monkey patching, allowing direct conversion from NodeList, Node, and Element objects.

## Usage

### Basic Usage

```js
// Create HTML element by HECP
const element = Doctre.createElement('div', 'box.float#app@root', 'Hello, World!');
document.body.appendChild(element);

// Convert to JSON string
const jsonString = Doctre.stringify(element);
console.log(jsonString);

// Convert JSON string back to HTML
const fragment = Doctre.parse(jsonString);
document.body.appendChild(fragment);
```

### Main Methods

#### `Doctre.extractTagName(solidId)`
Extracts the tag name and major attributes from the given solidId. (Internal use)
  
#### `Doctre.extractMajorAttrs(majorAttrs, to = {})`
Extracts attributes from the specified major attributes string and returns them as an object. (Internal use)
  
#### `Doctre.extractTagAndMajorAttrs(solidId)`
Extracts the tag name and major attributes from the specified solidId and returns them as an object. (Internal use)

<br />

#### `Doctre.createElement(tagName, majorAttrs, contentData, style, attrs, datas, matchReplacer = {})`
Creates an HTML element using the given HECP v1.  
The parameter majorAttrs uses the format ".class1.class2#id@name$type".  
The matchReplacer parameter can be used to substitute patterns in the format |key| within strings.  
*See the function documentation for details.

#### `Doctre.createElementReplaced(matchReplacer, tagName, majorAttrs, contentData, style, attrs, datas, matchReplacerOrigin = {})`
Creates an HTML element using HECP v1 with substitution applied via matchReplacer.

<br />

#### `Doctre.createElementBy(solidId, contentData, style, attrs, datas, matchReplacer = {})`
Creates an HTML element using the given HECP v2.  
The solidId uses the format "tag.class1.class2#id@name$type".  
The matchReplacer parameter can be used to substitute |key| style patterns within the string.  
*See the function documentation for details.

#### `Doctre.createElementReplacedBy(matchReplacer, solidId, contentData, style, attrs, datas, matchReplacerOrigin = {})`
Creates an HTML element using HECP v2 with substitution applied via matchReplacer.

<br />

#### `Doctre.createFragment(hcnlArray, matchReplacer = {})`
Creates a DocumentFragment from the given HCNL array.

<br />

#### `Doctre.matchReplace(frostOrString, matchReplacer = {})`
Replaces patterns in the format |key| within the given string or object with values provided in matchReplacer. (Internal use)

#### `Doctre.matchReplaceObject(object, matchReplacer = {})`
Applies match replacement to both keys and values of the object. (Internal use)

<br />

#### `Doctre.parse(frost, matchReplacer = {})`
Parses the JSON string (HFNL) into a DocumentFragment.

#### `Doctre.live(frostOrCold, matchReplacer = {})`
Converts the HFNL string or HCNL array into a DocumentFragment.

#### `Doctre.takeOut(frostOrCold, matchReplacer = {})`
Converts the HFNL string or HCNL array into an Element contained within a template element.

<br />

#### `Doctre.getSolidId(tagName, className, id, name, type)`
Generates a solidId from the specified tag name and major attributes. (Internal use)

#### `Doctre.packTagAndMajorAttrs(element, asSolidId = false)`
Extracts the tag name and major attributes from the given element and returns them as an object.  
If asSolidId is true, returns as a solidId string instead. (Internal use)

#### `Doctre.getStyleObject(style)`
Converts the given style string into an object. (Internal use)

#### `Doctre.packAttributes(attrs)`
Extracts non-major attributes from an element’s attribute list and returns them as an object. (Internal use)

#### `Doctre.getDataObject(dataset)`
Converts the provided dataset into an object. (Internal use)

#### `Doctre.trimHecp(hecp)`
Removes empty items from the given HECP array.

<br />

#### `Doctre.frostElement(element, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`
Serializes the given element to an HCNL array.  
If trimBobbleNode is true, meaningless text nodes are removed.

#### `Doctre.trimTextIndent(text)`
Removes indentation from the given text. (Internal use)

#### `Doctre.frostNode(node, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`
Serializes the given node to an HCNL array.  
If trimBobbleNode is true, meaningless text nodes are removed.

#### `Doctre.coldify(nodeOrList, trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`
Serializes the given node or node list to an HCNL array.  
If trimBobbleNode is true, meaningless text nodes are removed.

#### `Doctre.stringify(nodeOrListOrCold, prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`
Converts the given node, node list, or HCNL array to an HFNL (JSON string).  
If trimBobbleNode is true, meaningless text nodes are removed.

<br />

#### `Doctre.patch()`
Adds HFNL methods to the prototypes of Node, NodeList, and Element.  
Once invoked, the following methods become available on these objects:
  
- `Node.coldify(...)`: Serializes the node.
  
- `Node.coldified(...)`: Serializes the node, retrieves it, and removes it from the DOM.

<br />

- `Node.stringify(...)`: Converts the node to a JSON string and returns it.

- `Node.stringified(...)`: Converts the node to a JSON string, returns it, and then removes it from the DOM.

<br />

- `NodeList.coldify(...)`: Serializes the node list and returns it.

- `NodeList.stringify(...)`: Converts the node list to a JSON string and returns it.

<br />

- `Element.cold(...)`: Serializes the child nodes and returns them.

- `Element.takeCold(...)`: Serializes and retrieves the child nodes, then removes them from the DOM.

<br />

- `Element.frozen(...)`: Converts the child nodes to a JSON string and returns it.

- `Element.takeFrozen(...)`: Converts the child nodes to a JSON string, returns it, and removes them from the DOM.

<br />

- `Element.alive(frostOrCold, matchReplacer = {})`: Converts an HFNL string or array to a DocumentFragment and appends it.

- `Element.alone(frostOrCold, matchReplacer = {})`: Converts an HFNL string or array to a DocumentFragment and overwrites the child nodes.

<br />

- `Element.freeze(dataName = "frozen")`: Serializes the child nodes to a JSON string and stores it in a data attribute.

- `Element.solid(dataName = "frozen")`: Serializes the child nodes to a JSON string, stores it in a data attribute, and removes the child nodes.

<br />

- `Element.hot(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string stored in the data attribute to a DocumentFragment and returns it.

- `Element.worm(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string in the data attribute to a DocumentFragment and appends it.

- `Element.melt(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string in the data attribute to a DocumentFragment and sets it as the child nodes.

<br />

- `Element.burn(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string in the data attribute to a DocumentFragment, appends it, and removes the data attribute.

- `Element.wormOut(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string in the data attribute to a DocumentFragment, appends it, and then removes the data attribute.

- `Element.meltOut(matchReplacer = {}, dataName = "frozen")`: Converts the JSON string in the data attribute to a DocumentFragment, sets it as the child nodes, and removes the data attribute.

<br />

### Instance

#### Constructor

##### `new Doctre(solidIdOrExtracted, contentData, style = {}, attrs = {}, datas = {})`

- `solidIdOrExtracted` (string | object | array)   
: A string, object, or array containing the tag name and major attributes.
- `contentData` (string | array | NodeList | Element | Node)   
: The content data of the element.
- `style` (object)   
: The style object.
- `attrs` (object)   
: The additional attributes object.
- `datas` (object)   
: The data attributes object.

Creates a Doctre instance with the given tag name and major attributes, content data, style, additional attributes, and data attributes.

Calling the constructor with no arguments creates a Doctre instance with a template tag.

#### Properties

- `tagName` (string)   
: The tag name.
- `classes` (array)   
: The list of classes.
- `id` (string)   
: The ID of the element.
- `name` (string)   
: The name of the element.
- `type` (string)   
: The type of the element.

<br />

- `childDoctres` (array)   
: The list of child Doctre instances.
- `style` (object)   
: The style object.
- `attrs` (object)   
: The additional attributes object.
- `datas` (object)   
: The data attributes object.

- `matachReplacer` (object)
: Predefined content for substitution during Node/Cold/Frozen state conversion.

#### Methods

- `get className()`   
: Returns the class name.
- `set className(value)`   
: Sets the class name.

<br />

- `get majorAttrs()`   
: Returns the major attributes object.
- `get solidId()`   
: Returns the solidId string.

<br />

- `get live()`   
: Creates and returns the element.

- `fresh(matchReplacer)`   
: Creates and returns the element, applying matchReplacer.

<br />

- `frost(trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: Freezes (serializes) the element and returns the HCNL array.
- `get icy()`   
: Returns the frozen element.

<br />

- `toString(prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: Converts the element to a JSON string and returns it.

<br />
<br />

- `get chill()`   
: Returns the child elements as a DocumentFragment.

<br />

- `cold(trimBobbleNode = false, trimHecp = false, styleToObject = !trimHecp, trimIndent = trimHecp, elementAsDoctre = !trimHecp)`   
: Freezes (serializes) the child elements and returns the HCNL array.

<br />

- `frozen(prettyJson = false, trimBobbleNode = false, trimHecp = true, styleToObject = !trimHecp, trimIndent = trimHecp)`   
: Converts the child elements to a JSON string and returns it.

<br />

## License

MIT License. For more details, refer to the [LICENSE](LICENSE) file.