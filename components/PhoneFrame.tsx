export function PhoneFrame({
  width,
  height,
  style,
  screenStyle,
  className,
  children,
}: {
  width: number;
  height: number;
  style?: React.CSSProperties;
  screenStyle?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: "#0E0E0E",
        border: "1px solid #2A2A2A",
        borderRadius: width * 0.14,
        padding: "12px 10px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 5px #050505",
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.33,
          height: 16,
          background: "#050505",
          borderRadius: 8,
          zIndex: 1,
        }}
      />
      <div
        style={{
          height: "100%",
          borderRadius: width * 0.09,
          background: "#0A0A0A",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "30px 12px 12px",
          gap: 10,
          ...screenStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function BookNowButton({
  label = "BOOK NOW",
  fontSize = 11,
}: {
  label?: string;
  fontSize?: number;
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        background: "#E11414",
        borderRadius: 6,
        textAlign: "center",
        padding: 10,
        fontSize,
        fontWeight: 700,
        letterSpacing: "0.1em",
      }}
    >
      {label}
    </div>
  );
}
