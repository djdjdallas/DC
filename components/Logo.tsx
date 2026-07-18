export default function Logo({ size = 30 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-mark.png"
      alt=""
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}
