import { useState, useEffect} from 'react';
import moment from 'moment'

const CommitteeListItem = ({ data }) => {
    const [cash, setCash] = useState(undefined)
    const [prevYTD, setPrevYTD ] = useState(undefined)
    const [curYTD, setCurYTD ] = useState(undefined)

    useEffect(() => {
        const getInfo = async () => {
            await fetchData();
        }

          getInfo()
    }, [data]);

    const fetchData = async () => {
        const endpoint = 'committee/' + data.committee_id + '/reports'
        const params = [
            'page=1',
            'sort_nulls_last=false',
            'per_page=10',
            'sort_null_only=false',
            'sort_hide_null=false'
        ]
        const fetchInfo = await fetch(buildUrl(endpoint, params))
        const info = await fetchInfo.json()
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        if (info.results[0]) {
            setCash(formatter.format(info.results[0].cash_on_hand_end_period));
            setCurYTD(formatter.format(info.results[0].total_contributions_ytd))
        }
        info.results.map((_report) => {
            if (_report.report_type === "YE"
                && _report.amendment_indicator !== "A"
                && ((new Date().getFullYear() - 1) - _report.report_year) === 1
                ){
                setPrevYTD(formatter.format(_report.total_contributions_ytd))
                // console.log((new Date().getFullYear() - 1))
            }
        })
    }

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



    return (
        <div className="comListItem">
            <p>
                <span>{data.name}</span>
                <span> is a {data.designation_full.toLowerCase()}</span>
                <span> that has been active since {moment(data.first_file_date).format('yyyy')}</span>
                {cash && 
                    <>
                    <span>{' and has ' + cash + ' cash on hand'}</span>
                    <span>{' as reported ' + moment(data.last_file_date).fromNow()}</span>
                    </>
                }
            </p>
            <span> Last Year {data.name} raised {prevYTD} and has raised {curYTD} so far this year</span>

        </div>
    )
}

export default CommitteeListItem
