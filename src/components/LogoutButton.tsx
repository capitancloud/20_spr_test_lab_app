import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <motion.button
      onClick={logout}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg border border-border/50 transition-all"
      title="Esci da TestLab"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Esci</span>
    </motion.button>
  );
};
