/**
 * 변수 캡슐화하기(Encapsulate variable)
 * 절차
 * 1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
 * 2. 정적 검사를 수행한다.
 * 3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다. 하나씩 바꿀 때마다 테스트한다.
 * 4. 변수의 접근 범위를 제한한다. -> 변수로의 직접 접근을 막을 수 없을 때도 있다. 그럴 때는 변수 이름을 바꿔서 테스트해보면 해당 변수를 참조하는 곳을 쉽게 찾아낼 수 있다.
 * 5. 테스트한다.
 * 6. 변수 값이 레코드라면 캡슐화하기를 적용할지 고려해본다.
 */


// before
let defaultlOwner = { firstName: '마틴', lastName: '파울러' }

// after: 캡슐화
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }
export function defaultOnwer() {
  return defaultOwnerData
}
export function setDefaultOwner(args) {
  defaultOwnerData = args
}

const owner_1 = defaultOnwer()
console.assert('파울러' === owner_1.lastName, '처음 값 확인')

const owner_2 = defaultOnwer()
owner_2.lastname = '파슨스'
console.assert('파슨스' === owner_1.lastName, 'owner_2를 변경한 후') // 성공할까? 
// 내 예상: object는 주소 값이라. 성공한다고 본다.
// 결과: 내 예상이 맞음. owner_2.lastName을 바꾸었지만. 변수가 같은 주소를 보기 때문에 owner_1.lastName값도 바뀜

// 위 문제를 해결하기 위한 방안_1
// after_2: getter에서 값 복사 후 반환
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }
export function defaultOnwer() {
  return Object.assign({}, defaultOwnerData) // 원본 복사본에 해당되는 새로운 오브젝트 변수 생성하여 반환
  // 반환된 변수값을 직접 변경하여도, 복사본이기 때문에 원본 데이터는 바뀌지 않는다.
  // 원본 데이터는 setDefaultOwner 함수를 통해서만 변경 가능
}
export function setDefaultOwner(args) {
  defaultOwnerData = args
}

// after_3: 레코드 캡슐화하기
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }
function defaultOwner() {
  return new Person(defaultOwnerData)
}

function setDefaultOwner(arg) {
  return defaultOwnerData = arg
}

class Person {
  constructor(data) {
    this._firstName = data.firstName
    this._lastName = data.lastName
  }

  get firtName() {
    return this._firstName
  }

  get lastName() {
    return this._lastName
  }
}

const owner_1 = defaultOwner()
console.log(owner_1) // Person { _firstName: '마틴', _lastName: '파울러' } 

owner_1.firstName = '윤' // 위와 같이 defaultOwnerData의 속성을 다시 대입하는 연산은 모두 무시된다.
console.log(owner_1) // Person { _firstName: '마틴', _lastName: '파울러' }

setDefaultOwner({ firstName: '윤', lastName: '꽐라' })
console.log(owner_1) // Person { _firstName: '마틴', _lastName: '파울러' }

const owner_2 = defaultOwner()
console.log(owner_2) // Person { _firstName: '윤', _lastName: '꽐라' }