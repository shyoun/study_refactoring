// 변수 인라인하기(inline variable)
// 반대 리팩터링: 변수 추출하기

// before
{
  const basePrice = anOrder.basePrice;
  return (basePrice > 1000)
}

// after
{
  return anOrder.basePrice > 1000
}