import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { auth, githubProvider, signInWithPopup } from '../firebase';
import { GithubAuthProvider } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState(null);
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);

      // GitHub Access Token
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userData = await fetchGitHubUserData(token);
      setData(userData);
      console.log(userData);
      // User Information
      const tempUser = result.user;
      setUser(tempUser);
    } catch (error) {
      console.error('GitHub Login Failed:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout Failed:', error.message);
    }
  };

  // Function to fetch additional GitHub user data
  const fetchGitHubUserData = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    try {
      // Fetch user profile
      const userResponse = await fetch('https://api.github.com/user', {
        headers,
      });
      const user = await userResponse.json();

      // Fetch user repositories
      const reposResponse = await fetch(user.repos_url, { headers });
      const repos = await reposResponse.json();

      // Calculate total stars and contributions
      const stars = repos.reduce(
        (total, repo) => total + repo.stargazers_count,
        0
      );

      return {
        username: user.login,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        total_stars: stars,
        repos: repos.map((repo) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
        })),
      };
    } catch (error) {
      console.error('Error fetching GitHub data:', error.message);
      return null;
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      {!user ? (
        <button
          className="p-4 py-2 rounded-md bg-black text-white hover:shadow-md hover:bg-gray-800 flex items-center gap-2 transition duration-200"
          aria-label="Login with GitHub"
          onClick={handleGithubLogin}
        >
          <FaGithub className="text-xl" />
          GitHub Login
        </button>
      ) : (
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-20 h-20 rounded-full"
          />
          <h1 className="text-2xl font-semibold">{user.displayName}</h1>
          <p className="text-gray-500">{user.email}</p>
          <button
            onClick={handleLogout}
            className="p-4 py-2 rounded-md bg-red-500 text-white hover:shadow-md hover:bg-red-600 flex items-center gap-2 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
