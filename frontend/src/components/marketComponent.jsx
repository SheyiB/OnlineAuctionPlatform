import './marketcomponent.css'
import {Link} from 'react-router-dom'

const apiUrl = import.meta.env.VITE_APP_API_URL;


const MarketComponent = ({ name, id, details, image}) => {

  return (
      <div className="market-container">
        <h3 className="market-name">{name== null? "Market Name" : name}</h3>
        <img className="market-image" src={image} alt="Market" />
        <p className="market-details">{details== null ? "Market Details" : details} <Link to={`/market/${id}`}>Live </Link> </p>
        <div className="button-container">
          <button className="market-button" > <Link to={`/dashboard/${id}`} > View </Link> </button>
          <button className="market-button">Edit</button>
          <button className="market-button">Delete</button>
          <button className="market-button">  Live </button>
        </div>
      </div>
    );
  };
  
  export default MarketComponent;
  