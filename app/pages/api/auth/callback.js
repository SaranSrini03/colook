// /pages/api/auth/callback.js
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    const response = await axios.post(tokenUrl, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token } = response.data;
    // Store tokens in a secure way (e.g., session, database)
    // Redirect the user or send a response
    res.redirect("/"); // Redirect to your main page or wherever you need
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Error fetching access token" });
  }
}
