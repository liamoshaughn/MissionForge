import { useState, useEffect } from 'react';

const Autocomplete = ({ data, select }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(data);
  const [suggestions, setSuggestions] = useState([]);
  const [hover, setHover] = useState();

  useEffect(() => {
    // If you want to update options when the data prop changes
    setOptions(data);
  }, [data]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const newSuggestions = options.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      
    );

    setSuggestions(newSuggestions);
  };


  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    select(suggestion);
    setSuggestions([]);
  };

  return (
    <div style={{width:"fit-content", marginTop:"30px", marginBottom:"30px"}}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      <div  style={{background:"grey", paddingLeft:0}}>
        {suggestions.map((suggestion, index) => (
          <div  key={index} onClick={() => handleSuggestionClick(suggestion) } onMouseEnter={()=>setHover(index)} onMouseLeave={()=>setHover()} style={{background: hover === index && "blue", height:"40px", cursor:"pointer", display:"flex", alignItems:"center"}}>
            {suggestion.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
