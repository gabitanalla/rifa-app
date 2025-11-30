"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [participants, setParticipants] = useState("");
  const [prices, setPrices] = useState("0");
  const [responseData, setResponseData] = useState({ winners: [] });

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevents default form submission
    const beUrl = process.env.HOST || "http://localhost";
    console.log("Backend URL:", beUrl);
    const response = await fetch( beUrl + ":8080/test/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participants: participants,
        prices: prices,
      }),
    });
    const data = await response.json();
    setResponseData(data);
  }
  return (
    <div
      className="main-div"
    >
      <img src="./logo-murgala.png" alt="Rifa MurgaLa" width="25%" />
      <div className="center-div">
        {responseData.winners.length === 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                id="textarea"
                placeholder="Ingresar Participantes"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="form-textarea"
              />
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <label>
                  Cantidad de Ganadores:
                  <input
                    id="input"
                    type="number"
                    min={0}
                    max={10}
                    value={prices}
                    onChange={(e) => setPrices(e.target.value)}
                    className="winners-input"
                  />
                </label>
                <button
                  type="submit"
                  className="submit-button"
                >
                  Sortear
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="winners-box">
            <h2 >Ganadores:</h2>
            {responseData.winners.map((winner, index) => (
              <p key={index}>{winner}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
