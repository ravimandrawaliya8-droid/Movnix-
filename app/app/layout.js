export const metadata = {
  title: "Movnix",
  description: "Watch Movies Online"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
