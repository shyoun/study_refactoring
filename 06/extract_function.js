/**
 * 함수  추출:
 * 1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.(어떻게가 아닌 무엇을 하는지가 드러나야 한다.)
 * 2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여놓는다.
 * 3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 업는지 검사한다. 있다면 매개변수로 전달한다.
 * 4. 변수를 다 처리했다면 컴파일 한다.
 * 5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.
 * 6. 테스트한다.
 * 7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다. (인라인 코드를 함수 호출로 바꾸기)
 */

function printOwing(invoice) {
  // let outstanding = 0

  // 배너 출력 로직을 함수로 호출
  printBanner()
  // console.log('****************************************')
  // console.log('*********** 고객 채무 *******************')
  // console.log('****************************************')

  // 변수 선언을 변수가 사용되는 코드 근처로 슬라이드
  // 채무 계산 함수 호출
  const outstanding = calculateOutstanding(invoice) // 함수 추출 완료. 추출한 함수가 반환한 값을 원래 변수에 저장한다.
  // let outstanding = 0 // 함수 최상단에 있던 선언문 현재 위치로 이동
  // // 미해결 채무(outstanding)을 계산한다.
  // for (const o of invoice.orders) {
  //   outstanding += o.amount
  // }

  // 마감일(dueDate)를 기록한다.
  recordDueDate(invoice) // 마감일 설정 로직을 함수로 호출

  // Clock Wrapper.
  // Date.now() 처럼 시스템 시간을 알려주는 함수는 직접 호출하지 않는다.
  // 직접 호출하면 테스트할 때마다 결과가 달라져서 오류 사항을 재현하기가 어렵기 때문.
  // const today = Clock.today
  // invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // 세부 사항을 출력한다.
  // 세부 사항 출력 함수 호출
  printDetails(invoice, outstanding)
  // console.log(`고객명: ${invoice.customer}`)
  // console.log(`채무액: ${outstanding}`)
  // console.log(`마감일: ${invocie.dueDate.toLocaleDateString()}`)

}

function calculateOutstanding(invoice) {
  let result = 0
  for (const o of invoice.orders) {
    result += o.amount
  }

  return result
}

function recordDueDate(invoice) {
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`)
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invocie.dueDate.toLocaleDateString()}`)
}

function printBanner() {
  console.log('****************************************')
  console.log('*********** 고객 채무 *******************')
  console.log('****************************************')
}