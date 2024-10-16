import './globals.css';

export const metadata = {
  title: 'Pricing Table',
  description: 'Your pricing table description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
