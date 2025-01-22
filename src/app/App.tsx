import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { AuthInit } from "./modules/auth";
import { ThemeModeProvider } from "../_metronic/partials";

const App = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole"); // Retrieve the role from storage
    const storedOption = localStorage.getItem("selectedOption"); // Retrieve the selected option
    if (storedRole) setUserRole(storedRole);
    if (storedOption) setSelectedOption(storedOption);
  }, []);

  useEffect(() => {
    if (userRole === "user" && selectedOption === "Water") {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "z0ob7MZvhz2HBp0W4lqWw";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userRole, selectedOption]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
