import './App.css';
import { useState } from 'react';
import Picker from './components/Picker';
import InfoPanel from './components/InfoPanel';


export function buildUrl(endpoint, params) {
  let baseUrl = 'https://api.open.fec.gov/v1/'
  let key = '&api_key=z777qVMhaX87xQbmyv9YUaaH2R6kODSpXoop10j8'
  let fetchUrl = baseUrl + endpoint + '?';
  params.forEach((_param, _index) => {
      fetchUrl = fetchUrl + (_index !== 0 ? ('&' + _param): _param)
  })
  fetchUrl = fetchUrl + key
  return fetchUrl
}

function App() {
  const [bioData, setBioData] = useState(undefined)
  const [FECData, setFECData] = useState(undefined)

  function buildUrl(endpoint, params) {
    let baseUrl = 'https://api.open.fec.gov/v1/'
    let key = '&api_key=z777qVMhaX87xQbmyv9YUaaH2R6kODSpXoop10j8'
    let fetchUrl = baseUrl + endpoint + '?';
    params.forEach((_param, _index) => {
        fetchUrl = fetchUrl + (_index !== 0 ? ('&' + _param): _param)
    })
    fetchUrl = fetchUrl + key
    return fetchUrl
  }

  const senatorSelected = async (senatorBioData) => {
    setBioData(senatorBioData)
    const params = [
      'office=S',
      'sort=-election_years',
      'incumbent_challenge=I',
      `state=${senatorBioData.state}`,
      `name=${senatorBioData.person.lastname}`
    ]
    const res = await fetch(buildUrl('candidates/search', params))
    const data = await res.json()
    setFECData(data['results'][0])
  }
  
  return (
    <div className="App">
      <Picker onSelect={(e) => senatorSelected(e.value)}/>
      {FECData && 
        <InfoPanel bioData={bioData} FECData={FECData}>

        </InfoPanel>
      }
    </div>
  );
}

export default App;
