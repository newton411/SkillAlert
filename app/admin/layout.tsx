/**
 * Admin Layout
 * Marks all routes under /admin as dynamic
 */

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
