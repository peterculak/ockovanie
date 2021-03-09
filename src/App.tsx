import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';
import {Hospital, ockovanie} from "./Ockovanie";

function App() {

  const [hospitals, setHospitals] = useState<Array<Hospital>>([]);

  useEffect(() => {
    ockovanie('https://mojeezdravie.nczisk.sk/api/v1/web/get_all_drivein_times_vacc', ['Bratislava']).then((hospitals: Array<Hospital>) => {
      setHospitals(hospitals);
      console.log(hospitals);
    });
  }, [hospitals]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://www.old.korona.gov.sk/img/logo_nczi_clear.png'} className="App-logo" alt="logo" />


        <a
          className="App-link"
          href="https://www.old.korona.gov.sk/covid-19-vaccination-form.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          korona.gov.sk
        </a>

        {!hospitals.length ? (<p>Ziadne volne terminy</p>) : (<p>Volne terminy su v tychto nemocniciach</p>)}

        <div>{hospitals.map((hospital: Hospital) => (
          <p key={hospital.id}>{hospital.title}</p>
        ))}</div>
      </header>
    </div>
  );
}

export default App;
