module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Permet de basculer entre mode clair et sombre en utilisant la classe 'dark'
  theme: {
    extend: {
      colors: {
        // Couleurs de base
        primary: {
          50: '#FDF7F3',  // Très pâle
          100: '#F9EDE5', // Très clair
          200: '#F3DACB', // Clair
          300: '#E9C2A5', // Moyen clair
          400: '#DFA97F', // Moyen
          500: '#C18C5C', // Couleur par défaut (or pâle pour une touche de luxe)
          600: '#B47D50', // Foncé
          700: '#8D6140', // Plus foncé
          800: '#684730', // Très foncé
          900: '#402B1F', // Noirâtre
        },
        secondary: {
          DEFAULT: '#4A4A4A', // Gris foncé élégant pour la lisibilité
          light: '#E5E5E5', // Gris clair pour les fonds
        },
        neutral: {
          50: '#FFFFFF',  // Pur blanc
          100: '#F8F8F8', // Gris clair pour le fond en mode clair
          200: '#E8E8E8', // Gris doux pour les bordures et arrière-plans en mode clair
          300: '#D8D8D8', // Gris plus marqué
          400: '#B8B8B8', // Moyen clair
          500: '#5A5A5A', // Gris intermédiaire pour le texte
          600: '#3A3A3A', // Gris foncé
          700: '#2B2B2B', // Gris très foncé pour le texte en mode sombre
          800: '#1B1B1B', // Presque noir
          900: '#0A0A0A', // Noir profond
        },
        black: {
          50: '#E6E6E6', // Noir très clair
          100: '#CCCCCC', // Clair
          200: '#999999', // Moyen clair
          300: '#666666', // Moyen
          400: '#333333', // Sombre
          500: '#000000', // Pur noir
        },
        white: {
          50: '#FFFFFF', // Pur blanc
          100: '#FEFEFE', // Très clair
          200: '#FCFCFC', // Clair
          300: '#FAFAFA', // Moyen clair
          400: '#F7F7F7', // Moyen
          500: '#F5F5F5', // Sombre
        },
        danger: '#D14D4D', // Rouge subtil pour les alertes
        success: '#77B85B', // Vert doux pour les succès
        info: '#4F77A1', // Bleu élégant pour les infos
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xl': '1.5rem', 
        '2xl': '2rem', 
        '3xl': '2.5rem', 
        '4xl': '3rem',
      },
      boxShadow: {
        luxe: '0 10px 30px rgba(0, 0, 0, 0.1)', // Ombres douces et subtiles
      },
    },
  },
  plugins: [],
};
