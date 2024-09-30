import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/screens/home";
import Posts from "@/screens/posts";
import PostDetail from "@/screens/posts/detail";
import UserDetail from "@/screens/users/detail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold">My Post App</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users" element={<div>Users</div>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
