import Select from 'react-select';
import { useState, useEffect } from 'react';

const Picker = ({ onSelect }) => {
    const [senators, setSens] = useState([])
    const [pickerItems, setPickerItems] = useState([])
    const pickerStyles = {
          container: (provided) => ({
            ...provided,
            'backgroundColor': 'transparent',
            'border': 'none'
          }),
          control: (provided) => ({
            ...provided,
            'display': 'flex',
            'backgroundColor': 'transparent',
            'border': 'none'
          }),
          
          indicatorSeparator: (provided) => ({
            ...provided,
            'display': 'none'
          }),
          placeholder: (provided) => ({
            ...provided,
            'color': 'white',
          }),
          input: (provided) => ({
            ...provided,
            'color': 'white'
          }),
          singleValue: (provided) => ({
            ...provided,
            'color': 'white',
            'fontWeight': '700'
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            'color': 'white'  
          })
    }

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
        <div className={"pickerContainer"}>
            {senators.length > 0 && <Select
            className="picker"
            styles={pickerStyles}
            options={pickerItems}
            onChange={onSelect}
            />}
        </div>
    )
}

export default Picker
