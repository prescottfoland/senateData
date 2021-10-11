import { useEffect, useState } from 'react';
import { buildUrl } from '../App';
import BioInfo from './BioInfo';
import Chart from './Chart';
import CommitteeList from './CommitteeList';

const InfoPanel = ({ bioData, FECData }) => {
    const [candidateTotals, setCandidateTotals] = useState(undefined)
    const [massTotal, setMassTotal] = useState(undefined)

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `candidate/${FECData.candidate_id}/totals/`
            const params = [
                'election_full=true',
                'sort_nulls_last=true',
                'sort=cycle',
                'per_page=50'
            ]
            const fetchInfo = await fetch(buildUrl(endpoint, params))
            const info = await fetchInfo.json()
            const _filteredData = await info.results.filter((_result) => _result['contributions'] > 0)
            setCandidateTotals(_filteredData)
            let _massTotal = 0;
            _filteredData.forEach((_cycleResult) => {
                _massTotal = _massTotal + _cycleResult.contributions
            })
            setMassTotal(_massTotal)
        }
        fetchData()
    }, [FECData]);
    
    return (
        <div className="infoPanel">
            <BioInfo bioData={bioData} FECData={FECData} massTotal={massTotal}/>
            {candidateTotals && <Chart candidateID={FECData.candidate_id} totalsData={candidateTotals}/>}
            <p>
                <span>this total does not include funds raised by committees associated with {bioData.role_type_label} {bioData.person.lastname} which are listed below.</span>
            </p>
            <p>
                <span>it also does not include funds raised through PACs, Super-PACs, and 501(c) groups</span>
            </p>
            <CommitteeList candidateID={FECData.candidate_id}/>
        </div>
    )
}

export default InfoPanel
