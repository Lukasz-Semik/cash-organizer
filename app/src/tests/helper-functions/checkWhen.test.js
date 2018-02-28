import { checkWhen } from '../../helper-functions/checkWhen';
import moment from 'moment';

describe('function checkWen - mocked data 01/01/2018 12:00', () => {
  it('should return the object even without args', () => {
    const result = checkWhen()
    expect(result).toEqual(expect.any(Object))
  })
  it('should return time undefined if deadline arg is null', () => {
    const result = checkWhen(null, false, null)
    expect(result.time).toBe(undefined)
  })
  it('should return the object with red color and "Dzisiaj" text if deadline is the current day', () => {
    const result = checkWhen(null, false, moment('2018-01-01'))
    expect(result.time).toBe("Dzisiaj")
    expect(result.deadlineClassModifier).toBe('red')
  })
  it('should return the object with red color and "rok temu" if deadline was around one year ago', () => {
    const result = checkWhen(null, false, moment('2017-01-22'))
    expect(result.time).toBe('rok temu')
    expect(result.deadlineClassModifier).toBe('red')
  })
  it('should return the object with red color and "za 1 dzień" if deadline is tomorrow', () => {
    const result = checkWhen(null, false, moment('2018-01-02'))
    expect(result.time).toBe('za 1 dzień')
    expect(result.deadlineClassModifier).toBe('red')
  })
  it('should return the object with orange color and "za 14 dni" if there are two weeks to deadline', () => {
    const result = checkWhen(null, false, moment('2018-01-15'))
    expect(result.time).toBe('za 14 dni')
    expect(result.deadlineClassModifier).toBe('orange')
  })
})

