import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"
import { useMoralisQuery } from "react-moralis"


const Posts = () => {
    const { selectedCategory } = useMoralisDapp();
    const queryPost = useMoralisQuery(
        "Posts",
        (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
        [selectedCategory],
        { live: true } // Run this continuously and update the content when new content comes in
    );

    return (
        <div>

        </div>
    )
}

export default Posts