import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"
import { useMoralisQuery } from "react-moralis"
import Post from "./Post"


const Posts = () => {
    const { selectedCategory } = useMoralisDapp();
    const queryPost = useMoralisQuery(
        "Posts",
        (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
        [selectedCategory],
        { live: true } // Run this continuously and update the content when new content comes in
    );

    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])).reverse(); // Reverse the object so the newest objects (posts) come to the top first
    const havePosts = fetchedPosts.length > 0 ? true : false; // Check if there are any posts, if there are the length is greater than 0 and `havePosts` is true, setting postResult rather than emptyResult

    const emptyResult = ( // When there's no posts in the selectedCategory
        <div>
            <h3>Be the first to post here for</h3>
            <h3>{selectedCategory["category"]}</h3>
        </div>
    );

    const postResult = (
        <div>
            {fetchedPosts.map((post) => (
                <Post key={post["postId"]} post={post} />
            ))}
        </div>
    );

    return havePosts ? postResult : emptyResult;
}

export default Posts