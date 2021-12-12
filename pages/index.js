import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cotter from "cotter";
import { useEffect, useState } from "react";
const cotterApiKeyId = process.env.NEXT_PUBLIC_COTTER_API_KEY_ID;

export default function Home() {
    const [clientProjects, setClientProjects] = useState(null);

    // Gets this client's projects when they're logged in
    const getClientProjects = async () => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const resp = await fetch("/api/projects", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setClientProjects(await resp.json());
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Shows the Cotter Login form and sets Access Token when authenticated
    useEffect(() => {
        const cotter = new Cotter(cotterApiKeyId);
        cotter
            .signInWithOTP()
            .showEmailForm()
            .then(payload => {
                localStorage.setItem("ACCESS_TOKEN", payload.oauth_token.access_token);
                setIsLoggedIn(true);
                getClientProjects();
            })
            .catch(err => console.log(err));
    }, []);

    // Sets local isLoggedIn variable
    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN") != null) {
            setIsLoggedIn(true);
        }
    }, []);

    // Deletes Access Token and logs user out
    const logOut = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLoggedIn(false);
    };

    // Allow clients to mark a project as complete
    const markProjectComplete = async (e) => {
        const completeProjectId = e.target.value;
        setClientProjects(clientProjects.map(project => {
            if (project.id === completeProjectId) {
                project.complete = true;
            }
            return project
        }));

        const token = localStorage.getItem("ACCESS_TOKEN");
        await fetch("/api/projects/" + completeProjectId, {
            headers: { Authorization: `Bearer ${token}` },
            method: "PUT",
        });
    };

    // Display the client portal page
    return (
        <div className={styles.container}>
            <Head>
                <title>Client Portal</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Your Client Portal</h1>
                {isLoggedIn ? (
                    <div>
                        {clientProjects ? (
                            <div className={styles.grid}>
                                {clientProjects.map(project =>
                                    <div className={styles.card} key={project.id}>
                                        <h3>{project.name}</h3>
                                        <img src={project.project_images[0]} style={{maxWidth: "100%"}} />
                                        <p>Led by {project.project_lead.name}</p>
                                        <p>Due on {project.due_date.split('T')[0]}</p>
                                    </div>
                                )}
                            </div>
                        ) : (<p>You currently have no projects attached to this account.</p>)}
                        <p style={{textAlign: "center", cursor: "pointer"}} onClick={logOut}>Log Out</p>
                    </div>
                ): (<p>Log in to view your projects.</p>)}
                <div id="cotter-form-container" style={{ width: 300, height: 200 }} />
            </main>
        </div>
    )
}
