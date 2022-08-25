import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate (date: number) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime (date: number) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix (date: number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow (date: number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
