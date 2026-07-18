export default function SectionHeading({
  children,
  size = 32,
  marginBottom = 48,
}: {
  children: React.ReactNode;
  size?: number;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom,
      }}
    >
      <span style={{ flex: 1, height: 1, background: "#6B0A0A" }} />
      <h2
        className="font-bebas"
        style={{
          margin: 0,
          fontSize: size,
          letterSpacing: 2,
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        {children}
      </h2>
      <span style={{ flex: 1, height: 1, background: "#6B0A0A" }} />
    </div>
  );
}
