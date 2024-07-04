import { BsSearch } from "react-icons/bs"
import { useState, KeyboardEvent, useEffect } from "react"
import classes from "./Search.module.css"
import Resumecard from "./Resumecard"


type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
}

const Search = ({loadUser}: SearchProps) => {

    const [repos, setRepos] = useState<any[]>([])
    const [showRepos, setShowRepos] = useState(true);

    useEffect(() => {
        const buscarRepositorios = async() => {
            const response = await fetch(`https://api.github.com/search/repositories?q=followers:>=10000`, 
                {
                    headers: {
                    'Content-Type': 'application/json',
                    }
    
                })
            const data = await response.json();
            setRepos(data.items);
        }
        buscarRepositorios();
    }, []);


    const [userName, setUserName] = useState("");
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            loadUser(userName);
            setShowRepos(false);
        }
    }

    const calluser = (x: any) => {
        loadUser(x);
        setShowRepos(false);
    }


    return (
        <div className={classes.search}>
            <h3>Busque pelo usuário:</h3>
            <div className={classes.search_contain}>
                <input 
                  type="text" 
                  placeholder="Digite o usuário" 
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={() => loadUser(userName)}>
                    <BsSearch />
                </button>
            </div>


             {showRepos && (
                <div className={classes.repos}>
                    {repos && (
                        <div>
                            <p>Repositórios Recentes</p>
                            <div className={classes.reposlist}>
                                { repos.map((repo, index) => {
                                    return (
                                        <div key={index} onClick={() => calluser(repo.name)} ><Resumecard key={index} name={repo.name} /></div>
                                    )}
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            
        </div>
    )
}

export default Search