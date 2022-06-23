import { useState, useEffect } from "react";
import "./HomeAuth.css"
import axios from "axios"; // Fetch token URI & journal content [array]
import JournalCard from "../components/JournalCard";

const HomeAuth = () => {
    const [journals, setJournals] = useState([
        {externalUrl:"https://ipfs.moralis.io:2053/ipfs/QmVHWhgphg7EL3RNd1X1ZsmqtLMzJgzjxLtLdqac6uts22",
        owner_of: "xxxx"}
    ]);
    const [journalsContent, setJournalsContent] = useState();

    // Get journal content
    const fetchJournalsContent = async () => {
        const limit5 = journals?.slice(0, 5); // Only get the 5 most recent journals
        let contentJournal = []; // Temporary array that then goes into the journals[] state array

        if (limit5) {
            limit5.map(async (blog) => {
                if (blog) {
                    const { externalUrl, owner_of } = blog;
                    const res = await axios.get(externalUrl); // fetch json for the post from the ipfs link for the journal (in state)
                    const text = res.data.text.toString(); // create response params based on returned json
                    const title = res.data.title;
                    contentJournal.push({ title, text, owner_of, externalUrl }); // Add the parsed json data to the temp state variable as an item in array
                }
            });
        }

        setJournalsContent(contentJournal); // Move temporary (split) data into main state
    };

    // Get journal/blog data into frontend
    useEffect(() => {
        if (journals && !journalsContent) {
            fetchJournalsContent();
        }
    }, [])

    return (
        <div className="homeAuth_container">
            <div className="homeAuth_header">Recommended Journals</div>
            <div className="homeAuth_journals">
                {journalsContent &&
                    journalsContent.map((journal, i) => {
                        const { title, text, owner_of, externalUrl } = journal;
                        return (
                            <Journalcard
                                key={i}
                                title={title}
                                text={text}
                                ownerOf={owner_of}
                                externalUrl={externalUrl}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default HomeAuth;