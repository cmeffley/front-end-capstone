import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import {
  updateRaceCoach,
  updateRaceAthlete,
  addRaceCoach,
  addRaceAthlete
} from '../helpers/data/raceData';
import { getAthletes } from '../helpers/data/athleteData';
import { getCoaches } from '../helpers/data/coachData';

function RacesForm({
  coach, athlete, setRaces, formTitle, setEditRace, ...raceInfo
}) {
  const [addRaces, setAddRaces] = useState({
    raceName: raceInfo?.raceName || '',
    raceDistance: raceInfo?.raceDistance || '',
    raceDate: raceInfo?.raceDate || '',
    raceLink: raceInfo?.raceLink || '',
    startDate: raceInfo?.startDate || '',
    endDate: raceInfo?.endDate || '',
    athleteUid: raceInfo?.athleteUid || athlete.athleteUid,
    coachUid: raceInfo?.coachUid || coach.coachUid,
    firebaseKey: raceInfo?.firebaseKey || null
  });
  const [selectAthlete, setSelectAthlete] = useState([]);
  const [selectCoach, setSelectCoach] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAthletes().then((response) => setSelectAthlete(response));
    getCoaches().then((response) => setSelectCoach(response));
  }, []);

  const handleInputChange = (e) => {
    setAddRaces((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addRaces.firebaseKey && raceInfo.coachUid && raceInfo.athleteUid) {
      updateRaceCoach(addRaces, raceInfo.coachUid).then((racesArray) => {
        setRaces(racesArray);
        setEditRace(false);
      });
    } else if (addRaces.firebaseKey && raceInfo.athleteUid && raceInfo.coachUid) {
      updateRaceAthlete(addRaces, raceInfo.athleteUid).then((racesArray) => {
        setRaces(racesArray);
        setEditRace(false);
      });
    } else if (coach !== null && athlete === false) {
      addRaceCoach(addRaces, raceInfo.coachUid).then((racesArray) => {
        setAddRaces(racesArray);
        history.push('/raceSchedule');
      });
    } else if (coach === false) {
      addRaceAthlete(addRaces, raceInfo.athleteUid).then((racesArray) => {
        setAddRaces(racesArray);
        history.push('/raceSchedule');
      });
    }
  };

  return (
    <div className='racesinputContainer'>
      <Form
        className='raceInputForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <Label>Race Name</Label>
        <Input
          name='raceName'
          type='text'
          value={addRaces.raceName}
          onChange={handleInputChange}
        />
        <Label>Race Distance</Label>
        <Input
          name='raceDistance'
          type='text'
          value={addRaces.raceDistance}
          onChange={handleInputChange}
        />
        <Label>Date of Race</Label>
        <Input
          name='raceDate'
          type='date'
          value={addRaces.raceDate}
          onChange={handleInputChange}
        />
        <Label>Link to Race Website</Label>
        <Input
          name='raceLink'
          type='text'
          value={addRaces.raceLink}
          onChange={handleInputChange}
        />
        <Label>Workout Program Start Date:</Label>
        <Input
          name='startDate'
          type='date'
          value={addRaces.startDate}
          onChange={handleInputChange}
        />
        <Label>Workout Program End Date:</Label>
        <Input
          name='endDate'
          type='date'
          value={addRaces.endDate}
          onChange={handleInputChange}
        />
        { coach
          ? '' : <Input
          type='select'
          name='coachUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Coach</option>
            {selectCoach.length && selectCoach.map((coaches) => <option
              key={coaches.coachUid}
              value={coaches.coachUid}
              >
                {coaches.fullName}
              </option>)}
        </Input>
        }
        { athlete
          ? '' : <Input
          type='select'
          name='athleteUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Athlete</option>
            {selectAthlete.length && selectAthlete.map((athletes) => <option
              key={athletes.athleteUid}
              value={athletes.athleteUid}
              >
                {athletes.fullName}
              </option>)}
        </Input>
        }
        <br/>
        <Button id='otherbuttoncolor' type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

RacesForm.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  setRaces: PropTypes.func,
  formTitle: PropTypes.string,
  setEditRace: PropTypes.func
};

export default RacesForm;
