import { useEffect, useState } from 'react';
import { buildUrl } from '../App';
import { Bar, ChartOptions} from 'react-chartjs-2';
import moment from 'moment'
import CommitteeList from './CommitteeList';

const Chart = ({ candidateID, totalsData }) => {
    const [chartLabels, setChartLabels] = useState(undefined)
    const [chartData, setChartData] = useState(undefined)
    const [committeeList, setCommitteeList] = useState(undefined)
    

    useEffect(() => {
        const getInfo = async () => {
            let yearLabels = []
            let contributionAmounts = []
            totalsData.forEach((_cycleResult) => {
                const _yearsLabel = (
                    moment(_cycleResult.coverage_start_date).format('yyyy') + ' - ' +
                    moment(_cycleResult.coverage_end_date).format('yyyy')
                )
                yearLabels.push(_yearsLabel)
                contributionAmounts.push(_cycleResult['contributions'])
            });
            setChartData(contributionAmounts.reverse())
            setChartLabels(yearLabels.reverse())
        }

          getInfo()
    }, [candidateID, totalsData]);

    const _chartData = {
        labels: chartLabels,
        datasets: [{
            label: 'Dollars Raised',
            data: chartData,
            backgroundColor: 'blue'
        }],
    }
    const options = {
        scales: {
            x:{
                grid:{
                 display:false
                },
                ticks: {
                    maxTicksLimit: 5
                }
               },
            y:{
                grid:{
                 display:true,
                 color: 'black'
                },
                ticks: {
                    callback: function(value, index, values) {
                        return index % 2 === 0 ? '$' + (value/1000000) + 'M' : '';
                    },
                    color: 'black',
                }
               },
               
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            title: {
                display: false
            }
        }
      };
    return (
        <div className="chart-container">
            <Bar data={_chartData} options={options}/>
        </div>
    )
}

export default Chart
