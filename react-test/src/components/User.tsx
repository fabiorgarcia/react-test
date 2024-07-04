import { FaUser } from "react-icons/fa6";
import { MdAlternateEmail, MdLocationPin } from "react-icons/md";
import { UserProps } from "../types/user";
import classes from "./User.module.css";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const User = ({name, avatar_url, login, email, location, html_url, followers, following}: UserProps) => {

    const [repos, setRepos] = useState<any[]>([])
    const [showRepos, setShowRepos] = useState(false);

    useEffect(() => {
        const buscarRepositorios = async() => {
            const response = await fetch(`https://api.github.com/users/${login}/repos`, 
            {
                headers: {
                'Content-Type': 'application/json',
                }

            })
            const data = await response.json();
            setRepos(data);
        }
        buscarRepositorios();
    }, []);

    const showRepositories = () => {

        if (showRepos == false ) {
            setShowRepos(true);
        } else {
            setShowRepos(false);
        }
    }


    return (
        <div className={classes.listuser}>
            <div className={classes.user}>
                <img src={avatar_url} alt={login}></img>
                <h2>{login}</h2>
                <div className={classes.carct}><FaUser /> {name}</div>
                {email && (
                    <p className={classes.url}>
                    <MdAlternateEmail />{email}
                </p>
                )}
                {location && (
                    <p className={classes.carct}>
                    <MdLocationPin /> <span>{location}</span>
                </p>
                )}
                <p className={classes.url}>
                    <a href={html_url} target="_blank" title="Link do perfil">{html_url}</a>
                </p>
                <div className={classes.stats}>
                    <div>
                        Seguidores:
                        <p className={classes.number}>{followers}</p>
                    </div>
                    <div>
                        Seguindo:
                        <p className={classes.number}>{following}</p>
                    </div>
                </div>

                <hr />
                <p onClick={showRepositories} className={classes.list_repos}>
                    Repositórios
                    {!showRepos && (<IoIosArrowDown />)}
                    {showRepos && (<IoIosArrowUp />)}
                </p>
                
                {showRepos && (
                    
                    <div className={classes.repos}>
                    { repos.map((repo, index) => {
                        return (
                            <Card key={index} clone_url={repo.clone_url} name={repo.name} />
                        )}
                    )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default User;