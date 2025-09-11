function Header(props) {
  return (
    <header>
      <h1>{props.titolo}</h1>
      <p>{props.sottotitolo}</p>
    </header>
  );
}

export default Header;
