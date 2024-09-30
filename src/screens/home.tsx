import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/posts" unstable_viewTransition>
        Posts
      </Link>
    </div>
  );
};

export default Home;
