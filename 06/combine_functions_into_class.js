/**
 * 6-9 여러 함수를 클래스로 묶기(combine functions into class)
 * 
 * 절차
 * 1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
 *  -> 공통 데이터가 레코드 구조로 묶여있지 않다면 먼저 매개변수 객체 만들기로 데이터를 하나로 묶는 레코드를 만든다.
 * 2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.
 *  -> 공통 레코드의 멤버는 함수 ㅗ출문의 인수 목록에서 제거한다.
 * 3. 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮긴다.
 */

// before


// 클라이언트 1
// const aReading = acquireReading()
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
// const base = (baseRate(aReading.month, aReading.year)) * aReading.quantity
const base = aReading.baseCharge


// 클라이언트 2
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
// const base = (baseRate(aReading.month, aReading.year)) * aReading.quantity
// const texableCharge = Math.max(0, base - taxThreshold(aReading.year))
// 변수 인라인
// const texableCharge = Math.max(0,  aReading.baseCharge - taxThreshold(aReading.year))

// 함수 추출하기
const texableCharge = taxableChargeFn(aReading)

// 추출한 함수를 클래스로 이동
function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year))
}

const texableCharge = aReading.taxableCharge


// 클라이언트 3
// const aReading = acquireReading()
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
// const basicChargeAmount = calculateBaseCharge(aReading)
// 2.
// const basicChargeAmount = aReading.calculateBaseCharge
// 3.
const basicChargeAmount = aReading.baseCharge

// 기본 요금 계산 함수
function calculateBaseCharge(aReading) {
  return (baseRate(aReading.month, aReading.year)) * aReading.quantity
}


// after

// 1. 캡슐화
class Reading {
  constructor(data) {
    this._customer = data.customer
    this._quantity = data.quantity
    this._month = data.month
    this._year = data.year
  }

  get customer() {
    return this._customer
  }

  get quantity() {
    return this._quantity
  }

  get month() {
    return this._month
  }

  get year() {
    return this._year
  }

  // 2. calculateBaseCharge 옮기기
  // 3. 함수 이름 바꾸기
  // get calculateBaseCharge() {
  get baseCharge() {
    return baseRate(this.month * this.year) * this.quantity
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year))
  }
}
