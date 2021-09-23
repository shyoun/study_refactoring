/**
 * Inline function
 * 불필요하거나, 잘못 추출된 함수들을 인라인 시키는 방법 
 * 
 * 절차
 * 1. 다형 메서드(polymorphic method)인지 확인한다.
 * 2. 인라인 함수를 호출하는 곳으 ㄹ모두 찾는다.
 * 3. 각 호출문을 함수 본문으로 교체한다.
 * 4. 하나씩 교체할 때마다 테스트한다.
 * 5. 함수 정의(원래 함수)를 삭제한다.
 */

// ex_01
// before
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5
}

// after
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1
}

// ex_02
// before
function reportLines(aCustomer) {
  const lines = []
  gatherCustomerData(lines, aCustomer)
  return lines
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name])
  out.push(['location', aCustomer.location])
}

// after: 하나씩 변경 후 테스트
// step 1
function reportLines(aCustomer) {
  const lines = []
  lines.push(['name', aCustomer.name])
  gatherCustomerData(lines, aCustomer)
  return lines
}

function gatherCustomerData(out, aCustomer) {
  // inline 처리했으니 삭제
  // out.push(['name', aCustomer.name])
  out.push(['location', aCustomer.location])
}

// step 2
function reportLines(aCustomer) {
  const lines = []
  lines.push(['name', aCustomer.name])
  lines.push(['location', aCustomer.location])
  return lines
}

// 더 이상 사용하지 않으니 삭제
// function gatherCustomerData(out, aCustomer) {
//   out.push(['name', aCustomer.name])
//   out.push(['location', aCustomer.location])
// }