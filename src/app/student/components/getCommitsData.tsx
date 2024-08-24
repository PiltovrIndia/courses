export default async function getCommitsData() {
  const username = localStorage.getItem("username");
  const apiURL = "https://api.github.com";
  // const headers = {
  //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  //   // Accept: "application/vnd.github.cloak-preview+json",
  // };
  try {
    const repoResp = await fetch(`${apiURL}/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    // const repoResp = await fetch(`${apiURL}/users/${username}/repos`);
    const repos = await repoResp.json();
    console.log(repos);
    const repoNames: any[] = [];
    for (let i = 0; i < repos.length; i++) {
      repoNames.push(repos[i].name);
    }
    let commits: any[] = [];
    for (let i = 0; i < repoNames.length; i++) {
      const commitsResp = await fetch(
        `${apiURL}/repos/${username}/${repoNames[i]}/commits?author=${username}&per_page=100&page=1`
      );
      const repoCommit = await commitsResp.json();
      if (repoCommit.length !== 0) commits.concat(repoCommit);
    }
    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}
