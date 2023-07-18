import './marketcomponent.css'

const MarketComponent = ({ name, id, details, image }) => {
    return (
      <div className="market-container">
        <h3 className="market-name">{name== null? "Market Name" : name}</h3>
        <img className="market-image" src={image} alt="Market" />
        <p className="market-details">{details== null ? "Market Details" : details}</p>
        <div className="button-container">
          <button className="market-button">View</button>
          <button className="market-button">Edit</button>
          <button className="market-button">Delete</button>
          <button className="market-button">Live</button>
        </div>
      </div>
    );
  };
  
  export default MarketComponent;
  