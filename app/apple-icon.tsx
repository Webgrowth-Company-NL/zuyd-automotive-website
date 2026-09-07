import { ImageResponse } from "next/og";

// Apple gebruikt dit icoon als iemand de site op zijn beginscherm zet. Zonder
// dit bestand pakt iOS een schermafdruk van de pagina, wat er rommelig uitziet.
// Vierkant en zonder eigen ronding: iOS maakt er zelf een afgerond vlak van.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5C7382",
          color: "#EAE5D8",
          fontSize: 116,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Z
      </div>
    ),
    { ...size },
  );
}
