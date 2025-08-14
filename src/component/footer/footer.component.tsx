import { motion } from "framer-motion";
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink,
  FooterAnchor,
  SocialLinks,
  SocialLink,
} from "./footer.styles";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FooterContent>
          <FooterText>
            © {currentYear} Crown Clothing. Crafted with care for fashion
            enthusiasts.
          </FooterText>

          <FooterLinks>
            <FooterLink to="/shop">Shop</FooterLink>
            <FooterLink to="/auth">Sign In</FooterLink>
            <FooterAnchor href="mailto:support@crownclothing.com">
              Contact
            </FooterAnchor>
          </FooterLinks>

          <SocialLinks>
            <SocialLink href="#" aria-label="Instagram">
              📷
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              🐦
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              📘
            </SocialLink>
          </SocialLinks>
        </FooterContent>
      </motion.div>
    </FooterContainer>
  );
};

export default Footer;
