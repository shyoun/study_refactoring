const Province = require('./province')
const { sampleProvinceData } = require('./index')
const { expect } = require('@jest/globals')

describe('Province', () => {
  // ❌ 이렇게 상용하면 안됨.
  // 다른 테스트 케이스에 의해 데이터가 더러워질 가능성이 존재.
  // const asia = new Province(sampleProvinceData()) // 픽스처 설정

  // ✔ 아래와 같이 사용한다.
  let asia
  beforeEach(function () {
    asia = new Province(sampleProvinceData())
  })


  test('shortfall', function () {
    // const asia = new Province(sampleProvinceData()) // 픽스처 설정
    expect(asia.shortfall).toEqual(5)
  })

  test('profit', function () {
    // const asia = new Province
    expect(asia.profit).toEqual(230)
  })


  test('change production', function () {
    asia.producers[0].production = 20
    expect(asia.shortfall).toEqual(-6)
    expect(asia.profit).toEqual(292)
  })


  test('zero demand', function () { // 수요가 없을 때
    asia.demand = 0
    expect(asia.shortfall).toEqual(-25)
    expect(asia.profit).toEqual(0)
  })

  test('negitive demand', function () { // 수요가 음수
    asia.demand = -1
    expect(asia.shortfall).toEqual(-26)
    expect(asia.profit).toEqual(-10)
  })

  test('empty string demand', function () { // 수요 입력란이 비어 있을 때
    asia.demand = ''
    expect(asia.shortfall).toBeNaN()
    expect(asia.profit).toBeNaN()

  })
})

// 경계 조건 검사하기
// 발생할 수 있는 예외사항 테스트

describe('no producers', function () { // 생산자 없음
  let noProducers
  beforeEach(function () {
    const data = {
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20
    }

    noProducers = new Province(data)
  })

  test('shortfall', function () {
    expect(noProducers.shortfall).toEqual(30)
  })

  test('profit', function () {
    expect(noProducers.profit).toEqual(0)
  })
})


describe('string for producers', function () { // 생산자 수 필드에 문자열 대입
  test('', function () {
    const data = {
      name: 'String producers',
      producers: '',
      demand: 30,
      price: 20,
    }

    const prov = new Province(data)
    expect(prov.shortfall).toEqual(0)
  })

})