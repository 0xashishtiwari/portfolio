'use client'
import { motion } from "framer-motion";

 export default function Mandala() {
    return (
        <>
        <motion.div
            className="mb-3 flex w-full justify-center pointer-events-none opacity-60 animate-[spin_5s_linear_infinite] sm:mb-0 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <img src="/mandala.png" alt="" className="h-10 sm:h-16 w-auto" />
        </motion.div>
        </>
    )
}