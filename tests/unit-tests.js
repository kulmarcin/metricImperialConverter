const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('Whole number', done => {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });
  test('Decimal number', done => {
    let input = '32.2L';
    assert.equal(convertHandler.getNum(input), 32.2);
    done();
  });
  test('Fractional number', done => {
    let input = '32/2L';
    assert.equal(convertHandler.getNum(input), 16);
    done();
  });
  test('Fractional with Decimal number', done => {
    let input = '32/2.5L';
    assert.equal(convertHandler.getNum(input), 12.8);
    done();
  });
  test('Double fraction', done => {
    let input = '32/2/2L';
    assert.equal(convertHandler.getNum(input), undefined);
    done();
  });
  test('To one', done => {
    let input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });
  test('every unit', done => {
    let input = [
      'gal',
      'l',
      'mi',
      'km',
      'lbs',
      'kg',
      'GAL',
      'L',
      'MI',
      'KM',
      'LBS',
      'KG'
    ];
    let output = [
      'gal',
      'L',
      'mi',
      'km',
      'lbs',
      'kg',
      'gal',
      'L',
      'mi',
      'km',
      'lbs',
      'kg'
    ];
    input.forEach(function (ele, index) {
      assert.equal(convertHandler.getUnit(ele), output[index]);
    });
    done();
  });

  test('unknown unit', done => {
    assert.equal(convertHandler.getUnit('32lololo'), undefined);
    done();
  });

  test('init to return unit', done => {
    let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

    input.forEach((el, i) => {
      assert.equal(convertHandler.getReturnUnit(el), output[i]);
    });
    done();
  });

  test('correctly spell unit', done => {
    let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let output = [
      'gallons',
      'liters',
      'miles',
      'kilometers',
      'pounds',
      'kilograms'
    ];

    input.forEach((el, i) => {
      assert.equal(convertHandler.spellOutUnit(el), output[i]);
    });
    done();
  });

  test('gal to L', done => {
    const input = 5;
    const galToL = 3.78541;

    assert.equal(convertHandler.convert(input, 'gal'), input * galToL);
    done();
  });

  test('L to gal', done => {
    const input = 5;
    const galToL = 3.78541;

    let expected = input / galToL;
    expected = expected.toFixed(5);
    expected = +expected;

    assert.equal(convertHandler.convert(input, 'L'), expected);
    done();
  });

  test('mi to km', done => {
    const input = 5;
    const miToKm = 1.60934;

    assert.equal(convertHandler.convert(input, 'mi'), input * miToKm);
    done();
  });

  test('km to mi', done => {
    const input = 5;
    const miToKm = 1.60934;
    let expected = input / miToKm;
    expected = expected.toFixed(5);
    expected = +expected;

    assert.equal(convertHandler.convert(input, 'km'), expected);
    done();
  });

  test('lbs to kg', done => {
    const input = 5;
    const lbsToKg = 0.453592;

    assert.equal(convertHandler.convert(input, 'lbs'), input * lbsToKg);
    done();
  });

  test('kg to lbs', done => {
    const input = 5;
    const lbsToKg = 0.453592;

    let expected = input / lbsToKg;
    expected = expected.toFixed(5);
    expected = +expected;

    assert.equal(convertHandler.convert(input, 'kg'), expected);
    done();
  });
});
