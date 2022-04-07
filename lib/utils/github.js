const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  const res = fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  });
  const { access_token } = res.json();
  return access_token;
};

const getGithubProfile = (token) => {
  const profileResp = fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { avatar_url, login, email } = profileResp.json();
  return { avatar_url, login, email };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
