import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Directory from "../../component/directory/directory.component";

import {
  HomeContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  ContentSection,
  SectionTitle,
} from "./home.styles";

const Home = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const heroVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <HomeContainer>
      <Outlet />

      <motion.div initial="hidden" animate="visible" variants={heroVariants}>
        <HeroSection>
          <motion.div variants={itemVariants}>
            <HeroTitle>Welcome to Crown Clothing</HeroTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <HeroSubtitle>
              Discover our curated collection of premium fashion pieces that
              define your unique style. From timeless classics to contemporary
              trends, find everything you need to express yourself.
            </HeroSubtitle>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HeroCTA onClick={handleShopNow}>Shop Now</HeroCTA>
          </motion.div>
        </HeroSection>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ContentSection>
          <motion.div variants={itemVariants}>
            <SectionTitle>Shop by Category</SectionTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Directory />
          </motion.div>
        </ContentSection>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;
