import './marketcomponent.css'
import {Link} from 'react-router-dom'


const MarketComponent = ({ name, id, details, image}) => {
  const buttonStyle = {
    backgroundColor: 'black', // Set the background color to black
    color: 'white', // Set text color for better visibility
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
  };

  return (
      <div className="market-container">
        <h3 className="market-name">{name== null? "Market Name" : name}</h3>
        <img className="market-image" src={image} alt="Market" />
        <p className="market-details">{details== null ? "Market Details" : details} </p>
        <div className="button-container">
          <button className="market-button" style={buttonStyle}> <Link to={`/dashboard/${id}`} > View </Link> </button>
        
          <button className="market-button" style={buttonStyle}><Link to={`/market/${id}`}>Live </Link> </button>
        </div>
      </div>
    );
  };
  
  export default MarketComponent;
  