import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const features = [
    {
      icon: Calendar,
      title: t("featureSection.feature1.title"),
      description: t("featureSection.feature1.description"),
    },
    {
      icon: Users,
      title: t("featureSection.feature2.title"),
      description: t("featureSection.feature2.description"),
    },
    {
      icon: Star,
      title: t("featureSection.feature3.title"),
      description: t("featureSection.feature3.description"),
    },
  ];

  const stats = [
    { number: "10K+", label: t("stats.events") },
    { number: "50K+", label: t("stats.users") },
    { number: "100+", label: t("stats.cities") },
    { number: "4.9★", label: t("stats.rating") },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navbar */}
      <nav className="relative z-20 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {t("brand")}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t("brand")}
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t("nav.about")}
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t("nav.contact")}
              </a>
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t("nav.login")}
              </button>
              <div className="relative">
                {/* Language Dropdown Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-lg"
                >
                  <Globe className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-medium">
                    {selectedLanguage === "en" ? "English" : "العربية"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Content */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden">
                      <button
                        onClick={() => changeLanguage("en")}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/20 transition-all duration-300 ${
                          selectedLanguage === "en"
                            ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-2 border-purple-400"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">English</span>
                        {selectedLanguage === "en" && (
                          <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                        )}
                      </button>
                      <button
                        onClick={() => changeLanguage("ar")}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/20 transition-all duration-300 ${
                          selectedLanguage === "ar"
                            ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-2 border-purple-400"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">العربية</span>
                        {selectedLanguage === "ar" && (
                          <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-2xl mt-2 p-4 border border-white/20">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors duration-300 py-2"
                >
                  {t("nav.features")}
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 py-2"
                >
                  {t("nav.about")}
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 py-2"
                >
                  {t("nav.contact")}
                </a>
                <div className="relative">
                  {/* Language Dropdown Button */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-lg"
                  >
                    <Globe className="w-4 h-4 text-purple-300" />
                    <span className="text-sm font-medium">
                      {selectedLanguage === "en" ? "English" : "العربية"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                      />

                      {/* Dropdown Content */}
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <button
                          onClick={() => changeLanguage("en")}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/20 transition-all duration-300 ${
                            selectedLanguage === "en"
                              ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-2 border-purple-400"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <span className="text-sm font-medium">English</span>
                          {selectedLanguage === "en" && (
                            <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                          )}
                        </button>
                        <button
                          onClick={() => changeLanguage("ar")}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/20 transition-all duration-300 ${
                            selectedLanguage === "ar"
                              ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-2 border-purple-400"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <span className="text-sm font-medium">العربية</span>
                          {selectedLanguage === "ar" && (
                            <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 w-full"
                >
                  {t("nav.login")}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  ✨ {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t("hero.title")}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  {t("hero.amazingEvents")}
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t("hero.getStarted")}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                  {t("hero.watchDemo")}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Space */}
            <img
              src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("featureSection.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("featureSection.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-2xl w-fit mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                {t("cta.create")}
              </button>
              <button
                onClick={handleLogin}
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                {t("cta.signin")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  {t("brand")}
                </span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                {t("footer.tagline")}
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {t("footer.quickLinks")}
              </h4>
              <div className="space-y-2">
                <a
                  href="#features"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("nav.features")}
                </a>
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("footer.about")}
                </a>
                <a
                  href="#contact"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("nav.contact")}
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {" "}
                {t("footer.support")}
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("footer.help")}
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("footer.privacy")}
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {t("footer.terms")}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-300">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
