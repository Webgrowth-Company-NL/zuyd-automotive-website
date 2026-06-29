import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zuyd Automotive — Betrouwbare occasions in Breda";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F6F2",
          padding: 80,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "#5C7382",
              color: "#EAE5D8",
              fontSize: 42,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2, color: "#27333B" }}>
              ZUYD
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: 7, color: "#5C7382" }}>
              AUTOMOTIVE
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#27333B",
              lineHeight: 1.05,
              maxWidth: 900,
              letterSpacing: -1,
            }}
          >
            Betrouwbare occasions in Breda
          </span>
          <span style={{ fontSize: 30, color: "#62707A", marginTop: 20 }}>
            Persoonlijk uitgekozen door Leroy en Max · plan een bezichtiging
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
