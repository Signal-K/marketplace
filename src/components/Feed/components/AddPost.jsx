import { useStat } from "react";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function onSubmit(e){
        e.preventDefault();
        console.log(title, content);
    }

    return (
        <form onSubmit={onSubmit}>
        <div classname="row">
            <div className="form-group">
                <input
                type="text"
                className="mb-2 mt-2 form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                type='text'
                className="mb-2 form-control"
                placeholder="Post away"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-dark ">Submit</button>
        </div>
    </form>
    )
}