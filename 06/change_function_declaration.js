/**
 * example_01: 함수 이름 바꾸기
 */

function circum(radius) {
  return 2 * radius * Math.PI
}

// ----> 기존함수에 인라인.
function circum(radius) {
  return circumeference(radius)
}

// circumference: 원둘레
function circumference(radius) {
  return 2 * Math.PI * radius
}

// ----> 기존에 호출하던 circum함수를 circumference 함수로 교체
// API로 제공되는 함수라면 deprecated처리 후 client에서 더 이상 사용하지 않을 시 삭제한다.

/**
 * example_02: 매개변수 추가하기
 */

// Book 클래스
class Book {
  constructor() {
    this._reservations = []
  }

  // TODO: 예약을 우선순위로 받고 싶은 경우
  addReservation(customer) {
    this._reservations.push(customer)
  }

  // ----> 새로 생성한 함수 인라인하기
  addReservation(customer) {
    this.zz_addReservation(customer, false)
  }

  // 임시로 찾기 쉬운 함수명으로 변경
  zz_addReservation(customer, isPriority) {
    console.assert(isPriority === ture || isPriority === false)
    this._reservations.push(customer)
  }


}