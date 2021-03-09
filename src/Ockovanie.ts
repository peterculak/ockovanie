type Data = {
  payload: Array<Hospital>
}
export type Hospital = {
  id: string,
  title: string,
  city: string,
  age_from: string,
  age_to: string,
  calendar_data: Array<CalendarData>
}
type CalendarData = {
  c_date: string,
  is_closed: boolean,
  free_capacity: number
}

function extrahovatVolneTerminy(data: Data, cities: Array<string>): Array<Hospital> {
  const hospitals: Array<Hospital> = [];

  for (let i in data.payload) {
    for (let j in data.payload[i].calendar_data) {
      if (cities.includes(data.payload[i].city) && data.payload[i].calendar_data[j].free_capacity > 0) {
        hospitals.push(data.payload[i]);
        break;
      }
    }
  }

  return hospitals;
}

export function ockovanie(
  url: string = 'https://mojeezdravie.nczisk.sk/api/v1/web/get_all_drivein_times_vacc',
  cities: Array<string>
): Promise<any> {
  return fetch(url)
    .then((r: Response) => r.text())
    .then((data: string) => JSON.parse(data))
    .then((data: Data) => extrahovatVolneTerminy(data, cities))
    ;
}
