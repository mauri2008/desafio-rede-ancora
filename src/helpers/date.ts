
import { format, parseISO } from 'date-fns';

export function formatDate(date?: string) {
    if (date) 
    return format(parseISO(date), 'dd/MM/yyyy');
}   