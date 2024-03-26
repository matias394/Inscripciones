import moment from 'moment';

export const findNearestDate = (claseDTO: any[]) => {
  const today = moment();
  let nearestClass: any = null;
  let nearestDifference = Number.MAX_SAFE_INTEGER;

  if (!claseDTO) return null;

  for (const instancia of claseDTO) {
    for (const clase of instancia.clases) {
      const parsedDate = moment(clase.fecha, 'YYYY-MM-DD');
      const difference = Math.abs(parsedDate.diff(today, 'days'));

      if (difference < nearestDifference) {
        nearestDifference = difference;
        nearestClass = clase;
      }
    }
  }

  return nearestClass;
};
