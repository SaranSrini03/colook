// /pages/api/login.js
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req, res) {
  const redirect_uri = process.env.REDIRECT_URI; // Ensure this is set in your .env file
  const client_id = process.env.SPOTIFY_CLIENT_ID; // Your Spotify Client ID
  const scope = "user-read-private user-read-email"; // Set your desired scopes here

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;

  res.redirect(authUrl);
}
