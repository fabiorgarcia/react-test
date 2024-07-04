import Search from "../components/Search"
import { useState } from "react"
import { UserProps } from "../types/user";
import User from "../components/User";
import Error from "../components/Error";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async(userName: string) => {
        setError(false);
        setUser(null);
        const res = await fetch(`https://api.github.com/users/${userName}`, 
            {
                headers: {
                'Content-Type': 'application/json',
                }

            });
        const data = await res.json();

        if (res.status === 404) {
            setError(true);
            return;
        }

        const { name, avatar_url, login, email, location, html_url, followers, following, repos_url } = data;
        const userData: UserProps = {
            name,
            avatar_url, 
            login,
            email, 
            location,
            html_url, 
            followers, 
            following,
            repos_url,
        };
        setUser(userData);
    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {error && <Error />}
            <footer>
                <a href="/react-test">Home</a>
                <i>Created By Fábio Garcia</i>
            </footer>
        </div>
    )
}

export default Home