import { useState, useEffect } from 'react';
import { buildUrl } from '../App';
import CommitteeListItem from './CommitteeListItem'
const CommitteeList = ({ candidateID }) => {
    const [list, setList] = useState(undefined)
    const [showOlder, setShowOlder] = useState(false)

    useEffect(() => {
        const getComittees = async () => {
            const endpoint = `candidate/${candidateID}/committees`
            const params = [
                'page=1',
                'sort_nulls_last=false',
                'sort=-last_file_date',
                'per_page=100',
                'sort_null_only=false',
                'sort_hide_null=false'
            ]
            const fetchInfo = await fetch(buildUrl(endpoint, params))
            const info = await fetchInfo.json()
            const _filtered = info.results.filter((_result) => true)
            setList(_filtered)
        }
        
        getComittees()
    }, [candidateID]);


    let listItems;
    if (list) {
        listItems = list.map((_item, index) => {
            const diff = Math.abs(new Date().getFullYear() - new Date(_item.last_file_date).getFullYear())
            return ((diff <= 1 || showOlder) && 
                <CommitteeListItem 
                    key={index.toString()} 
                    data={_item}
                    className='comListItem' 
                />
            )
        });
    }
    return (
        <div className="comListContainer">
            <ul>{listItems}</ul>
            <button onClick={() => setShowOlder(!showOlder)}>
                {showOlder ? 'Hide inactive comittees' : 'Show inactive comittees'}
            </button>
        </div>
    )
}

export default CommitteeList
