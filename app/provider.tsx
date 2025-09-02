import AuthProvider from "@/lib/provider/auth-provider";
import QueryProvider from "@/lib/provider/query-provider";
import ThemeProvider from "@/lib/provider/theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider dehydratedState={null}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
