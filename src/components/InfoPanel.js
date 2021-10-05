import { useState, useEffect } from 'react';

const InfoPanel = ({ senatorData }) => {

    useEffect(() => {
        const getInfo = async () => {
            const data = await fetchInfo();
            console.log(data)
          }
      
          getInfo()
    }, [senatorData]);

    const fetchInfo = async () => {
        if (senatorData) {
            const res = await fetch(`https://api.open.fec.gov/v1/names/candidates/?q=[${senatorData.person.lastname},${senatorData.person.firstname}]&api_key=z777qVMhaX87xQbmyv9YUaaH2R6kODSpXoop10j8`)
            const data = await res.json()
            const id = data['results'].filter((instance) => instance.office_sought === "S")[0]['id']
            const fetchInfo = await fetch(`https://api.open.fec.gov/v1/candidate/${id}/?api_key=z777qVMhaX87xQbmyv9YUaaH2R6kODSpXoop10j8`)
            const info = await fetchInfo.json()
            return info
        }
      }

    
    return (
        <div>
            {senatorData ? <span>{senatorData.person.name}</span> : <span>none selected</span>}
        </div>
    )
}

export default InfoPanel
