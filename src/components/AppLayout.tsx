export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen w-screen items-center justify-center overflow-x-hidden sm:overflow-y-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
    {children}
  </div>
);
