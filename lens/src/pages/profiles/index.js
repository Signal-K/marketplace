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
            let response = await client.query({ query: exploreProfiles }); // Use query written in api.js to get profile data
            let profileData = await Promise.all( // Loop over profiles & format ipfs links
                response.data.exploreProfiles.items.map(async (profileInfo) => {
                    let profile = { ...profileInfo }; // Store data inside `profiles` and render it
                    let picture = profile.picture; // Format image url to render it in react components

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
                <div className="md:grid flex flex-col md:grid-cols-3 gap-3 md:gap-4">
                    {profiles.map((profile) => {
                        <ProfileCard
                            id={profile.id}
                            key={profile.id}
                            name={profile.name}
                            bio={profile.bio}
                            handle={profile.handle}
                            profileImage={profile.avatarUrl}
                            followers={profile.stats.totalFollowers}
                        />
                    })}
                </div>
            </div>
        </div>
    );
};

export default Profiles;