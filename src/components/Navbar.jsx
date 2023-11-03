import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="" alt="LOGO" className="logoHMO" />
      <Link to="/Home">Home</Link>
      <div>
        <Link to="/Movies">Movies</Link>
        <Link to="/TvShows">TV Shows</Link>
        <Link to="User">User</Link>
      </div>
    </nav>
  );
};

export default Navbar;
