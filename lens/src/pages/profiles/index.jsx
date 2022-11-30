import { useEffect, useState } from "react";
import { promises } from "stream";
import { client, exploreProfiles } from '../../api/api';
import ProfileCard from "../../components/ProfileCard";

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchProfiles();
    }, []);

    async function fetchProfiles() {
        try {
            // Fetch profiles from Lens API
            let response = await client.query({ query: exploreProfiles });
            let profileData = await Promise.all( // Loop over profiles & format ipfs links
                response.data.exploreProfiles.items.map(async (profileInfo) => {
                    let profile = { ...profileInfo };
                    let picture = profile.picture;

                    if (picture && picture.original && picture.original.url) {
                        if (picture.original.url.startsWith("ipfs://")) {
                            let result = picture.original.url.substring(
                                7,
                                picture.original.url.length
                            );
                            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
                        } else {
                            profile.avatarUrl = picture.original.url;
                        }
                    }
                    return profile;
                })
            );

            setProfiles(profileData); // Update local state with profiles array
        } catch (err) {
            console.log({ err });
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl mb-6 font-bold">Explore profiles</h1>
            </div>
        </div>
    )
}