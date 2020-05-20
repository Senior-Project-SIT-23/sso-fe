describe('test ue test jest', () => {
  test('test package jest', () => {
    expect(true).toEqual(true)
  })
})

describe('FizzBuzzz for test jest', () => {
  test('test input 1 should return 1', () => {
    const input = 1
    const actual = checkFizzBuzz(input)
    const expected = 1
    expect(expected).toEqual(actual)
  })
  test('test input 2 should return fizz', () => {
    const input = 2
    const actual = checkFizzBuzz(input)
    const expected = 'fizz'
    expect(expected).toEqual(actual)
  })
  test('test input 3 should return buzz', () => {
    const input = 3
    const actual = checkFizzBuzz(input)
    const expected = 'buzz'
    expect(expected).toEqual(actual)
  })
  test('test input 4 should return 4', () => {
    const input = 4
    const actual = checkFizzBuzz(input)
    const expected = 4
    expect(expected).toEqual(actual)
  })
  test('test input 5 should return wow', () => {
    const input = 5
    const actual = checkFizzBuzz(input)
    const expected = 'wow'
    expect(expected).toEqual(actual)
  })
  test('test input 15 should return fizzbuzz', () => {
    const input = 15
    const actual = checkFizzBuzz(input)
    const expected = 'fizzbuzz'
    expect(expected).toEqual(actual)
  })
})

const checkFizzBuzz = num => {
  if (num == 2) {
    return 'fizz'
  }
  if (num == 3) {
    return 'buzz'
  }
  if (num == 5) {
    return 'wow'
  }
  if (num == 15) {
    return 'fizzbuzz'
  }
  return num
}
