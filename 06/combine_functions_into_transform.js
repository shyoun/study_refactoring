/**
 * 6-1: 여러 함수를 변환 함수로 묶기(combine functions into transform)
 */

// 클라이언트 1
const aReading = acquireReading()
const base = (baseRate(aReading.month, aReading.year)) * aReading.quantity


// 클라이언트 2
const aReading = acquireReading()
const base = (baseRate(aReading.month, aReading.year)) * aReading.quantity
const texableCharge = Math.max(0, base - taxThreshold(aReading.year))

// 클라이언트 3
const aReading = acquireReading()
const basicChargeAmount = calculateBaseCharge(aReading)

// 기본 요금 계산 함수
function calculateBaseCharge(aReading) {
  return (baseRate(aReading.month, aReading.year)) * aReading.quantity
}


// refactoring
// 작자왈: 본질이 같고 부가 정보만 덧붙이는 변환 함수의 이름을 "enrich"(높이다),
// 형태가 바뀔 때 "transform"("변환")이라는 이름을 사용

// 1. 우선 입력 객체를 그대로 복사해 반환하는 변환 함수를 만든다.
function enrichReading(original) {
  // lodash
  const result = _.cloneDeep(original)

  return result
}

// 2. 변경하려는 계산 로직 중 하나를 고른다. 먼저 이 계산 로직에 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다.
function enrichReading(original) {
  // lodash
  const result = _.cloneDeep(original)
  // added this line
  result.baseCharge = calculateBaseCharge(result)
  return result
}

// 클라이언트 3
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const basicChargeAmount = Reading.baseCharge

// 클라이언트 1
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const base = aReading.baseCharge


// 4. 세금을 부과할 소비량 계산으로 넘어가자. 가장 먼저 변환 함수부터 끼워 놓는다.
function enrichReading(original) {
  // lodash
  const result = _.cloneDeep(original)
  // added this line
  result.baseCharge = calculateBaseCharge(result)
  return result
}

// 클라이언트 2
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)

// 변수 인라인하기!
// const base = aReading.baseCharge
// const texableCharge = Math.max(0, base - taxThreshold(aReading.year))
const texableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year)) // base -> aReading.baseCharge

// texableCharge 변환 함수로 이동
function enrichReading(original) {
  // lodash
  const result = _.cloneDeep(original)
  // added this line
  result.baseCharge = calculateBaseCharge(result)
  result.texableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year))
  return result
}

// 새로 추가한 필드 사용하도록 코드 수정
// 테스트에 성공하면 texableCharge 변수를 인라인한다.

// 클라이언트 2
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const texableCharge = aReading.texableCharge