import React from 'react';
import { render, screen } from '@testing-library/react';
import {Hospital, ockovanie} from "./Ockovanie";
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

const fetch = require('jest-fetch-mock');

beforeEach(() => {
  fetch.resetMocks();
});

test('extrahuje volne terminy ockovania', (done) => {
  const data = {
    "warnings": [],
    "errors": [],
    "info": [],
    "warning_count": 0,
    "error_count": 0,
    "payload_count": 57,
    "payload": [
      {
        "id": "2062",
        "title": "Vakc\u00edna ASTRA Poliklinika Mlynsk\u00e1 dolina",
        "longitude": "17.06812753",
        "latitude": "48.15861786",
        "city": "Bratislava",
        "street_name": "Star\u00e9 Grunty",
        "street_number": "56",
        "postal_code": "84104",
        "region_id": "1",
        "region_name": "Bratislavsk\u00fd",
        "county_id": "58",
        "county_name": "Bratislava IV",
        "age_from": "18",
        "age_to": "69",
        "calendar_data": [
          {
            "c_date": "2021-03-10",
            "is_closed": 1,
            "free_capacity": 0
          },
          {
            "c_date": "2021-03-11",
            "is_closed": 0,
            "free_capacity": 1
          },
          {
            "c_date": "2021-03-12",
            "is_closed": 0,
            "free_capacity": 1
          }
        ]
      },
      {
        "id": "889",
        "title": "Vakc\u00edna Zelen\u00fd sen, Bansk\u00e1 Bystrica",
        "longitude": "19.16405040",
        "latitude": "48.74096306",
        "city": "Bansk\u00e1 Bystrica",
        "street_name": "Cesta k nemocnici",
        "street_number": "1\/B",
        "postal_code": "97401",
        "region_id": "5",
        "region_name": "Banskobystrick\u00fd",
        "county_id": "23",
        "county_name": "Bansk\u00e1 Bystrica",
        "age_from": "70",
        "age_to": null,
        "calendar_data": [
          {
            "c_date": "2021-03-10",
            "is_closed": 0,
            "free_capacity": 1
          },
          {
            "c_date": "2021-03-11",
            "is_closed": 0,
            "free_capacity": 0
          },
          {
            "c_date": "2021-03-12",
            "is_closed": 1,
            "free_capacity": 0
          }
        ]
      },
    ],
  };

  fetch.once(JSON.stringify(data));

  ockovanie('https://mojeezdravie.nczisk.sk/api/v1/web/get_all_drivein_times_vacc', ['Bratislava']).then((hospitals: Array<Hospital>) => {
    expect(hospitals.length).toEqual(1);
    done();
  });
});
