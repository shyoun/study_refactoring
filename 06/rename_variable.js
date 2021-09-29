// before
let tpHd = 'untitled'

// tpHd를 읽기만 하는 곳
let result = ''
result += `<h1>{tpHd}</h1>`

// 수정하는 곳
tpHd = obj['articleTitle']

// after: 변수 캡슐화하기를 통해 처리 가능

// 읽기
result += `<h1>{title()}</h1>`

// 쓰기
setTitle(obj['articleTitle'])

// 변수 캡슐화

// 캡슐화한 변수는 구분을 위해 _로 시작하게 수정하여 외부에서 변수에 직접접근하지 않아야 한다는 것을 표현한다.
let _title = 'untitled'

// getter
function title() {
  return _title
}

function setTitle(arg) {
  _title = arg
}


