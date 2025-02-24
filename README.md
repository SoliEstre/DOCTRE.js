# Korean

# J-HOT : JSON - HTML Object Tree definition

JHOT.js는 HTML 요소 및 Tree를 JS/JSON Array 형식으로 정의하고,   
HTML 트리를 JSON 문자열로 변환 및 역변환하는 유틸리티 라이브러리입니다.


## 소개

JHOT.js는 HTML 요소를 JSON Array 형식으로 표현하고, 이를 다시 HTML로 변환할 수 있는 기능을 제공합니다.   
이를 통해 HTML 구조를 보다 쉽게 조작하고 저장할 수 있습니다.

궁극적으로 HTML의 attribute에 DOM Tree를 보관할 수 있도록 하는 것을 목적으로 만들어졌습니다.

### 용어 설명

- **CHEP**: Cold HTML Element Presentation - Array 또는 argument 형식의 HTML 엘리먼트 표현을 지칭합니다.

- **HCNL**: HTML Cold Node List - 노드 목록의 JSON으로 변환 가능한 Array 객체 표현을 지칭하며,   
노드 목록 및 엘리먼트 모두 \[\](array)로 표현되므로 Cold 상태 라고 부릅니다.   
반드시 Array로 시작하므로 Element 위주라면 [["div"], ["span"], ["p"]]와 같은 형식이 됩니다.

- **JHOT**: HCNL을 JSON으로 변환한 상태를 지칭합니다.   
마찬가지로 HCNL과 거의 동일하게 표현되므로 Frozen 상태라고 부릅니다.


## 로드

JHOT.js는 클래식 javascript .js 파일로 제공됩니다.   
기본적으로 페이지에서 직접 로드하여 사용합니다.   

추가로 JHOT.patch()를 실행하여 몽키패칭을 할 수 있으며,   
NodeList, Node, Element 객체에서 바로 변환 할 수 있게 됩니다.

## 사용법

### 기본 사용법

```js

// HTML 요소 생성
const element = JHOT.createElement('div', 'box.float#app@root', 'Hello, World!');
document.body.appendChild(element);

// JSON 문자열로 변환
const jsonString = JHOT.stringify(element);
console.log(jsonString);

// JSON 문자열을 다시 HTML로 변환
const fragment = JHOT.parse(jsonString);
document.body.appendChild(fragment);
```

### 주요 메서드

#### `JHOT.createElement(tagName, classIdName, contentData, style, attrs, datas)`

주어진 CHEP으로 HTML 요소를 생성합니다.   
classIdName은 ".class1.class2#id@name" 형식을 사용합니다.   
\* 해당 function 주석 참조

<br />

#### `JHOT.createFragment(hcnlArray)`

주어진 HCNL 배열을 DocumentFragment로 변환합니다.

#### `JHOT.matchReplace(jhotString, matchReplacer)`

JHOT 문자열에서 매치된 키워드를 대체합니다. (내부용)   

#### `JHOT.parse(jhotString, matchReplacer)`

JHOT 문자열을 파싱하여 DocumentFragment로 변환합니다.

\* JHOT 코드의 parse 과정에서 HCNL로 변환되기 전에 자동으로 matchReplacer 객체를 참조하여   
|keyName|에 일치하는 텍스트가 value 또는 function의 리턴값으로 대체됩니다.

#### `JHOT.live(jhotColdOrString, matchReplacer)`

JHOT 문자열 또는 HCNL 배열을 DocumentFragment로 변환합니다.

#### `JHOT.takeOut(jhotColdOrString, matchReplacer)`

JHOT 문자열 또는 배열을 템플릿 요소로 변환합니다.

<br />

#### `JHOT.packAttributes(attrs)`

속성 객체를 패킹합니다. (내부용)

#### `JHOT.frostNode(node, trimIndent)`

노드를 냉동(serialize)하여 HCNL 배열을 가져옵니다.

#### `JHOT.coldify(nodeOrList, trimIndent)`

노드 또는 노드 리스트를 냉동(serialize)하여 HCNL 배열을 가져옵니다.

#### `JHOT.stringify(nodeOrListOrCold, prettyJson, trimIndent)`

노드 또는 노드 리스트 또는 HCNL 배열을 JHOT으로(JSON 문자열로) 변환합니다.

<br />

#### `JHOT.patch()`

Node, NodeList, Element 프로토타입에 JHOT 메서드를 추가합니다.   
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

- `Element.alive(jhotColdOrString, matchReplacer = {})`   
: JHOT 문자열 또는 배열을 DocumentFragment로 변환하여 추가합니다.

- `Element.alone(jhotColdOrString, matchReplacer = {})`   
: JHOT 문자열 또는 배열을 DocumentFragment로 변환하여 자식 노드로 설정(overwrite)합니다.

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