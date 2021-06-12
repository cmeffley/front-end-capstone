import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RacesForm from '../components/RacesForm';
import { getRacesCoach, getRacesAthlete } from '../helpers/data/raceData';

function RacesFormView({ coach, athlete }) {
  const [createRaces, setCreateRaces] = useState([]);
  useEffect(() => {
    if (coach !== null && athlete === false) {
      getRacesCoach(coach.uid).then((response) => setCreateRaces(response));
    } else if (coach === false) {
      getRacesAthlete(athlete.uid).then((response) => setCreateRaces(response));
    }
  }, []);
  return (
    <div>
      <RacesForm
        formTitle='Add Race'
        coach={coach}
        athlete={athlete}
        createRaces={createRaces}
        setCreateRaces={setCreateRaces}
      />
    </div>
  );
}

RacesFormView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RacesFormView;