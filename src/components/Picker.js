import Select from 'react-select';
import { useState, useEffect } from 'react';

const Picker = ({ onSelect }) => {
    const [senators, setSens] = useState([])
    const [pickerItems, setPickerItems] = useState([])

    useEffect(() => {
        const getSens = async () => {
          const senators = await fetchSenators();
          setSens(senators)
        }
    
        getSens()
      }, []);
    
      const fetchSenators = async () => {
        const res = await fetch('https://www.govtrack.us/api/v2/role?current=true&role_type=senator')
        const data = await res.json()
        const objects = data['objects'];
        const pickerItems = objects.map((dataItem) => {
          return {value: dataItem, label: dataItem.person.name}
        });
        setPickerItems(pickerItems);
        return objects
      }

    return (
        <div>
            {senators.length > 0 && <Select
            options={pickerItems}
            onChange={onSelect}
            />}
        </div>
    )
}

export default Picker
