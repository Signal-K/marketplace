import {useMoralisDapp} from "providers/MoralisDappProvider/MoralisDappProvider"
import {Avatar } from "antd"
import glStyles from "components/gstyles"
import Blockie from "components/Blockie"

const Feed = () => {
    const [setSelectedCategory] = useMoralisDapp();
    let result = null;
    if (selectedCategory["category"] === "default") {
        result = (
            <div className="col-lg-9">
                <h3>Choose a Category</h3>
            </div>
        );
    } else {
        result = (
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
            </div>
        )
    }

        return result;
}

export default Feed