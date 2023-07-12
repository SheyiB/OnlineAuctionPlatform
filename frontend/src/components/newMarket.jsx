const NewMarket = () => {
    return (
        <div>
            <form>
                <label> Name </label>
                <input type="text" /><br/>

                <label> Image </label>
                <input type="file" /><br/>

                <label> Details </label>
                <input type="text" /><br/>

                <button type="submit"> Create </button>
            </form>
        </div>
    )
}

export default NewMarket