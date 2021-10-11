import { useEffect, useState } from 'react';

const BioInfo = ({ bioData, FECData, massTotal }) => {
    const [candidateInfo, setCandidateInfo] = useState(undefined)
    const [firstElected, setFirstElected] = useState(undefined)
    const [timesElected, setTimesElected] = useState(undefined)
    const [nextElectionYear, setNextElectionYear] = useState(undefined)

    useEffect(() => {
        setTimesElected(FECData['election_years'].length - 1)
        setNextElectionYear(FECData['election_years'][FECData['election_years'].length - 1])
        setCandidateInfo(FECData)
        setFirstElected(FECData['election_years'][0])
    }, [bioData, FECData]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    return (
        <div className="bioInfo">
            <>
            {bioData && <section>
                <span className="topline">{bioData.person.name}</span>
                <span className="subtitle">{bioData.description}</span>
            </section>}
            {
                <section>
                    <p>
                        <span>{bioData.person.firstname} </span>
                        {bioData.person.nickname && <span>{'"'+bioData.person.nickname+'"'}</span>}
                        <span> {bioData.person.lastname}</span>
                        <span> is the {bioData.description}.</span>
                    </p>
                    <p>
                        {firstElected && 
                            <span> {bioData.role_type_label} {bioData.person.lastname} was first elected to the Senate in {firstElected},</span>
                        }
                        {timesElected && <span> and has been elected {timesElected} time{timesElected > 1 && 's'}</span>}
                        {nextElectionYear && <span> and is up for reelection in {nextElectionYear}.</span>}
                    </p>
                    <p>
                        {massTotal && 
                            <span> 
                            Since {firstElected} {bioData.role_type_label} {bioData.person.lastname} has personally raised at least {formatter.format(massTotal) + ' '}
                            </span>
                        }
                    </p>
                </section>
            }
            </>
        </div>
    )
}

export default BioInfo
