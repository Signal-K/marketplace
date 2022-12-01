import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getPublications, getProfile } from '../../api/api';
import Image from "next/image";
import PublicationCard from "../../components/PublicationCard";
import CustomImage from '../../components/CustomImage';

export default function Profile() {
    // Create initial state to hold user profile & array of their posts
    const [profile, setProfile] = useState(); // Singular profile (so no need for array)
    const [publications, setPublications] = useState([]);
    const router = useRouter(); // Use router to get lens handle from route param
    const { handle } = router.query();

    useEffect(() => {
        if (handle) {
            fetchProfiles();
        }
    }, [handle]);

    async function fetchProfiles() {
        try {
            const returnedProfile = await client.query({ // Fetch user profile using their handle
                query: getProfile,
                variables: { handle },
            });
            const profileData = { ...returnedProfile.data.profile }
            const picture = profileData.picture; // Format user picture
            if (picture && picture.original && picture.original.url ) {
                if (picture.original.url.startsWith("ipfs://")) {
                    let result = picture.original.url.substring(
                        7,
                        picture.original.url.length
                    );
                    profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
                } else {
                    profileData.avatarUrl = profileData.picture.original.url;
                }
            }
            setProfile(profileData);
            const pubs = await client.query({ // Fetch user publications from the lens api and set them in state
                query: getPublications,
                variables: {
                    id: profileData.id,
                    limit: 50,
                },
            });
            setPublications(pubs.data.publications.items);
        } catch (err) {
            console.log("error fetching profile... ", err);
        }
    }
    console.log(profile);

    if (!profile) return null;

    return (
        <div className="min-h-screen min-w-screen py-20bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col justify-center items-center">
                <Image
                    width={256}
                    height={170}
                    alt={handle}
                    src={profile.avatarUrl}
                    className="rounded-full"
                />
                <p className="text-4xl mt-8 mb-8">{profile.handle}</p>
                <p className="text-center text-xl font-bold mt-2 mb-2 w-1/2">
                    {profile.bio}
                </p>
                <div className="mx-auto max-w-3xl rounded-xl border-[1px] border-gray-500 mt-10">
                    {publications.map((pub) => (
                        <PublicationCard
                            key={pub.id}
                            content={pub.metadata.content}
                            authorImage={profile.picture?.original}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}