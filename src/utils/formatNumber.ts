import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency (value: number) {
  return numeral(value).format(Number.isInteger(value) ? '$0,0' : '$0,0.00');
}

export function fPercent (value: number) {
  return numeral(value / 100).format('0.0%');
}

export function fNumber (value: number) {
  return numeral(value).format();
}

export function fShortenNumber (value: number) {
  return replace(numeral(value).format('0.00a'), '.00', '');
}

export function fData (value: number) {
  return numeral(value).format('0.0 b');
}
