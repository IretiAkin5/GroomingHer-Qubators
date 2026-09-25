const links = [
  ["Onboarding", "/onboarding", "Slice 1"],
  ["Calendar", "/calendar", "Slice 2"],
  ["Symptoms", "/symptoms", "Slice 3"],
  ["Is This Normal?", "/normal", "Slice 4"],
  ["Ask Her", "/ask", "Slice 5"],
  ["Tell My Parent", "/tell", "Slice 6"],
  ["Learn", "/learn", "Slice 7"],
  ["Parent Space", "/parent", "Slice 8"],
];

export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>GroomingHer</h1>
      <p style={{ color: "#8a6b76" }}>Scaffold online (Phase 3). Feature routes land one slice at a time in Phase 4.</p>
      <ul style={{ paddingLeft: 18 }}>
        {links.map(([label, href, tag]) => (
          <li key={href} style={{ margin: "8px 0" }}>
            <a href={href}>{label}</a> <small style={{ color: "#8a6b76" }}>— {tag}</small>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 14, color: "#8a6b76" }}>Educational information only. Not a medical diagnosis.</p>
    </div>
  );
}
