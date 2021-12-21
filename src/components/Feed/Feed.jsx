import {useMoralisDapp} from "providers/MoralisDappProvider/MoralisDappProvider"
import { useState } from "react"
import Posts from "./components/Posts"
import Reputation from "components/Reputation"
import {Avatar, Button } from "antd"
import glStyles from "components/gstyles"
import Blockie from "components/Blockie"
import AddPost from "./components/AddPost"

const Feed = () => {
    const [setSelectedCategory] = useMoralisDapp();
    const [showAddPost, setShowAddPost] = useState(false);

    let result = null;

    function toggleShowAddPost() {
        setShowAddPost(!showAddPost);
    }

    if (selectedCategory["category"] === "default") {
        result = (
            <div className="col-lg-9">
                <h3>Choose a Category</h3>
            </div>
        );
    } else {
        result = (
        <div className="col-lg-9">
            <div
                style={{
                    ...glStyles.card,
                    padding: "10px 13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Avatar src={<Blockie currentWallet />} />
                <h4> Your reputation in {selectedCategory["category"]} is <Reputation /></h4>
                <button shape="round" onClick={toggleShowAddPost}>
                    Post
                </button>
            </div> 
            {showAddPost ? <AddPost/>:""} {/* If true, show AddPost component, otherwise show nothing*/}
            <Posts />
        </div>
        )
    }

        return result;
}

export default Feed