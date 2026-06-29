import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Rond Z-embleem als favicon (staalblauw met crème Z). */
export default function Icon() {
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
          borderRadius: "50%",
          color: "#EAE5D8",
          fontSize: 40,
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
