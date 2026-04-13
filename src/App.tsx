/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Heart, 
  Baby, 
  BookOpen, 
  Music, 
  Palette, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  Menu, 
  X,
  ShieldCheck,
  Zap,
  Coffee,
  Globe
} from 'lucide-react';

// --- Data ---

const SERVICES = [
  {
    name: "Garde d'enfants à temps plein (Crèche)",
    price: "2500 MAD / mois",
    description: "Prise en charge complète de 8h à 18h, incluant des jeux éducatifs, des siestes surveillées et une socialisation précoce adaptée aux nourrissons et aux tout-petits.",
    icon: <Baby className="w-6 h-6" />,
    category: "Garde"
  },
  {
    name: "Programme préscolaire à mi-temps",
    price: "1800 MAD / mois",
    description: "Sessions matinales stimulantes axées sur le développement cognitif précoce, les arts plastiques et l'apprentissage fondamental pour les enfants de 3 à 5 ans.",
    icon: <BookOpen className="w-6 h-6" />,
    category: "Éducation"
  },
  {
    name: "Club après l'école",
    price: "1200 MAD / mois",
    description: "Activités après l'école amusantes et surveillées offrant un environnement sûr avec aide aux devoirs, peinture créative et jeux éducatifs en intérieur.",
    icon: <Palette className="w-6 h-6" />,
    category: "Activités"
  },
  {
    name: "Baby Gym & Psychomotricité",
    price: "400 MAD / mois",
    description: "Activités physiques et exercices spécialement conçus pour développer la motricité fine et globale, l'équilibre et la coordination dans une salle de jeux sécurisée et rembourrée.",
    icon: <Zap className="w-6 h-6" />,
    category: "Physique"
  },
  {
    name: "Camp de vacances (Centre Aéré)",
    price: "800 MAD / semaine",
    description: "Programmes de vacances à thèmes passionnants pendant les vacances scolaires, remplis d'ateliers créatifs, de contes interactifs et de jeux d'équipe surveillés.",
    icon: <Music className="w-6 h-6" />,
    category: "Saisonnier"
  },
  {
    name: "Cantine & Service de Nutrition",
    price: "600 MAD / mois",
    description: "Déjeuners chauds quotidiens sains, équilibrés et approuvés par des pédiatres, ainsi que des collations l'après-midi préparées fraîchement pour répondre aux besoins nutritionnels des enfants.",
    icon: <Coffee className="w-6 h-6" />,
    category: "Nutrition"
  },
  {
    name: "Initiation aux langues (Anglais & Français)",
    price: "500 MAD / mois",
    description: "Exposition bilingue précoce grâce à des contes hautement interactifs, des chansons animées et des jeux de vocabulaire ludiques animés par des éducateurs linguistiques qualifiés.",
    icon: <Globe className="w-6 h-6" />,
    category: "Langues"
  }
];

const REVIEWS = [
  {
    name: "bendahmane sara",
    rating: 5,
    text: "Dès le premier jour, mon intuition de mère m'a dit que c'était l'endroit idéal pour mon fils. Cela fait plus de deux ans maintenant que tous les deux (Yayo et Agdal Kids) ont grandi, se sont développés et ont mûri, Dieu merci. Un immense merci à Mme Meryem, qui veille toujours à ce que nos enfants soient bien soignés et traités, ainsi qu'à Hiba et à toute l'équipe pour leurs efforts quotidiens."
  },
  {
    name: "Chaimae amhouche",
    rating: 5,
    text: "Nous sommes très heureux de la garderie ! L'équipe est professionnelle, attentionnée et toujours à l'écoute. Les locaux sont propres, sûrs et accueillants. Je pars rassurée en sachant que mon bébé est entre de bonnes mains."
  },
  {
    name: "cthioui ibtissam",
    rating: 5,
    text: "Je n'ai que des éloges pour la garderie ! Toute l'équipe est attentionnée, professionnelle et à l'écoute. Mon fils s'y sent très à l'aise ; il s'épanouit dans un environnement chaleureux, sûr et stimulant. Les activités sont variées et parfaitement adaptées à son âge. Merci à toute l'équipe pour votre dévouement et votre gentillesse au quotidien. Que Dieu vous bénisse tous."
  }
];

const BRAND_IMAGES = [
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEFAIWZuXKejv3IuAsvL8QvQ6gUe6n5ib5KcEgCW8iSgYl_RBCxH0Xoc-0J9ePPFPJh72F5nWDBabL6EosrVMVvpDgbM1RpVhCfzW-tCwRNOQicfF39GhK1t39x7upZfiTw1dMnlPhaDasFZzN4709F698On91vQ2A1gtDdjuS4JNB_kpcDpMu5-GTz8Z0-NZbf2pTjrzSZBOPUUOWuZ1XMa69YwCnL4BqJ2e95V0dGyTetbJn2iY7g-vCYBjfJzxL-rAEtC2eAR8ivqI0jg9TstkoVzJigdqYz2BIjxtJffWnSFpSsfpGMT0fQQkp9crGWDp0g086Ly_22gv9bzZ4pqbzUbPU4UDMtRaF51VOqywkXZtTufn25OtVOHr_j4TR21v0G8lEgsgpQcnT9C26zpRc0zygf93Kx1l9zt7-vN50LXhZpA9PYbULK86uwd/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEF9Kp4yfVkd24SJQ2mwEsamSbe8kwI6zSVdLaMaQ9WpLU7PjpxRG2eK-VsBK9cHv0mkj1hm2GMaIzEdefClYIonpzgRREbsg2fDqQXKXvym3cL9b9yrdpm3xedyzBmyQB44dvyTNJnnpNAc8XR_z4N6S6yX_Dj670ymfCB_bOIeUN2o1MKBW7fE1XRpxX6KFCTIEP9GRNCTXJjPz0ihxFB0-LrbzhTDkBrbE9Ro6YX3QtUYV0Butjv4CKJ7lhNcgYMU6VcSdeexiPz-iVlcwKt7z2jGdY95-34E-mMxatyFzuDRYjdRXnCRu7bOSQwdM9V_XJYibSwDtJo69WYVF_ITZYAkQ3y3F9PDOX7yh8bEVKFYuqWR69IMFtYeBn3goRu0lLbBrq1aAR2rFvkpGIybwNGZ8RKB8gRcNmUUzF-5vBHNQboNEjKryJJ8aelb/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEHxpvp60PFNk63iSKfWIXTinE1PK5tkIDqc9TcTn9r31ddTxgGoF7uZ7xOae_oZ7_c4Bidiet--EyZ2LpuZPHJ7tpbXYJ5N35QcsSrLjLfyn9YSz3ELRKTA23j3Hs3BF_aZht1FfS8WJyXe88nl2pdMwFCKA014zeGkG6nl41W_UQEfO9vyhHdCqzWeSwmNs1QfrddRPVTXKZ_u8tvnNpDRnYZBwjiMc5oI_vQHHji0C8G6dIV9aKZz6OpSqwn9p0LDxuLEbkMdu9bAStJcLpQmsQ-9mIRdgF5RGtkyUvnPFFUCTpnsScJumPLyKub8LltIBf0IQgqn3RKs793XMXk7WG1VGclB5UVFEYyDP9vqTy6HOgj60-0s4rEglK3TPvfEw8GjAZToVkZ3BOLKNBFQp69rfRxdkHUhn4WvpvmjVw/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEHY6dHBpxYwQ5uj_g-8RLkIMoAJkDiwpAkkdzAgdyIYm2stqs2qyW-d-2W_BMVbH-s8KAwQONbXes14pkPmuHSkm6ODFLNYCwYmf2D5CPLhGeJlJIgygtpwvkUk4XJ_8YfOsZzKrIeh17_-DEEvCON5yTM13dNdXJP1OIhtoSUXYKoX3lDJ7QtqQ8TbKIQ7vjEmD0Mz0jeXsY8YQxnzPFjzIVn3_QNtQT4_v7XxZWiZ7UOCU7ISA-vnjM-lFMB5k1cnnT3i2O-IZJ2jY2Q-FBuQ3UMOYnLVOeeMz_Bpy0phJzllQ55T7jVG9RLfDY4I3s_JNYvkgu2d4AVH0oT3arAl1oquMW7yYCKG8mojV1g_Wll9j4iqfkKFUYc3lmKXx7bfiXwcSw62bsaGu8nSIPKbT0sj1PmCOBWmOUKuGwulcZZeIhA2u6F699QaSeB7/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEEdwzUFwcCUHJcZSmGNSiz6u5vp0oCNCorpYKx8V_bmmT2nSfcqKjbTL-87M-cP7VQRr2vYgRVrSguhoisWK_AZ04R8Ns-Lc8_R1a6412Wv98kcyTiV5KfeWLg79ZiVY8TUJfFB2xGGH-ZQxb--vjWP2QxOXo6HNtshh25op8a5h7R_JXbyWzM9r9m0Cm1B0-Fh-bT5oScPhhVCy_8jq0c63nCLx42dvMJOyq4Fe5Fz4hfdmUKmCIVmJP4naDq0AuoZpjm70El_yeFyxaHnLis9ou1mFbpH0QtKYYTYAwbStBJcBRXfgdm5YZv2MD_7qKWDpR8DfNELIpKC7ajJKMSFQxXl0Uiprq32QZlZMyFLOWWupS0rV6j4ByNWaToKBlGLYSKkQgM0_qneHzQFQtm55h-Y8IM7Dxuw-lMvQ2zzE7rC7i2BrL-EZbXZTz85/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEFZgffJvJVY3GPLB4fim0fg8SRl9b_Si3Yqp1fVVx08MQDCcbyH27q5sMuokfvgT66gnUjQyfnyUDJsiDorFn77aP4Idrw7udJNMLqRcZYIKEtxoQx72g0eyUuvdI2cOTOj7D_vRmk_dFJ21oqssGvAxIeKEpDlO6TOFOivjSIsjlMuI3PbBjn6QDURjrM96k4Jzr70Y1yGin4KnLARu7VqCiFtyuZJqJVPeUGBNf3Q6Jp0jKFgCHO5R4aVpPlT1qKjTWGqp3vxkUGdTIV3GGMklGGgeVGc2u7MiKPEWnmoavTWAN3-C_igbqEtCbgELMCB48jPJRmm4UWaxlHVdcPR0j-OoxjXtK9fs3-h0DNpxDp8VSsnF_1Td7lJFZeXY5gjwzk2BGqesOzIubv1pgyc2pnWnY6eCwvrlBYNe2XpNw/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEEUDj_eBeCCFXei6W4QeXFtL05cmbZAIxFJTfpFLLnhNtNGZsYPgVHHFOUscX4-w0BGW7xdg8D_c9fm6hVsUaP6KwELjgFbDm8ivVibY-3G2Y0IMbC-7dAt9bKkwS3NHdBzJ0U0IVeJOL45VtatGL8qgDamK5-eGbExpGsL8Xbddqvljm3y9XTrQFvMgKPxF7RDQPUYetp_g1ZfdIjnQj2MjScvhH7zlY9u0qD1uVg--0tBqeNco4JfhK_Va_VbuD-Fm_4zFrAYhQKlLnCIHQb4Fs7fsEgNM3l6oItK1UsOD1BO-bY73JJAg24UKNK6tyIhGA-trVdodUUfjhLwjiwAcKMYhTqOhIrhPeW0D9yvN5NVWrztMv7KZBjV2XrSK1g8E-budm1InQDSdq1TcI2ODxxMy4Wls1JLlm61TY2Ev7PBYTQjrdhIm_aECA/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEE-96bTKuQmE7_UNnVBMCkxLePxfeLQTlGDiDLD0Q__SHihjIkC97ApbSlFEr3jERWkYpbCXn04zWzhOEvVPK1XiOwiekteAQUsviaJEaL360GMsTGKOuL2RLWg7iFOzWNPA2c14EqnWYoD2hmaEXgS8tfoh3v4NBmDAqWVPFAjHjfMNQI0v35YuHrY0Yd-glXiQ57yYF4N1F3MJVgrKTrvU4thE0R3Lg-1P7gT001Z0leK4OjMfvH01ptBWEIEjBlih-5zbDKFmO3xQjs5lBBiKwzlluenycV7fxW7MFUxgSo42Xhm2F6fycdutz4z2yc3go-omtQtGhIdMHa7eePx_zrVa_sQEH9FnAOz0pkKidqtac-pLy3RndrgFPT4FquenWbib6_eUpDrpNILOZlR8K1s2na-lbLbbKXpQMOkYvQE/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEHkPLjrqOpqY9Q4jDUxMrF71fhSKr725NKn3zVyA2lUsnUb18Z0jSM2mQlyFSm3-aFRDRpIAoPoUMnRDvjBtun8K8dZ0MyIwLgfmXSCF_Kg4m5ANwinvFJVl4yBWxD5TxGeQ7imAtZ9aGDD0BmVXOPxsRsPMmSdBmWk-e2IEwtLL--qTaDs95w1bNHNnvkEIJHZXhCM_qn_QC02nlsmkYsMxDPUae7-CN9iwYBeaKaaZEljRQK0EMP_H1aUfQw4QPXwPKg_sOofFm4DzpmZh91jNBfXAURVROe0DD9Z01_iY19yrjXl8jhqhcOLhKmAplpX4pWpkQLgosTaosKJvR6YM5LVBNJs4DE63fqTaW6G-kz2Bc5X4udj6ymSZFQ_tWgEfsjw0jt2hqi6hrudd7n0rpUEVVxF8oNkF3Ky3J_4MuaXE12peKHRFUYXsMcO/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJRYZ5_hJtpw0RGsGhq2BVGMU/photos/AU_ZVEGpCza52SAbjtc2Ib_iybqAt6JzEHk5S14JiniylKJIe1W5mtmeLzg9eJwD3icolmlpXiHdOpJJVm3NMq2C8K5ff_9ji_EBAaaqsDxJIVMQrS_OzZC5ZifkOoQnq5rNl7uMMc1UZz7O-ONZAYQTk5VXsO2ufSi1MPRnzByTUl-UQnXECBEdEnBFXO2e1SOzamNQd_j33EwPdmdyd0B8vLBCj6sf5ZYxOtGsvyGZsUrvCc9qI92RfXdHm7VU63umlTeuCYBqqAozQMm0hKhktgIdLn5v4EUq0dFiRt5A-fdkvgvvxdk0LfyCMwPgpiada8gIbO5wGOLKnPtd0Lj6gJ8AbGmkUFwluZtq99Bf4LmA2oBk1WTcIZJCUvy1yOFfHcjjg64MsJOX3x97X-6wLVatN0iOEGD1OGzLp9HghfAIBYY1A3em7yHVcXCTUj0R/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis"
];

// --- Components ---

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="font-mono text-sm uppercase tracking-widest text-text-dark hover:text-primary-pink transition-colors duration-300"
  >
    {children}
  </a>
);

const SectionTitle = ({ subtitle, title, dark = false }: { subtitle: string, title: string, dark?: boolean }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`font-mono text-xs uppercase tracking-[0.3em] ${dark ? 'text-primary-blue' : 'text-primary-pink'} block mb-4`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-6xl font-bold ${dark ? 'text-white' : 'text-text-dark'} leading-tight max-w-2xl`}
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Barre de progression */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-pink origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-8 py-4">
          {/* Liens Gauche */}
          <div className="hidden md:flex items-center space-x-12 flex-1">
            <NavLink href="#about">À propos</NavLink>
            <NavLink href="#services">Services</NavLink>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 px-8">
            <a href="#" className="flex flex-col items-center">
              <span className="font-sans font-bold text-xl tracking-tighter text-primary-purple">AGDAL KIDS</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary-blue -mt-1">Crèche</span>
            </a>
          </div>

          {/* Liens Droite */}
          <div className="hidden md:flex items-center justify-end space-x-12 flex-1">
            <NavLink href="#gallery">Galerie</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Menu Mobile */}
          <button 
            className="md:hidden text-text-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center space-y-8"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-text-dark">À propos</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-text-dark">Services</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-text-dark">Galerie</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-text-dark">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Hero */}
      <section className="min-h-screen pt-40 pb-20 px-6 flex items-center bg-gradient-to-br from-primary-blue/5 via-white to-primary-pink/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="font-mono text-sm uppercase tracking-[0.5em] text-primary-purple mb-6 block">Rabat, Maroc</span>
              <h1 className="text-6xl md:text-8xl font-bold text-text-dark leading-[0.9] mb-8">
                Où les Petits <br /> 
                <span className="text-primary-pink italic">Rêves</span> Prennent <br />
                Racine & Grandissent.
              </h1>
              <p className="text-xl text-text-dark/70 max-w-lg mb-10 leading-relaxed">
                Nursery Mother Agdal Kids offre un environnement stimulant, sûr et ludique pour le développement précoce et la socialisation de votre enfant.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-primary-purple text-white rounded-full font-bold hover:bg-primary-pink transition-all duration-300 flex items-center group shadow-lg shadow-primary-purple/20"
                >
                  Inscrire votre enfant
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#services" 
                  className="px-8 py-4 border-2 border-primary-purple text-primary-purple rounded-full font-bold hover:bg-primary-purple hover:text-white transition-all duration-300"
                >
                  Explorer nos programmes
                </a>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img 
                src={BRAND_IMAGES[0]} 
                alt="Enfant heureux chez Agdal Kids" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/40 to-transparent" />
            </motion.div>
            {/* Éléments décoratifs */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary-yellow rounded-full blur-3xl opacity-30"
            />
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl shadow-xl max-w-[200px]">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-primary-yellow fill-primary-yellow" />
                <span className="font-bold text-text-dark">Note 5.0</span>
              </div>
              <p className="text-xs text-text-dark/60 font-mono">Approuvé par les parents de Rabat depuis plus de 2 ans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-24 px-6 bg-primary-purple text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-3xl overflow-hidden mt-12 border-4 border-white/20"
                >
                  <img src={BRAND_IMAGES[1]} alt="Aire de jeux" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-3xl overflow-hidden border-4 border-white/20"
                >
                  <img src={BRAND_IMAGES[2]} alt="Apprentissage" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-pink rounded-full flex items-center justify-center text-white font-bold text-center p-4 rotate-12 shadow-2xl border-4 border-white">
                <span className="font-mono text-sm uppercase tracking-tighter">Établi & Approuvé</span>
              </div>
            </div>
            <div>
              <SectionTitle subtitle="Notre Philosophie" title="Une deuxième maison pour vos petits" dark />
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Chez Agdal Kids, nous croyons que les premières années de la vie d'un enfant sont les plus critiques pour construire une base de curiosité, de confiance et de gentillesse. Notre équipe de professionnels dévoués veille à ce que chaque enfant se sente vu, entendu et aimé.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck className="text-primary-blue" />, title: "Sécurité d'abord", desc: "Locaux propres, sécurisés et accueillants surveillés quotidiennement." },
                  { icon: <Heart className="text-primary-pink" />, title: "Équipe attentionnée", desc: "Des éducateurs professionnels qui traitent chaque enfant avec bienveillance." },
                  { icon: <Zap className="text-primary-yellow" />, title: "Environnement stimulant", desc: "Des activités variées parfaitement adaptées à chaque groupe d'âge." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 glass rounded-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Nos Programmes" title="Une croissance sur mesure pour chaque étape" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-[2.5rem] flex flex-col justify-between transition-all duration-300 ${
                  index % 3 === 0 ? 'bg-primary-blue text-white lg:col-span-2' : 
                  index % 2 === 0 ? 'bg-primary-pink/10 text-text-dark' : 'bg-white text-text-dark shadow-xl shadow-primary-purple/5 border border-primary-purple/5'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${index % 3 === 0 ? 'bg-white/20' : 'bg-primary-purple/5'}`}>
                      {service.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{service.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                  <p className={`mb-8 leading-relaxed ${index % 3 === 0 ? 'text-white/80' : 'text-text-dark/70'}`}>
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-current/10">
                  <span className="font-bold text-xl">{service.price}</span>
                  <button className={`p-3 rounded-full transition-colors ${index % 3 === 0 ? 'bg-white text-primary-blue' : 'bg-primary-purple text-white'}`}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section id="gallery" className="py-24 px-6 bg-primary-pink overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 flex items-end justify-between">
          <SectionTitle subtitle="La vie chez Agdal Kids" title="Capturer des moments de bonheur" dark />
          <div className="hidden md:flex space-x-4 mb-12">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
              <ChevronRight className="rotate-180" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-yellow flex items-center justify-center text-primary-purple">
              <ChevronRight />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-6 overflow-x-auto pb-12 no-scrollbar px-4">
          {BRAND_IMAGES.slice(3).map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[300px] md:w-[450px] aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <img src={img} alt={`Galerie ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Histoires de parents" title="Approuvé par la communauté" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-soft-bg rounded-[3rem] shadow-xl shadow-primary-purple/5 relative border border-primary-purple/5"
              >
                <div className="flex space-x-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary-yellow fill-primary-yellow" />
                  ))}
                </div>
                <p className="text-text-dark/70 italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center font-bold text-primary-blue">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{review.name}</h4>
                    <span className="text-xs font-mono text-primary-pink uppercase tracking-widest">Parent vérifié</span>
                  </div>
                </div>
                <div className="absolute top-8 right-10 opacity-10">
                  <Heart className="w-12 h-12 text-primary-pink fill-primary-pink" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-24 px-6 bg-primary-blue/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle subtitle="Pourquoi nous choisir" title="L'excellence dans l'éducation précoce" />
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Années d'expérience", value: "2+" },
                { label: "Personnel qualifié", value: "15+" },
                { label: "Enfants heureux", value: "100+" },
                { label: "Taux de sécurité", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl shadow-lg shadow-primary-blue/5 border border-primary-blue/10">
                  <span className="block text-4xl font-bold text-primary-purple mb-2">{stat.value}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-dark/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              "Plans de nutrition approuvés par des pédiatres",
              "Exposition bilingue (Anglais & Français)",
              "Programmes de développement de la motricité",
              "Périodes de sieste et de repos surveillées",
              "Contes interactifs et arts plastiques",
              "Salles de jeux sécurisées et rembourrées"
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-primary-blue/5"
              >
                <CheckCircle2 className="text-primary-green w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-text-dark">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Localisation */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionTitle subtitle="Contactez-nous" title="Visitez notre crèche aujourd'hui" />
              <div className="space-y-8 mb-12">
                <a href="tel:0669420409" className="flex items-center space-x-4 group">
                  <div className="p-4 bg-primary-blue/10 rounded-2xl group-hover:bg-primary-blue group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-widest text-primary-pink">Téléphone</span>
                    <span className="text-xl font-bold text-text-dark">06 69 42 04 09</span>
                  </div>
                </a>
                <a href="mailto:NurseryMotherAgdalKids@gmail.com" className="flex items-center space-x-4 group">
                  <div className="p-4 bg-primary-pink/10 rounded-2xl group-hover:bg-primary-pink group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-widest text-primary-pink">Email</span>
                    <span className="text-xl font-bold text-text-dark text-sm md:text-xl">NurseryMotherAgdalKids@gmail.com</span>
                  </div>
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('X5X2+WQ4, Rue Oum Errabia, Rabat, Morocco')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group"
                >
                  <div className="p-4 bg-primary-purple/10 rounded-2xl group-hover:bg-primary-purple group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-widest text-primary-pink">Adresse</span>
                    <span className="text-xl font-bold text-text-dark">Rue Oum Errabia, Rabat</span>
                  </div>
                </a>
              </div>
              
              <div className="p-8 bg-primary-yellow/10 rounded-[3rem] border border-primary-yellow/20">
                <h4 className="font-bold text-xl mb-4 flex items-center">
                  <Clock className="mr-2 w-5 h-5" />
                  Heures d'ouverture
                </h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between border-b border-text-dark/10 pb-2">
                    <span>Lun - Ven</span>
                    <span>7:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between pt-2 opacity-50">
                    <span>Sam - Dim</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-soft-bg h-full min-h-[500px]">
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('X5X2+WQ4, Rue Oum Errabia, Rabat, Morocco')}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-primary-purple text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1">
              <a href="#" className="flex flex-col mb-8">
                <span className="font-sans font-bold text-3xl tracking-tighter">AGDAL KIDS</span>
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary-blue">Nursery Mother</span>
              </a>
              <p className="text-white/60 leading-relaxed mb-8">
                Offrir des soins et une éducation précoce de qualité à Rabat depuis 2022.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/agdal_kids?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-pink hover:text-white transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-pink hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-blue mb-8">Liens Rapides</h4>
              <ul className="space-y-4 font-bold">
                <li><a href="#about" className="hover:text-primary-pink transition-colors">Notre Histoire</a></li>
                <li><a href="#services" className="hover:text-primary-pink transition-colors">Programmes</a></li>
                <li><a href="#gallery" className="hover:text-primary-pink transition-colors">Galerie</a></li>
                <li><a href="#contact" className="hover:text-primary-pink transition-colors">Inscription</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-blue mb-8">Services</h4>
              <ul className="space-y-4 text-white/60">
                <li>Crèche Temps Plein</li>
                <li>Programme Préscolaire</li>
                <li>Club Après-École</li>
                <li>Camps de Vacances</li>
                <li>Initiation Bilingue</li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-blue mb-8">Newsletter</h4>
              <p className="text-sm text-white/60 mb-6">Restez informé de nos dernières activités et événements.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-white/5 border border-white/10 rounded-l-2xl px-4 py-3 w-full focus:outline-none focus:border-primary-pink transition-colors"
                />
                <button className="bg-primary-pink text-white px-6 py-3 rounded-r-2xl font-bold hover:bg-primary-purple transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              © 2026 Nursery Mother Agdal Kids. Tous droits réservés.
            </span>
            <div className="flex space-x-8 font-mono text-[10px] uppercase tracking-widest text-white/40">
              <a href="#" className="hover:text-primary-pink">Politique de confidentialité</a>
              <a href="#" className="hover:text-primary-pink">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
