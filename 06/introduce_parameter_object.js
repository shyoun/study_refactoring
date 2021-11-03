/**
 * 6-8 매개변수 객체 만들기(introduce parameter object)
 */

// ex: 온도 측정값 배열에서 정상 작동 범위를 벗어난 것이 있는지 검사하는 코드
const station = {
  name: 'ZB1',
  readings: [
    {
      temp: 47,
      time: "2016-11-10 09:10",
    },
    {
      temp: 53,
      time: "2016-11-10 09:20",
    },
    {
      temp: 58,
      time: "2016-11-10 09:30",
    },
    {
      temp: 53,
      time: "2016-11-10 09:40",
    },
    {
      temp: 51,
      time: "2016-11-10 09:50",
    },
  ]
}

// 원본 함수
function readingsOutsideRange(station, min, max) {
  return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 호출 예시
/*
alert = readingsOutsideRange(station, operationPlan.temperatureFloor, // 최저온도
  operationPlan.temperatureCeiling) // 최고온도
  */

// 1. min, max range객체를 하나로 묶어 표현한다.
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }

  get min() { return this._data.min }
  get max() { return this._data.max }
}

// 모든 절차 수행 후 테스트를 잰항한다.
// 2. 기존 함수에 새로운 생성한 객체를 매개변수로 추가한다.
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 2-1. 호출부에 매개변수 null 처리
alert = readingsOutsideRange(station, operationPlan.temperatureFloor, // 최저온도
  operationPlan.temperatureCeiling, null) // 최고온도

// 2-2. 매개변수 추가
alert = readingsOutsideRange(station, operationPlan.temperatureFloor, operationPlan.temperatureCeiling, range)

// 2-3. 함수에서 새로 추가된 매개변수 사용하도록 수정
function readingsOutsideRange(station, min, max, range) {
  // return station.readings.filter(r => r.temp < min || r.temp > max)
  return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
}

// 2-4. 기존에 사용하던 매개변수 삭제
function readingsOutsideRange(station, range) {
  // return station.readings.filter(r => r.temp < min || r.temp > max)
  return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
}

// !진정한 값 객체로 거듭나기.(object value)
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }

  get min() { return this._data.min }
  get max() { return this._data.max }

  // 필요한 기능이 생긴다면 아래와 같이 추가하여, 해당 객체를 사용하는 곳에서 사용가능하게 만들 수 있다!
  // 어렵지 않은데.. 그때그때 생각하면서 하기가 힘들듯. 습관이 되게하자
  contains(arg) {
    return (arg >= this.min && arg <= this.max)
  }
}