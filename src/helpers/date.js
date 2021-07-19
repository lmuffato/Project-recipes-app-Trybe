import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

const currentDate = format(new Date(), 'd/M/yyyy', {
  locale: ptBR,
});

export default currentDate;

// Source - lib de datas: https://date-fns.org/v1.28.5/docs/format
