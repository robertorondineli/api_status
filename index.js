const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const githubUsername = 'seu-usuario-github';

// Rota para obter informações básicas do perfil
app.get('/status', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${githubUsername}`);
        const { login, name, public_repos, followers, following, html_url } = response.data;

        res.json({
            username: login,
            name: name,
            public_repos: public_repos,
            followers: followers,
            following: following,
            profile_url: html_url
        });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível obter informações do GitHub' });
    }
});

// Rota para obter informações sobre os repositórios
app.get('/repos', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
        const repos = response.data.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
            language: repo.language
        }));

        res.json(repos);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível obter informações dos repositórios do GitHub' });
    }
});

app.listen(port, () => {
    console.log(`API de status do GitHub rodando em http://localhost:${port}`);
});
