function Footer(props){
    return(
        <footer>
            <p>Creato da {props.autore} © {new Date().getFullYear()}</p>
        </footer>

    )


}

export default Footer;