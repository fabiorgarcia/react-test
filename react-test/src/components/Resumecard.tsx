import classes from "./Resumecard.module.css"

function Resumecard({ name}: {name:any}) {
    return (
        <div className={classes.resumecard}>{name}</div>
    )
}

export default Resumecard;