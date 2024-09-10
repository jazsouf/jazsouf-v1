"use client";
import { motion } from "framer-motion";

const MotionDiv = ({
  classname,
  children,
}: {
  classname: string;
  children: React.ReactNode;
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 1],
      },
    },
  };
  return (
    <motion.div
      initial={"hidden"}
      animate="visible"
      variants={fadeInUp}
      className={classname}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
