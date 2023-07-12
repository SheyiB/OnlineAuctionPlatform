const MarketComponent = ({name, id, details, image}) =>{
    return(
        <div>
            <span>
                {name}
            </span>
            <span>
                <img src="image"/>
            </span>
            <span>
                {details}
            </span>

            <button> View </button>
            <button> Edit </button>
            <button> Delete </button>
            <button> Live </button>
        </div>
    )

}

export default MarketComponent