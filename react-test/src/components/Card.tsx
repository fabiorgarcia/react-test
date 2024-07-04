import classes from "./Card.module.css"

function Card({clone_url, name}: {clone_url:any, name:any}) {
    return (
        <a href={clone_url} target="_blank" className={classes.repos_contain}>
            {name}
        </a>
    )
}

export default Card;