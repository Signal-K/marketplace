import { useMoralisQuery } from "react-moralis";

const Main = () => {
    const queryCategories = useMoralisQuery("Categories");
    const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"])); // Stringify these categories' data in JSON/parsed format so we can represent it in the DOM/frontend

    console.log(fetchedCategories);
    return (
        <div className="container">
            <h3>This is main</h3>
            <div className="row">
                <div className="col-lg-3">
                    This is for Categories
                </div>
                <div className="col-lg-9">
                    This is for the Feed
                </div>
            </div>
        </div>
    )
}

export default Main