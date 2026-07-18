/**
 * Renders the real image when `src` is set, otherwise a labeled
 * placeholder slot so the layout reads correctly before assets arrive.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  style,
}: {
  src: string | null;
  alt: string;
  label: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        style={{ objectFit: "cover", display: "block", ...style }}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        background:
          "repeating-linear-gradient(45deg, #0E0E0E 0px, #0E0E0E 18px, #101010 18px, #101010 36px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span
        style={{
          color: "#3D3D3D",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          border: "1px dashed #2A2A2A",
          borderRadius: 6,
          padding: "10px 16px",
        }}
      >
        {label}
      </span>
    </div>
  );
}
